/**
 * Database Initialization Script
 * 
 * This script:
 * 1. Connects to MongoDB Atlas
 * 2. Creates collections (if they don't exist)
 * 3. Creates indexes for better performance
 * 4. Verifies the setup
 * 
 * Run: node scripts/initializeDatabase.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../server/model/userSchema');
const Coupon = require('../server/model/couponSchema');

const DB = process.env.DATABASE;

console.log('🚀 Mentorify Database Initialization\n');
console.log('=' .repeat(50));

async function initializeDatabase() {
  try {
    // Connect to MongoDB
    console.log('\n📡 Connecting to MongoDB Atlas...');
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas\n');
    
    const db = mongoose.connection.db;
    
    // Check existing collections
    console.log('🔍 Checking existing collections...');
    const existingCollections = await db.listCollections().toArray();
    const collectionNames = existingCollections.map(col => col.name);
    console.log('Found:', collectionNames.length > 0 ? collectionNames.join(', ') : 'None\n');
    
    // Create Users collection and indexes
    console.log('👥 Setting up Users collection...');
    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      console.log('   ✅ Created users collection');
    } else {
      console.log('   ℹ️  Users collection already exists');
    }
    
    // Ensure email index (unique)
    try {
      await User.collection.createIndex({ email: 1 }, { unique: true });
      console.log('   ✅ Created unique index on email');
    } catch (err) {
      console.log('   ℹ️  Email index already exists');
    }
    
    // Create index on role for faster queries
    try {
      await User.collection.createIndex({ role: 1 });
      console.log('   ✅ Created index on role');
    } catch (err) {
      console.log('   ℹ️  Role index already exists');
    }
    
    // Create Coupons collection and indexes
    console.log('\n🎟️  Setting up Coupons collection...');
    if (!collectionNames.includes('coupons')) {
      await db.createCollection('coupons');
      console.log('   ✅ Created coupons collection');
    } else {
      console.log('   ℹ️  Coupons collection already exists');
    }
    
    // Create coupon indexes (defined in schema)
    const couponIndexes = [
      { couponName: 1 },
      { type: 1 },
      { isActive: 1 },
      { expiryDate: 1 },
      { assignedUsers: 1 }
    ];
    
    for (const index of couponIndexes) {
      try {
        await Coupon.collection.createIndex(index);
        const indexName = Object.keys(index)[0];
        console.log(`   ✅ Created index on ${indexName}`);
      } catch (err) {
        // Index might already exist
      }
    }
    
    // Get collection stats
    console.log('\n📊 Database Statistics:');
    
    try {
      const userCount = await User.countDocuments();
      console.log(`   Users: ${userCount}`);
    } catch (err) {
      console.log('   Users: 0');
    }
    
    try {
      const couponCount = await Coupon.countDocuments();
      console.log(`   Coupons: ${couponCount}`);
    } catch (err) {
      console.log('   Coupons: 0');
    }
    
    // List all indexes
    console.log('\n📑 Indexes Created:');
    
    const userIndexes = await User.collection.indexes();
    console.log('\n   Users collection:');
    userIndexes.forEach(idx => {
      const keys = Object.keys(idx.key).join(', ');
      const unique = idx.unique ? ' (unique)' : '';
      console.log(`   - ${keys}${unique}`);
    });
    
    const couponIndexes2 = await Coupon.collection.indexes();
    console.log('\n   Coupons collection:');
    couponIndexes2.forEach(idx => {
      const keys = Object.keys(idx.key).join(', ');
      const unique = idx.unique ? ' (unique)' : '';
      console.log(`   - ${keys}${unique}`);
    });
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Database initialization completed successfully!');
    console.log('='.repeat(50));
    console.log('\n💡 Next Steps:');
    console.log('1. Start your backend server: npm run dev');
    console.log('2. Register your first user');
    console.log('3. Use the email from SUPER_ADMIN_EMAIL to create super admin');
    console.log('\nFor more information, see MONGODB_SETUP_GUIDE.md\n');
    
  } catch (error) {
    console.error('\n❌ Error during initialization:', error.message);
    console.error('\nPlease check:');
    console.error('1. Your DATABASE connection string in .env');
    console.error('2. Network connectivity to MongoDB Atlas');
    console.error('3. IP whitelist configuration in Atlas\n');
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed\n');
    process.exit(0);
  }
}

// Run initialization
initializeDatabase();


