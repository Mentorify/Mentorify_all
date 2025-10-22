# Database Scripts

Utility scripts for managing your Mentorify MongoDB database.

## Available Scripts

### 1. Test Connection

Tests the connection to your MongoDB Atlas database.

```bash
node scripts/testConnection.js
```

**What it does:**
- ✅ Tests MongoDB connection
- ✅ Displays database name and host
- ✅ Lists existing collections
- ✅ Verifies connectivity

**Use when:**
- Setting up database for the first time
- Troubleshooting connection issues
- Verifying credentials

---

### 2. Initialize Database

Sets up collections and creates indexes for optimal performance.

```bash
node scripts/initializeDatabase.js
```

**What it does:**
- ✅ Creates users and coupons collections
- ✅ Creates all necessary indexes
- ✅ Displays database statistics
- ✅ Lists all indexes created

**Use when:**
- First-time database setup
- After schema changes
- To ensure all indexes are created

**Note:** MongoDB with Mongoose creates collections automatically, so this script is optional but recommended for production.

---

### 3. View Database

Displays the current state of your database with statistics.

```bash
node scripts/viewDatabase.js
```

**What it does:**
- ✅ Shows user count and breakdown by role
- ✅ Displays recent users
- ✅ Shows coupon statistics
- ✅ Lists all coupons with status
- ✅ Displays collection sizes

**Use when:**
- Checking database contents
- Debugging issues
- Monitoring growth
- Before/after migrations

---

## Prerequisites

Before running any script, ensure:

1. **Environment variables configured**:
   ```bash
   cd unified-server
   cp env.example .env
   # Edit .env with your MongoDB Atlas connection string
   ```

2. **Dependencies installed**:
   ```bash
   npm install
   ```

3. **MongoDB Atlas configured**:
   - See `MONGODB_SETUP_GUIDE.md` for detailed setup

---

## Quick Start

### First Time Setup

1. **Test connection**:
   ```bash
   node scripts/testConnection.js
   ```

2. **Initialize database** (optional):
   ```bash
   node scripts/initializeDatabase.js
   ```

3. **Start server**:
   ```bash
   npm run dev
   ```

4. **View database** (anytime):
   ```bash
   node scripts/viewDatabase.js
   ```

---

## Script Output Examples

### Test Connection - Success
```
✅ SUCCESS: Connected to MongoDB Atlas!

Database Details:
- Host: cluster0.xxxxx.mongodb.net
- Database Name: mentorify
- Connection State: 1
  (1 = connected, 0 = disconnected)

Existing Collections:
  No collections yet (will be created on first use)

✅ Connection test completed successfully!
```

### Test Connection - Failure
```
❌ ERROR: Connection Failed!

Error Details: Authentication failed

Common Solutions:
1. Check your DATABASE connection string in .env
2. Verify username and password are correct
3. Ensure your IP is whitelisted in MongoDB Atlas
4. Check if special characters in password are URL-encoded
```

### Initialize Database
```
✅ Database initialization completed successfully!

💡 Next Steps:
1. Start your backend server: npm run dev
2. Register your first user
3. Use the email from SUPER_ADMIN_EMAIL to create super admin
```

### View Database
```
👥 USERS COLLECTION
Total Users: 5

Users by Role:
- user: 3
- admin: 1
- superadmin: 1

Recent Users (last 5):
1. John Doe
   Email: john@example.com
   Role: user
   Created: 2025-01-15
```

---

## Troubleshooting

### "Cannot find module '../server/model/...'"

**Solution:** Run from the correct directory:
```bash
cd /Users/dibyamon/Mentorify/Mentorify_Merged_and_coupon/unified-server
node scripts/scriptName.js
```

### "DATABASE is not defined"

**Solution:** Ensure `.env` file exists with DATABASE variable:
```bash
# Check if .env exists
ls -la .env

# If not, create it
cp env.example .env

# Edit it with your connection string
nano .env
```

### Connection timeout

**Solution:**
1. Check internet connection
2. Verify IP is whitelisted in MongoDB Atlas
3. Check if MongoDB Atlas cluster is running

---

## Adding Your Own Scripts

To create custom scripts:

1. **Create script file**:
   ```bash
   touch scripts/myScript.js
   ```

2. **Add dotenv and connection**:
   ```javascript
   require('dotenv').config();
   const mongoose = require('mongoose');
   const DB = process.env.DATABASE;
   
   async function myFunction() {
     await mongoose.connect(DB, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     
     // Your code here
     
     await mongoose.connection.close();
   }
   
   myFunction();
   ```

3. **Run it**:
   ```bash
   node scripts/myScript.js
   ```

---

## Best Practices

1. **Always close connection** when script finishes:
   ```javascript
   await mongoose.connection.close();
   ```

2. **Handle errors gracefully**:
   ```javascript
   try {
     // Your code
   } catch (error) {
     console.error('Error:', error.message);
   } finally {
     await mongoose.connection.close();
   }
   ```

3. **Use proper exit codes**:
   ```javascript
   process.exit(0);  // Success
   process.exit(1);  // Error
   ```

4. **Never commit `.env`** files with real credentials

---

## Production Use

For production databases:

1. **Use separate connection string** for production
2. **Test scripts on staging first**
3. **Backup before running destructive operations**
4. **Schedule maintenance windows** for index creation
5. **Monitor performance** during and after running scripts

---

## Additional Resources

- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Mongoose Docs**: https://mongoosejs.com/docs/
- **Setup Guide**: `../MONGODB_SETUP_GUIDE.md`

---

**Need help?** Check the main documentation or MongoDB Atlas support.


