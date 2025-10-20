# 🚀 Mentorify - Quick Reference Guide

A one-page reference for common tasks and important information.

## 📦 Project Info

- **Name**: Mentorify
- **Version**: 1.0.0
- **Type**: MERN Stack Application
- **License**: MIT

## 🔗 Important URLs (Development)

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5020 |
| MongoDB (local) | mongodb://127.0.0.1:27017/mentorify |

## ⚡ Quick Commands

### Setup (First Time)

```bash
# Backend
cd unified-server && npm install && cp env.example .env

# Frontend
cd unified-client && npm install && cp env.example .env
```

### Development

```bash
# Terminal 1 - Backend
cd unified-server && npm run dev

# Terminal 2 - Frontend
cd unified-client && npm start
```

### Production Build

```bash
# Backend
cd unified-server && npm start

# Frontend
cd unified-client && npm run build
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `SETUP.md` | Setup instructions |
| `DEPLOYMENT.md` | Deployment guide |
| `GITHUB_SETUP.md` | GitHub upload guide |
| `DELIVERABLE_SUMMARY.md` | Project deliverable overview |
| `env.example` | Environment template |

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5020
NODE_ENV=development
DATABASE=mongodb://127.0.0.1:27017/mentorify
SECRET_KEY=your_secure_key_here
SUPER_ADMIN_EMAIL=admin@mentorify.com
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5020
```

## 🛠️ Common Tasks

### Install Dependencies

```bash
# Both
npm install

# Update all
npm update

# Check for vulnerabilities
npm audit
npm audit fix
```

### Database

```bash
# Start MongoDB (Mac)
brew services start mongodb-community

# Start MongoDB (Linux)
sudo systemctl start mongod

# Connect to MongoDB
mongosh mentorify
```

### Git Operations

```bash
# Initial commit
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin <repo-url>
git push -u origin main

# Create tag
git tag -a v1.0.0 -m "Version 1.0.0"
git push --tags
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Mac/Linux
lsof -ti:5020 | xargs kill -9

# Windows
netstat -ano | findstr :5020
taskkill /PID <PID> /F
```

### MongoDB Connection Error

```bash
# Check if MongoDB is running
mongosh

# Check connection string in .env
DATABASE=mongodb://127.0.0.1:27017/mentorify
```

### npm Install Fails

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Email Not Sending

1. Use Gmail App Password (not regular password)
2. Enable 2FA on Gmail
3. Generate App Password in Google Account settings

## 📚 Documentation Quick Links

- **Getting Started**: See `SETUP.md`
- **Deployment**: See `DEPLOYMENT.md`
- **GitHub Upload**: See `GITHUB_SETUP.md`
- **API Reference**: See `unified-server/README.md`
- **Frontend Guide**: See `unified-client/README.md`
- **Security**: See `SECURITY.md`
- **Contributing**: See `CONTRIBUTING.md`

## 🎯 User Roles

1. **Student** - Take tests, view results
2. **School Admin** - Manage school students
3. **Franchise Admin** - Manage franchise
4. **Admin** - Platform administration
5. **Super Admin** - Full control

## 🔒 Security Checklist

- [ ] `.env` files not in git
- [ ] Strong `SECRET_KEY` generated
- [ ] Database password changed from default
- [ ] Email credentials secured
- [ ] HTTPS enabled (production)
- [ ] CORS configured properly

## 📊 Project Structure

```
Mentorify/
├── 📄 Docs (README, SETUP, etc.)
├── 🎨 unified-client/ (React frontend)
└── 🔧 unified-server/ (Express backend)
```

## 🚀 Deployment Quick Steps

1. Set up MongoDB (Atlas recommended)
2. Deploy backend (Heroku/Railway/AWS)
3. Deploy frontend (Netlify/Vercel)
4. Configure environment variables
5. Test all endpoints

## 📞 Need Help?

1. Check relevant documentation file
2. Search existing issues
3. Review error logs
4. Check browser/terminal console

## ⚡ Performance Tips

- Use `npm run build` for production
- Enable compression on server
- Use MongoDB indexes
- Implement Redis caching (optional)
- Use CDN for static assets

## 🧪 Testing

```bash
# Frontend
cd unified-client && npm test

# Backend
cd unified-server && npm test

# Coverage
npm test -- --coverage
```

## 📝 Commit Message Format

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

## 🔄 Update Dependencies

```bash
# Check outdated
npm outdated

# Update all
npm update

# Update specific package
npm install package@latest
```

## 📦 Build Sizes

### Optimize Frontend Build

```bash
# Analyze bundle
cd unified-client
npm run analyze

# Build for production
npm run build
```

## 🌐 Hosting Options

### Backend
- Heroku (easy)
- Railway (modern)
- AWS EC2 (scalable)
- DigitalOcean (flexible)

### Frontend
- Netlify (easy)
- Vercel (fast)
- AWS S3 + CloudFront (scalable)
- GitHub Pages (free)

### Database
- MongoDB Atlas (recommended)
- Self-hosted MongoDB
- MongoDB on cloud provider

## 🎨 Customization

### Branding
- Update logos in `public/img/`
- Modify colors in CSS files
- Update text content in components

### Email Templates
- Edit in `server/services/sendMail/`

### Tests
- Modify test questions in relevant components

## 🔐 Generate Secure Keys

```bash
# SECRET_KEY
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or
openssl rand -hex 32
```

## 📈 Monitoring

### Logs

```bash
# Backend (PM2)
pm2 logs

# Backend (Heroku)
heroku logs --tail

# Frontend
# Check browser console
```

### Database

```bash
# Connect to MongoDB
mongosh mentorify

# Show collections
show collections

# Count users
db.users.countDocuments()
```

## 🎯 Next Steps After Setup

1. ✅ Create super admin account
2. ✅ Test all features
3. ✅ Customize branding
4. ✅ Configure email
5. ✅ Deploy to staging
6. ✅ Test in production-like environment
7. ✅ Deploy to production

## 📋 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database backup created
- [ ] SSL certificate ready
- [ ] Domain configured
- [ ] Email service tested
- [ ] Monitoring set up

## 🆘 Emergency Commands

### Reset Database

```bash
mongosh
use mentorify
db.dropDatabase()
```

### Clear All Logs

```bash
# PM2
pm2 flush

# Clear terminal
clear
```

### Force Restart

```bash
# PM2
pm2 restart all --update-env

# Heroku
heroku restart
```

## 💡 Pro Tips

1. Keep `.env` files secure
2. Never commit secrets
3. Use environment-specific configs
4. Monitor error logs regularly
5. Keep dependencies updated
6. Backup database regularly
7. Use version control properly
8. Document all changes

## 🎉 Quick Wins

- ✅ All documentation included
- ✅ Security best practices followed
- ✅ Production-ready code
- ✅ Easy setup process
- ✅ Comprehensive guides
- ✅ Professional structure

---

**Keep this file bookmarked for quick reference!** 📌

For detailed information, see the complete documentation files.

