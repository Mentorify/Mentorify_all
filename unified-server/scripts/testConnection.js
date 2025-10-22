/**
 * Test MongoDB Connection Script
 * 
 * This script tests the connection to MongoDB Atlas
 * Run: node scripts/testConnection.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

const DB = process.env.DATABASE;

console.log('🔄 Testing MongoDB Connection...\n');
console.log('Connection String (masked):', DB.replace(/:[^:@]+@/, ':****@'));
console.log('');

mongoose.set('strictQuery', false);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ SUCCESS: Connected to MongoDB Atlas!\n');
  console.log('Database Details:');
  console.log('- Host:', mongoose.connection.host);
  console.log('- Database Name:', mongoose.connection.name);
  console.log('- Connection State:', mongoose.connection.readyState);
  console.log('  (1 = connected, 0 = disconnected)\n');
  
  // List existing collections
  mongoose.connection.db.listCollections().toArray()
    .then(collections => {
      console.log('Existing Collections:');
      if (collections.length === 0) {
        console.log('  No collections yet (will be created on first use)\n');
      } else {
        collections.forEach(col => {
          console.log(`  - ${col.name}`);
        });
        console.log('');
      }
      
      console.log('✅ Connection test completed successfully!');
      console.log('Your database is ready to use.\n');
      process.exit(0);
    })
    .catch(err => {
      console.error('⚠️  Could not list collections:', err.message);
      process.exit(0);
    });
})
.catch((error) => {
  console.error('❌ ERROR: Connection Failed!\n');
  console.error('Error Details:', error.message);
  console.error('\nCommon Solutions:');
  console.error('1. Check your DATABASE connection string in .env');
  console.error('2. Verify username and password are correct');
  console.error('3. Ensure your IP is whitelisted in MongoDB Atlas');
  console.error('4. Check if special characters in password are URL-encoded');
  console.error('\nFor detailed setup instructions, see MONGODB_SETUP_GUIDE.md\n');
  process.exit(1);
});

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
  console.error('❌ Connection Error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Disconnected from MongoDB');
});

// Timeout after 10 seconds
setTimeout(() => {
  console.error('\n❌ Connection timeout after 10 seconds');
  console.error('Please check your internet connection and MongoDB Atlas configuration.\n');
  process.exit(1);
}, 10000);


