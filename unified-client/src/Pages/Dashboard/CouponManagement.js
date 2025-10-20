import React, { useState, useEffect } from 'react';
import { couponService } from '../../services/couponService';
import CreateCouponModal from '../../components/CreateCouponModal';
import CouponDetailsModal from '../../components/CouponDetailsModal';
import './CouponManagement.css';
import CouponAnalytics from './CouponAnalytics';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setIsLoading(true);
      const data = await couponService.getAllCoupons();
      setCoupons(data);
      setError('');
    } catch (error) {
      console.error('Error fetching coupons:', error);
      setError('Failed to load coupons');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCoupon = async (couponData) => {
    try {
      await couponService.createCoupon(couponData);
      await fetchCoupons();
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating coupon:', error);
      throw error;
    }
  };

  const handleToggleStatus = async (couponId) => {
    try {
      await couponService.toggleCouponStatus(couponId);
      await fetchCoupons();
    } catch (error) {
      console.error('Error toggling coupon status:', error);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await couponService.deleteCoupon(couponId);
        await fetchCoupons();
      } catch (error) {
        console.error('Error deleting coupon:', error);
      }
    }
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.couponName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || coupon.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && coupon.isActive && new Date() < new Date(coupon.expiryDate)) ||
      (filterStatus === 'expired' && new Date() >= new Date(coupon.expiryDate)) ||
      (filterStatus === 'inactive' && !coupon.isActive);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (coupon) => {
    if (!coupon.isActive) {
      return <span className="status-badge inactive">Inactive</span>;
    }
    if (new Date() >= new Date(coupon.expiryDate)) {
      return <span className="status-badge expired">Expired</span>;
    }
    return <span className="status-badge active">Active</span>;
  };

  const getUsagePercentage = (coupon) => {
    if (!coupon.maxUses) return 0;
    return Math.round((coupon.usageCount / coupon.maxUses) * 100);
  };

  if (isLoading) {
    return (
      <div className="coupon-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading coupons...</p>
        </div>
      </div>
    );
  }

  // Check if user is SUPER_ADMIN to show analytics first
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <div className="coupon-management">
      {/* Show CouponAnalytics first for SUPER_ADMIN users */}
      {user.role === "SUPER_ADMIN" && (
        <div className="analytics-section">
          <CouponAnalytics />
        </div>
      )}
      
      <div className="management-section">
      <div className="coupon-header">
        <div className="coupon-title-section">
          <h1>Coupon Management</h1>
          <p>Create and manage test access coupons</p>
        </div>
        <button 
          className="create-coupon-btn"
          onClick={() => setShowCreateModal(true)}
        >
          + Create New Coupon
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="coupon-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search coupons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="specific">Specific</option>
            <option value="general">General</option>
          </select>
        </div>
        
        <div className="filter-group">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="coupons-grid">
        {filteredCoupons.length === 0 ? (
          <div className="no-coupons">
            <div className="no-coupons-icon">🎫</div>
            <h3>No coupons found</h3>
            <p>Create your first coupon to get started</p>
          </div>
        ) : (
          filteredCoupons.map(coupon => (
            <div key={coupon._id} className="coupon-card">
              <div className="coupon-card-header">
                <h3 className="coupon-name">{coupon.couponName}</h3>
                {getStatusBadge(coupon)}
              </div>
              
              <div className="coupon-details">
                <div className="coupon-detail">
                  <span className="detail-label">Type:</span>
                  <span className={`detail-value type-${coupon.type}`}>
                    {coupon.type === 'specific' ? 'Specific Users' : 'General Access'}
                  </span>
                </div>
                
                <div className="coupon-detail">
                  <span className="detail-label">Usage:</span>
                  <span className="detail-value">
                    {coupon.usageCount} / {coupon.maxUses || '∞'}
                  </span>
                </div>
                
                {coupon.maxUses && (
                  <div className="usage-bar">
                    <div 
                      className="usage-fill"
                      style={{ width: `${getUsagePercentage(coupon)}%` }}
                    ></div>
                  </div>
                )}
                
                <div className="coupon-detail">
                  <span className="detail-label">Expires:</span>
                  <span className="detail-value">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </span>
                </div>
                
                {coupon.assignedUsers && coupon.assignedUsers.length > 0 && (
                  <div className="coupon-detail">
                    <span className="detail-label">Assigned to:</span>
                    <span className="detail-value">
                      {coupon.assignedUsers.length} user(s)
                    </span>
                  </div>
                )}
              </div>
              
              <div className="coupon-actions">
                <button 
                  className="action-btn details-btn"
                  onClick={() => {
                    setSelectedCoupon(coupon);
                    setShowDetailsModal(true);
                  }}
                >
                  View Details
                </button>
                
                <button 
                  className={`action-btn toggle-btn ${coupon.isActive ? 'deactivate' : 'activate'}`}
                  onClick={() => handleToggleStatus(coupon._id)}
                >
                  {coupon.isActive ? 'Deactivate' : 'Activate'}
                </button>
                
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteCoupon(coupon._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showCreateModal && (
        <CreateCouponModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCoupon}
        />
      )}

      {showDetailsModal && selectedCoupon && (
        <CouponDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedCoupon(null);
          }}
          coupon={selectedCoupon}
        />
      )}
      </div>
    </div>
  );
};

export default CouponManagement;

