# Deployment Guide

This guide provides step-by-step instructions for deploying the Mentorify application to production.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Database Setup](#database-setup)
- [Environment Configuration](#environment-configuration)
- [Deployment Checklist](#deployment-checklist)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

### Required Services

1. **MongoDB Database**
   - Local MongoDB instance, or
   - MongoDB Atlas (recommended for production)

2. **Backend Hosting**
   - Heroku, AWS, DigitalOcean, Railway, Render, etc.
   - Node.js support required

3. **Frontend Hosting**
   - Netlify, Vercel, AWS S3, GitHub Pages, etc.
   - Static site hosting

4. **Domain & SSL** (Optional but recommended)
   - Custom domain
   - SSL certificate (usually provided by hosting service)

## 🗄️ Database Setup

### Option 1: MongoDB Atlas (Recommended)

1. **Create Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Choose a cloud provider (AWS, Google Cloud, or Azure)
   - Select region closest to your users
   - Choose free tier for testing or paid tier for production

3. **Configure Network Access**
   - Add IP whitelist (0.0.0.0/0 for all IPs, or specific IPs)
   - Create database user with password

4. **Get Connection String**
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/mentorify?retryWrites=true&w=majority
   ```

5. **Create Database**
   - Database name: `mentorify`
   - Collections will be created automatically

### Option 2: Self-Hosted MongoDB

1. Install MongoDB on your server
2. Configure authentication
3. Set up backups
4. Configure firewall rules

## 🚀 Backend Deployment

### Option A: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd unified-server
   heroku create mentorify-api
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=5020
   heroku config:set DATABASE="your_mongodb_connection_string"
   heroku config:set SECRET_KEY="your_secure_secret_key"
   heroku config:set SUPER_ADMIN_EMAIL="admin@mentorify.com"
   heroku config:set EMAIL_USERNAME="your_email@gmail.com"
   heroku config:set EMAIL_PASSWORD="your_app_password"
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

6. **Verify Deployment**
   ```bash
   heroku open
   heroku logs --tail
   ```

### Option B: Railway

1. **Visit [Railway.app](https://railway.app)**
2. **Connect GitHub Repository**
3. **Select unified-server folder**
4. **Configure Environment Variables**
   - Add all variables from `.env`
5. **Deploy automatically on push**

### Option C: DigitalOcean / AWS / Custom VPS

1. **Set Up Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   ```

2. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd mentorify/unified-server
   ```

3. **Install Dependencies**
   ```bash
   npm install --production
   ```

4. **Configure Environment**
   ```bash
   nano .env
   # Add all environment variables
   ```

5. **Start with PM2**
   ```bash
   pm2 start server/app.js --name mentorify-api
   pm2 startup
   pm2 save
   ```

6. **Set Up Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5020;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🎨 Frontend Deployment

### Option A: Netlify

1. **Build Application**
   ```bash
   cd unified-client
   npm install
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **Or Deploy via Website**
   - Visit [Netlify](https://www.netlify.com)
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Add environment variables

4. **Configure Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```

### Option B: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd unified-client
   vercel
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add REACT_APP_API_URL production
   ```

### Option C: AWS S3 + CloudFront

1. **Build Application**
   ```bash
   cd unified-client
   npm run build
   ```

2. **Create S3 Bucket**
   - Enable static website hosting
   - Set bucket policy for public read

3. **Upload Build Files**
   ```bash
   aws s3 sync build/ s3://your-bucket-name
   ```

4. **Set Up CloudFront Distribution**
   - Point to S3 bucket
   - Configure SSL certificate
   - Set custom domain

## ⚙️ Environment Configuration

### Backend Environment Variables (Production)

```env
# Server
NODE_ENV=production
PORT=5020

# Database
DATABASE=mongodb+srv://user:pass@cluster.mongodb.net/mentorify?retryWrites=true&w=majority

# Security
SECRET_KEY=your_very_secure_random_string_at_least_32_characters

# Admin
SUPER_ADMIN_EMAIL=admin@yourdomain.com

# Email
EMAIL_USERNAME=noreply@yourdomain.com
EMAIL_PASSWORD=your_email_app_password
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

### Frontend Environment Variables (Production)

```env
REACT_APP_API_URL=https://api.yourdomain.com
```

### Generating Secure SECRET_KEY

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 32

# Option 3: Using online generator
# Visit: https://randomkeygen.com/
```

## ✅ Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Dependencies updated
- [ ] Security vulnerabilities checked (`npm audit`)
- [ ] Environment variables documented
- [ ] Database backup created
- [ ] Build tested locally

### Backend Checklist

- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] SECRET_KEY is secure and unique
- [ ] Email service configured
- [ ] CORS settings updated for production domain
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Rate limiting enabled (if applicable)

### Frontend Checklist

- [ ] API URL points to production backend
- [ ] Build optimized (`npm run build`)
- [ ] All environment variables set
- [ ] Images optimized
- [ ] Console.logs removed
- [ ] Analytics configured (if applicable)
- [ ] SEO meta tags added
- [ ] Favicon added

### Security Checklist

- [ ] All secrets in environment variables
- [ ] .env files not committed to git
- [ ] HTTPS enabled
- [ ] Database access restricted
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] CSRF protection enabled
- [ ] Rate limiting configured
- [ ] Security headers configured

## 🔍 Post-Deployment

### Verification Steps

1. **Test API Endpoints**
   ```bash
   curl https://api.yourdomain.com/
   ```

2. **Test Frontend**
   - Visit website in browser
   - Test all major features
   - Check console for errors
   - Test on mobile devices

3. **Test Authentication**
   - Login/Logout
   - Registration
   - Password reset

4. **Monitor Logs**
   ```bash
   # Heroku
   heroku logs --tail

   # PM2
   pm2 logs

   # Railway
   # Check dashboard logs
   ```

5. **Database Verification**
   - Connect to production database
   - Verify data integrity
   - Check indexes

### Monitoring Setup

1. **Application Monitoring**
   - Set up error tracking (Sentry, Rollbar)
   - Configure uptime monitoring (UptimeRobot, Pingdom)
   - Set up performance monitoring

2. **Database Monitoring**
   - Enable MongoDB Atlas monitoring
   - Set up alerts for high usage
   - Configure automated backups

3. **Set Up Alerts**
   - Email alerts for errors
   - Slack/Discord notifications
   - SMS for critical issues

## 🐛 Troubleshooting

### Common Issues

#### Backend Not Starting

```bash
# Check logs
heroku logs --tail

# Verify environment variables
heroku config

# Check database connection
# Ensure DATABASE URL is correct
```

#### Frontend Can't Connect to Backend

1. Check `REACT_APP_API_URL` is set correctly
2. Verify CORS settings on backend
3. Check if backend is running
4. Verify SSL certificates

#### Database Connection Issues

1. Check connection string format
2. Verify IP whitelist in MongoDB Atlas
3. Check database user credentials
4. Ensure network access is configured

#### Email Not Sending

1. Verify email credentials
2. For Gmail, use App Password
3. Check SMTP settings
4. Verify firewall allows outbound SMTP

### Performance Issues

1. **Enable Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add Redis Caching** (if needed)

3. **Optimize Database Queries**
   - Add indexes
   - Use lean() for read operations
   - Implement pagination

4. **Use CDN for Static Assets**

## 🔄 Continuous Deployment

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "mentorify-api"
          heroku_email: "your-email@example.com"
```

## 📝 Maintenance

### Regular Tasks

- Monitor error logs daily
- Check performance metrics weekly
- Update dependencies monthly
- Review security audits monthly
- Backup database weekly
- Review and rotate secrets quarterly

### Updating Application

```bash
# Pull latest code
git pull origin main

# Backend
cd unified-server
npm install
pm2 restart mentorify-api

# Frontend
cd unified-client
npm install
npm run build
# Upload to hosting service
```

## 🆘 Support

For deployment issues:
1. Check logs first
2. Review this documentation
3. Search existing issues
4. Contact the development team

---

**Good luck with your deployment!** 🚀

