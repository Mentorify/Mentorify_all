# Quick Setup Guide

This guide will help you get Mentorify up and running on your local machine in minutes.

## 📋 Prerequisites Checklist

Before you begin, make sure you have:

- [ ] **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- [ ] **npm** (comes with Node.js) or **yarn**
- [ ] **MongoDB** (v4.0 or higher) - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud option)
- [ ] **Git** - [Download here](https://git-scm.com/)
- [ ] A code editor (VS Code recommended)

## 🚀 Quick Start (5 minutes)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Mentorify_Merged_and_coupon
```

### Step 2: MongoDB Setup

Choose one option:

**Option A: Local MongoDB**
```bash
# Start MongoDB (Mac with Homebrew)
brew services start mongodb-community

# Start MongoDB (Linux)
sudo systemctl start mongod

# Start MongoDB (Windows)
# MongoDB should start automatically, or use MongoDB Compass
```

**Option B: MongoDB Atlas (Cloud - Recommended for beginners)**
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster (use free tier)
4. Get your connection string
5. Whitelist your IP address (or use 0.0.0.0/0 for all)

### Step 3: Backend Setup

```bash
# Navigate to server directory
cd unified-server

# Install dependencies (use --legacy-peer-deps to handle peer dependency conflicts)
npm install --legacy-peer-deps

# Create environment file
cp env.example .env

# Edit .env file with your settings
# Required: Update DATABASE, SECRET_KEY, and EMAIL credentials
```

> **Note:** The project includes `.npmrc` files that configure npm to use the public registry (`https://registry.npmjs.org/`). This ensures the project can be built in any environment, including GitHub Actions. If you encounter registry issues, see `NPM_REGISTRY_FIX.md` for troubleshooting.

**Minimum required .env configuration:**
```env
PORT=5020
NODE_ENV=development
DATABASE=mongodb://127.0.0.1:27017/mentorify
SECRET_KEY=change_this_to_a_random_string_at_least_32_chars_long
SUPER_ADMIN_EMAIL=admin@mentorify.com
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

**Start the backend:**
```bash
npm run dev
```

✅ You should see: `Unified server running on port 5020` and `Successfully Connected to Database`

### Step 4: Frontend Setup

Open a **new terminal window**:

```bash
# Navigate to client directory (from project root)
cd unified-client

# Install dependencies (use --legacy-peer-deps to handle peer dependency conflicts)
npm install --legacy-peer-deps

# Create environment file
cp env.example .env

# Edit .env file (usually default is fine)
```

**Default .env configuration:**
```env
REACT_APP_API_URL=http://localhost:5020
```

**Start the frontend:**
```bash
npm start
```

✅ Your browser should automatically open to `http://localhost:3000`

### Step 5: Verify Installation

1. **Backend**: Visit `http://localhost:5020` - You should see "api is running"
2. **Frontend**: Visit `http://localhost:3000` - You should see the Mentorify homepage
3. **Test registration**: Try creating a new account

## 🎯 What's Running?

After setup, you should have:

- **Backend API**: http://localhost:5020
- **Frontend App**: http://localhost:3000
- **MongoDB**: Running locally or on Atlas

## 📧 Email Configuration (Gmail)

For password reset and notifications to work:

1. **Go to Google Account Settings**: https://myaccount.google.com/
2. **Enable 2-Factor Authentication** (if not already enabled)
3. **Generate App Password**:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Mentorify"
   - Copy the 16-character password
4. **Update .env**:
   ```env
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=the_16_char_app_password
   ```

## 🔑 Generating Secure SECRET_KEY

Your `SECRET_KEY` is used for JWT tokens. Generate a secure one:

**Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Using OpenSSL**
```bash
openssl rand -hex 32
```

Copy the output and paste it in your `.env` file.

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"

**Solution 1: Local MongoDB not running**
```bash
# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services panel
```

**Solution 2: Wrong connection string**
- For local: `mongodb://127.0.0.1:27017/mentorify`
- For Atlas: Use connection string from Atlas dashboard

### Issue: "Port 5020 already in use"

**Solution:**
```bash
# Find and kill process on port 5020
# Mac/Linux
lsof -ti:5020 | xargs kill -9

# Windows
netstat -ano | findstr :5020
taskkill /PID <PID> /F

# Or change port in .env
PORT=5021
```

### Issue: "npm install fails"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Or try with legacy peer deps
npm install --legacy-peer-deps
```

### Issue: "Email not sending"

**Solution:**
1. Verify you're using Gmail App Password (not regular password)
2. Check EMAIL_USERNAME and EMAIL_PASSWORD in .env
3. Ensure 2FA is enabled on Gmail account
4. Try a different email service if Gmail doesn't work

### Issue: "Frontend can't connect to backend"

**Solution:**
1. Verify backend is running on port 5020
2. Check `REACT_APP_API_URL` in frontend `.env`
3. Ensure no CORS errors in browser console
4. Verify proxy in `package.json` is set to `http://localhost:5020`

## 📚 Next Steps

After successful setup:

1. **Create Super Admin Account**
   - Register through the UI
   - Use the email specified in `SUPER_ADMIN_EMAIL`

2. **Explore the Application**
   - Try different user roles
   - Test the career clarification feature
   - Generate test reports

3. **Read the Documentation**
   - [README.md](README.md) - Complete project overview
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production
   - [CONTRIBUTING.md](CONTRIBUTING.md) - Contribute to the project

4. **Customize**
   - Update branding and logos
   - Modify test questions
   - Customize email templates

## 🛠️ Development Tools (Optional)

### Recommended VS Code Extensions

- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- MongoDB for VS Code
- GitLens

### Useful Commands

```bash
# Backend
cd unified-server
npm run dev          # Development with auto-reload
npm start           # Production mode

# Frontend
cd unified-client
npm start           # Development server
npm run build       # Production build
npm test            # Run tests
npm run analyze     # Analyze bundle size

# Database
mongosh             # MongoDB shell (if installed)
```

## 📊 Project Structure Overview

```
Mentorify_Merged_and_coupon/
├── unified-client/     # React frontend
│   ├── src/
│   │   ├── Pages/      # All page components
│   │   ├── components/ # Reusable components
│   │   └── api.js      # API configuration
│   └── package.json
│
└── unified-server/     # Express backend
    ├── server/
    │   ├── router/     # API routes
    │   ├── model/      # Database models
    │   └── app.js      # Server entry point
    └── package.json
```

## 🎓 Learning Resources

- **React**: https://react.dev/learn
- **Node.js**: https://nodejs.dev/learn
- **MongoDB**: https://university.mongodb.com/
- **Express**: https://expressjs.com/en/guide/routing.html

## 💡 Tips for Success

1. **Keep both terminals running** - One for backend, one for frontend
2. **Check the console** - Both terminal and browser console for errors
3. **Read error messages** - They usually tell you exactly what's wrong
4. **Use .env.example** - Don't modify it, copy it to .env
5. **Commit often** - Save your work frequently with git

## 🆘 Still Having Issues?

1. **Check the logs** - Both backend and frontend terminals
2. **Review this guide** - Make sure you didn't skip any steps
3. **Check existing issues** - Someone might have had the same problem
4. **Create a new issue** - Include error messages and system info

## ✅ Setup Verification Checklist

- [ ] Node.js installed and working (`node --version`)
- [ ] MongoDB running and accessible
- [ ] Backend dependencies installed
- [ ] Backend .env file configured
- [ ] Backend running without errors
- [ ] Frontend dependencies installed
- [ ] Frontend .env file configured
- [ ] Frontend running and accessible
- [ ] Can access homepage at localhost:3000
- [ ] Can register a new user
- [ ] Email configuration working (optional for initial testing)

## 🎉 Success!

If you've completed all steps and everything is running:

**Congratulations! You're ready to start developing with Mentorify!** 🚀

For more detailed information, see the [complete README](README.md).

---

**Happy Coding!** 💻

