/**
 * View Database Contents Script
 * 
 * This script displays the current state of your database
 * Run: node scripts/viewDatabase.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../server/model/userSchema');
const Coupon = require('../server/model/couponSchema');

const DB = process.env.DATABASE;

console.log('📊 Mentorify Database Viewer\n');
console.log('='.repeat(60));

async function viewDatabase() {
  try {
    // Connect to MongoDB
    console.log('\n📡 Connecting to MongoDB Atlas...');
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected successfully\n');
    
    // Database info
    console.log('🗄️  Database Information:');
    console.log(`   Name: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log('');
    
    // Users
    console.log('👥 USERS COLLECTION');
    console.log('-'.repeat(60));
    
    const userCount = await User.countDocuments();
    console.log(`   Total Users: ${userCount}\n`);
    
    if (userCount > 0) {
      // Count by role
      const roles = ['user', 'admin', 'school', 'franchise', 'superadmin'];
      console.log('   Users by Role:');
      for (const role of roles) {
        const count = await User.countDocuments({ role });
        if (count > 0) {
          console.log(`   - ${role}: ${count}`);
        }
      }
      
      console.log('\n   Recent Users (last 5):');
      const recentUsers = await User.find()
        .select('name email role createdAt')
        .sort({ _id: -1 })
        .limit(5);
      
      recentUsers.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name}`);
        console.log(`      Email: ${user.email}`);
        console.log(`      Role: ${user.role}`);
        console.log(`      Created: ${user.createdAt || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log('   No users found. Register your first user!\n');
    }
    
    // Coupons
    console.log('🎟️  COUPONS COLLECTION');
    console.log('-'.repeat(60));
    
    const couponCount = await Coupon.countDocuments();
    console.log(`   Total Coupons: ${couponCount}\n`);
    
    if (couponCount > 0) {
      // Active vs inactive
      const activeCoupons = await Coupon.countDocuments({ isActive: true });
      const inactiveCoupons = await Coupon.countDocuments({ isActive: false });
      
      console.log('   Coupon Status:');
      console.log(`   - Active: ${activeCoupons}`);
      console.log(`   - Inactive: ${inactiveCoupons}`);
      
      // By type
      const specificCoupons = await Coupon.countDocuments({ type: 'specific' });
      const generalCoupons = await Coupon.countDocuments({ type: 'general' });
      
      console.log('\n   Coupon Types:');
      console.log(`   - Specific: ${specificCoupons}`);
      console.log(`   - General: ${generalCoupons}`);
      
      console.log('\n   All Coupons:');
      const allCoupons = await Coupon.find()
        .select('couponName type isActive usageCount maxUses expiryDate')
        .sort({ createdAt: -1 });
      
      allCoupons.forEach((coupon, index) => {
        const expired = new Date() > new Date(coupon.expiryDate) ? ' [EXPIRED]' : '';
        const status = coupon.isActive ? '✅' : '❌';
        console.log(`   ${index + 1}. ${status} ${coupon.couponName}${expired}`);
        console.log(`      Type: ${coupon.type}`);
        console.log(`      Usage: ${coupon.usageCount}/${coupon.maxUses || '∞'}`);
        console.log(`      Expires: ${new Date(coupon.expiryDate).toLocaleDateString()}`);
        console.log('');
      });
    } else {
      console.log('   No coupons found. Create your first coupon!\n');
    }
    
    // Collections
    console.log('📁 ALL COLLECTIONS');
    console.log('-'.repeat(60));
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    if (collections.length > 0) {
      for (const col of collections) {
        const stats = await mongoose.connection.db.collection(col.name).stats();
        console.log(`   ${col.name}:`);
        console.log(`   - Documents: ${stats.count}`);
        console.log(`   - Size: ${(stats.size / 1024).toFixed(2)} KB`);
        console.log(`   - Indexes: ${stats.nindexes}`);
        console.log('');
      }
    } else {
      console.log('   No collections found.\n');
    }
    
    console.log('='.repeat(60));
    console.log('✅ Database view completed\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

// Run viewer
viewDatabase();


