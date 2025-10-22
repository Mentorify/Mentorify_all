# 🚀 MongoDB Atlas - Quick Setup (5 Minutes)

Super quick guide to get your database connected and running.

## ⚡ Step-by-Step (Follow Exactly)

### 1️⃣ Create MongoDB Atlas Account (2 min)

1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with client's email
3. Verify email (check inbox)

### 2️⃣ Create Free Cluster (2 min)

1. Click **"Build a Database"**
2. Choose **"Shared"** (FREE)
3. Select **AWS** as provider
4. Choose region **closest to your users**:
   - India: Mumbai or Singapore
   - US: N. Virginia or Oregon
   - Europe: Ireland or Frankfurt
5. Cluster Name: `Mentorify-Cluster`
6. Click **"Create"**
7. ⏳ Wait 2-3 minutes for cluster creation

### 3️⃣ Create Database User (30 sec)

1. A popup will appear (or go to Security → Database Access)
2. Click **"Add New Database User"**
3. Username: `mentorify_admin`
4. Click **"Autogenerate Secure Password"**
5. **📝 COPY AND SAVE THIS PASSWORD!** (you'll need it)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 4️⃣ Whitelist IP Address (30 sec)

1. A popup will appear (or go to Security → Network Access)
2. Click **"Allow Access from Anywhere"**
   - IP Address: `0.0.0.0/0`
   - Comment: "Development access"
3. Click **"Confirm"**

⚠️ **For production, restrict to specific IPs later!**

### 5️⃣ Get Connection String (1 min)

1. Go to **Database** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Driver: **Node.js**
5. Copy the connection string:
   ```
   mongodb+srv://mentorify_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `<password>`** with the password you saved
7. **Add `/mentorify`** before the `?`:
   ```
   mongodb+srv://mentorify_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mentorify?retryWrites=true&w=majority
   ```

### 6️⃣ Update Your .env File (30 sec)

```bash
cd /Users/dibyamon/Mentorify/Mentorify_Merged_and_coupon/unified-server
nano .env
```

Update the `DATABASE` line:
```env
DATABASE=mongodb+srv://mentorify_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mentorify?retryWrites=true&w=majority
```

Save: `Ctrl+X`, then `Y`, then `Enter`

### 7️⃣ Test Connection (30 sec)

```bash
npm run db:test
```

You should see:
```
✅ SUCCESS: Connected to MongoDB Atlas!
```

If it fails, check the troubleshooting section below.

---

## ✅ Done! Your Database is Ready

Now you can:

```bash
# Start your server
npm run dev

# Or initialize database (optional)
npm run db:init

# Or view database contents
npm run db:view
```

---

## 🎯 What Just Happened?

You created:
- ✅ MongoDB Atlas account
- ✅ Free cloud database cluster
- ✅ Database user with password
- ✅ Network access rule
- ✅ Connection to your Mentorify app

Your data is now stored in the cloud! 🌥️

---

## 📋 Your Credentials (Save These!)

```
MongoDB Atlas Credentials:
- Username: mentorify_admin
- Password: [the password you generated]
- Cluster: Mentorify-Cluster
- Database: mentorify
- Connection String: [your full connection string]
```

**Keep these secure! Never commit to git!**

---

## 🐛 Troubleshooting

### ❌ "Authentication failed"

**Problem**: Wrong password or username

**Fix**:
1. Go to Atlas → Security → Database Access
2. Click "Edit" on your user
3. Reset password
4. Update your `.env` file

### ❌ "Connection timeout"

**Problem**: IP not whitelisted

**Fix**:
1. Go to Atlas → Security → Network Access
2. Add your current IP or use `0.0.0.0/0`

### ❌ "MongoServerError: bad auth"

**Problem**: Special characters in password not URL-encoded

**Fix**: If your password has special characters, encode them:
- `@` → `%40`
- `#` → `%23`
- `/` → `%2F`
- `:` → `%3A`

Or generate a new password without special characters.

---

## 🔄 Quick Commands

```bash
# Test connection
npm run db:test

# Initialize database (creates collections & indexes)
npm run db:init

# View database contents
npm run db:view

# Start server
npm run dev
```

---

## 📚 Need More Details?

See the complete guide: **`MONGODB_SETUP_GUIDE.md`**

---

## 🎉 Next Steps

1. ✅ Start your backend: `npm run dev`
2. ✅ Start your frontend: `cd ../unified-client && npm start`
3. ✅ Register your first user at: http://localhost:3000/signup
4. ✅ Check your database: `npm run db:view`

**Your Mentorify app is now connected to cloud database!** 🚀


