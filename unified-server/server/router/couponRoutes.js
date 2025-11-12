const express = require('express');
const router = express.Router();
const Coupon = require('../model/couponSchema');
const User = require('../model/userSchema');
const { Authenticate } = require('../services/middleware/authenticate');

// GET /api/coupons - Get all coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find({})
      .populate('assignedUsers', 'name email')
      .populate('usedBy.user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/coupons/stats - Get coupon statistics
router.get('/stats', async (req, res) => {
  try {
    const totalCoupons = await Coupon.countDocuments({});
    const activeCoupons = await Coupon.countDocuments({ 
      isActive: true,
      expiryDate: { $gte: new Date() }
    });
    const expiredCoupons = await Coupon.countDocuments({
      expiryDate: { $lt: new Date() }
    });
    const totalUsage = await Coupon.aggregate([
      { $group: { _id: null, total: { $sum: '$usageCount' } } }
    ]);
    
    // Get coupon usage trend (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const usageTrend = await Coupon.aggregate([
      {
        $match: {
          updatedAt: { $gte: thirtyDaysAgo },
          usageCount: { $gt: 0 }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' }
          },
          usage: { $sum: '$usageCount' }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);
    
    // Get top performing coupons
    const topCoupons = await Coupon.find({ usageCount: { $gt: 0 } })
      .sort({ usageCount: -1 })
      .limit(5)
      .select('couponName usageCount maxUses type');
    
    res.json({
      totalCoupons,
      activeCoupons,
      expiredCoupons,
      inactiveCoupons: totalCoupons - activeCoupons - expiredCoupons,
      totalUsage: totalUsage[0]?.total || 0,
      usageTrend,
      topCoupons
    });
  } catch (error) {
    console.error('Error fetching coupon stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/coupons/:id - Get coupon by ID
router.get('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id)
      .populate('assignedUsers', 'name email')
      .populate('usedBy.user', 'name email');
    
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    
    res.json(coupon);
  } catch (error) {
    console.error('Error fetching coupon:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid coupon ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/coupons - Create new coupon
router.post('/', async (req, res) => {
  try {
    console.log('Received coupon creation request:', req.body);
    const {
      couponName,
      type,
      assignedUsers,
      maxUses,
      expiryDate
    } = req.body;

    // Validate required fields
    if (!couponName || !type || !expiryDate) {
      return res.status(400).json({ 
        message: 'Missing required fields: couponName, type, and expiryDate are required' 
      });
    }

    // Check if coupon name already exists
    const existingCoupon = await Coupon.findOne({ 
      couponName: couponName.trim() 
    });
    if (existingCoupon) {
      return res.status(400).json({ 
        message: 'Coupon name already exists' 
      });
    }

    // Validate expiry date is in the future
    if (new Date(expiryDate) <= new Date()) {
      return res.status(400).json({ 
        message: 'Expiry date must be in the future' 
      });
    }

    // Prepare coupon data
    let couponData = {
      couponName: couponName.trim(),
      type,
      expiryDate: new Date(expiryDate)
    };

    if (type === 'specific') {
      console.log('Validating specific coupon - assignedUsers:', assignedUsers, 'type:', typeof assignedUsers, 'isArray:', Array.isArray(assignedUsers));
      // For specific coupons, assignedUsers array is required
      if (!assignedUsers || !Array.isArray(assignedUsers) || assignedUsers.length === 0) {
        console.log('Validation failed: assignedUsers is empty or invalid');
        return res.status(400).json({ 
          message: 'assignedUsers array is required for specific coupons' 
        });
      }

      // Validate that all assigned users exist
      const users = await User.find({ _id: { $in: assignedUsers } });
      if (users.length !== assignedUsers.length) {
        return res.status(400).json({ 
          message: 'One or more assigned users do not exist' 
        });
      }

      couponData.assignedUsers = assignedUsers;
      couponData.maxUses = assignedUsers.length; // For specific coupons, maxUses equals number of assigned users
      
    } else if (type === 'general') {
      // For general coupons, maxUses is required
      if (!maxUses || maxUses < 1) {
        return res.status(400).json({ 
          message: 'maxUses is required for general coupons and must be at least 1' 
        });
      }

      couponData.maxUses = maxUses;
      couponData.assignedUsers = []; // General coupons have no assigned users
      
    } else {
      return res.status(400).json({ 
        message: 'Invalid coupon type. Must be either "specific" or "general"' 
      });
    }

    // Create the coupon
    const coupon = new Coupon(couponData);
    await coupon.save();

    // Populate the created coupon with user details for response
    const populatedCoupon = await Coupon.findById(coupon._id)
      .populate('assignedUsers', 'name email');

    res.status(201).json({
      message: 'Coupon created successfully',
      coupon: populatedCoupon
    });

  } catch (error) {
    console.error('Error creating coupon:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors 
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid data format provided' 
      });
    }
    
    res.status(500).json({ 
      message: 'Server error while creating coupon' 
    });
  }
});

// PUT /api/coupons/:id - Update coupon
router.put('/:id', async (req, res) => {
  try {
    const {
      couponName,
      type,
      assignedUsers,
      maxUses,
      expiryDate,
      isActive
    } = req.body;

    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Update fields if provided
    if (couponName !== undefined) {
      // Check if new name conflicts with existing coupons
      if (couponName !== coupon.couponName) {
        const existingCoupon = await Coupon.findOne({ 
          couponName: couponName.trim(),
          _id: { $ne: req.params.id }
        });
        if (existingCoupon) {
          return res.status(400).json({ 
            message: 'Coupon name already exists' 
          });
        }
        coupon.couponName = couponName.trim();
      }
    }

    if (type !== undefined) coupon.type = type;
    if (expiryDate !== undefined) {
      if (new Date(expiryDate) <= new Date()) {
        return res.status(400).json({ 
          message: 'Expiry date must be in the future' 
        });
      }
      coupon.expiryDate = new Date(expiryDate);
    }
    if (isActive !== undefined) coupon.isActive = isActive;

    if (type === 'specific' && assignedUsers !== undefined) {
      if (!Array.isArray(assignedUsers) || assignedUsers.length === 0) {
        return res.status(400).json({ 
          message: 'assignedUsers array is required for specific coupons' 
        });
      }

      // Validate that all assigned users exist
      const users = await User.find({ _id: { $in: assignedUsers } });
      if (users.length !== assignedUsers.length) {
        return res.status(400).json({ 
          message: 'One or more assigned users do not exist' 
        });
      }

      coupon.assignedUsers = assignedUsers;
      coupon.maxUses = assignedUsers.length;
    }

    if (type === 'general' && maxUses !== undefined) {
      if (maxUses < 1) {
        return res.status(400).json({ 
          message: 'maxUses must be at least 1' 
        });
      }
      coupon.maxUses = maxUses;
      coupon.assignedUsers = [];
    }

    await coupon.save();

    // Return updated coupon with populated fields
    const updatedCoupon = await Coupon.findById(coupon._id)
      .populate('assignedUsers', 'name email')
      .populate('usedBy.user', 'name email');

    res.json({
      message: 'Coupon updated successfully',
      coupon: updatedCoupon
    });

  } catch (error) {
    console.error('Error updating coupon:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors 
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid data format provided' 
      });
    }
    
    res.status(500).json({ 
      message: 'Server error while updating coupon' 
    });
  }
});

// DELETE /api/coupons/:id - Delete coupon
router.delete('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid coupon ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/coupons/:id/toggle - Toggle coupon active status
router.put('/:id/toggle', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Toggle the isActive status
    coupon.isActive = !coupon.isActive;
    await coupon.save();

    // Return the updated coupon with populated fields
    const updatedCoupon = await Coupon.findById(coupon._id)
      .populate('assignedUsers', 'name email')
      .populate('usedBy.user', 'name email');

    res.json({
      message: `Coupon ${coupon.isActive ? 'activated' : 'deactivated'} successfully`,
      coupon: updatedCoupon
    });
  } catch (error) {
    console.error('Error toggling coupon status:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid coupon ID format' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/coupons/stats - Get coupon statistics
router.get('/stats', async (req, res) => {
  try {
    const totalCoupons = await Coupon.countDocuments({});
    const activeCoupons = await Coupon.countDocuments({ 
      isActive: true,
      expiryDate: { $gte: new Date() }
    });
    const expiredCoupons = await Coupon.countDocuments({
      expiryDate: { $lt: new Date() }
    });
    const totalUsage = await Coupon.aggregate([
      { $group: { _id: null, total: { $sum: '$usageCount' } } }
    ]);
    
    // Get coupon usage trend (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const usageTrend = await Coupon.aggregate([
      {
        $match: {
          updatedAt: { $gte: thirtyDaysAgo },
          usageCount: { $gt: 0 }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' }
          },
          usage: { $sum: '$usageCount' }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);
    
    // Get top performing coupons
    const topCoupons = await Coupon.find({ usageCount: { $gt: 0 } })
      .sort({ usageCount: -1 })
      .limit(5)
      .select('couponName usageCount maxUses type');
    
    res.json({
      totalCoupons,
      activeCoupons,
      expiredCoupons,
      inactiveCoupons: totalCoupons - activeCoupons - expiredCoupons,
      totalUsage: totalUsage[0]?.total || 0,
      usageTrend,
      topCoupons
    });
  } catch (error) {
    console.error('Error fetching coupon stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/coupons/validate - Validate coupon code (requires authentication)
router.post('/validate', Authenticate, async (req, res) => {
  try {
    const { couponCode } = req.body;
    const userId = req.userData._id;

    if (!couponCode) {
      return res.status(400).json({ 
        message: 'Coupon code is required' 
      });
    }

    const coupon = await Coupon.findOne({ 
      couponName: couponCode.trim(),
      isActive: true,
      expiryDate: { $gte: new Date() }
    });

    if (!coupon) {
      return res.status(404).json({ 
        valid: false,
        message: 'Invalid or expired coupon code' 
      });
    }

    // For specific coupons, check if user is in assignedUsers list
    if (coupon.type === 'specific') {
      const isAssigned = coupon.assignedUsers.some(
        assignedUserId => assignedUserId.toString() === userId.toString()
      );
      if (!isAssigned) {
        return res.status(403).json({ 
          valid: false,
          message: 'This coupon is not assigned to you' 
        });
      }
    }

    // Check if user has already used this coupon
    const hasUserUsedCoupon = coupon.usedBy.some(
      entry => entry.user.toString() === userId.toString()
    );

    // Check if coupon has reached max unique users (only if user hasn't used it before)
    if (!hasUserUsedCoupon && coupon.maxUses && coupon.usageCount >= coupon.maxUses) {
      return res.status(400).json({ 
        valid: false,
        message: 'Coupon has reached maximum usage limit' 
      });
    }

    res.json({
      valid: true,
      couponId: coupon._id,
      couponName: coupon.couponName,
      type: coupon.type,
      maxUses: coupon.maxUses,
      usageCount: coupon.usageCount,
      expiryDate: coupon.expiryDate,
      alreadyUsedByUser: hasUserUsedCoupon
    });

  } catch (error) {
    console.error('Error validating coupon:', error);
    res.status(500).json({ 
      valid: false,
      message: 'Server error while validating coupon' 
    });
  }
});

// POST /api/coupons/use - Use coupon (when user takes test)
// This endpoint now counts unique users, not test attempts
router.post('/use', Authenticate, async (req, res) => {
  try {
    const { couponCode } = req.body;
    const userId = req.userData._id;

    if (!couponCode) {
      return res.status(400).json({ 
        message: 'Coupon code is required' 
      });
    }

    const coupon = await Coupon.findOne({ 
      couponName: couponCode.trim(),
      isActive: true,
      expiryDate: { $gte: new Date() }
    });

    if (!coupon) {
      return res.status(404).json({ 
        message: 'Invalid or expired coupon code' 
      });
    }

    // For specific coupons, verify user is in assignedUsers list
    if (coupon.type === 'specific') {
      const isAssigned = coupon.assignedUsers.some(
        assignedUserId => assignedUserId.toString() === userId.toString()
      );
      if (!isAssigned) {
        return res.status(403).json({ 
          message: 'This coupon is not assigned to you' 
        });
      }
    }

    // Check if this user has already used the coupon
    const hasUserUsedCoupon = coupon.usedBy.some(
      entry => entry.user.toString() === userId.toString()
    );

    if (hasUserUsedCoupon) {
      // User has already used this coupon - allow access but don't increment count
      return res.json({
        message: 'Coupon access granted (already used by you)',
        usageCount: coupon.usageCount,
        maxUses: coupon.maxUses,
        alreadyUsed: true
      });
    }

    // New user - check if coupon has reached max unique users
    if (coupon.maxUses && coupon.usageCount >= coupon.maxUses) {
      return res.status(400).json({ 
        message: 'Coupon has reached maximum usage limit' 
      });
    }

    // First time this user is using the coupon
    // Increment usage count and add user to usedBy array
    coupon.usageCount += 1;
    coupon.usedBy.push({
      user: userId,
      usedAt: new Date()
    });

    await coupon.save();

    res.json({
      message: 'Coupon used successfully',
      usageCount: coupon.usageCount,
      maxUses: coupon.maxUses,
      alreadyUsed: false
    });

  } catch (error) {
    console.error('Error using coupon:', error);
    res.status(500).json({ 
      message: 'Server error while using coupon' 
    });
  }
});

module.exports = router;
