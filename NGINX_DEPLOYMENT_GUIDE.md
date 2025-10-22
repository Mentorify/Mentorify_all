# Nginx Deployment Configuration Guide

This guide explains the nginx configuration for the Mentorify application deployed on EC2.

## 🏗️ Architecture Overview

```
User Browser
    ↓
Nginx (Port 80)
    ├── / → React Frontend (from /home/ubuntu/unified-server/build)
    └── /api/* → Node.js Backend (proxy to localhost:5020)
```

## 📁 File Structure

```
/home/ubuntu/unified-server/
├── build/                 # React frontend build files
├── server/
│   └── app.js            # Backend entry point (running on port 5020)
└── node_modules/         # Backend dependencies

/etc/nginx/
├── sites-available/
│   └── mentorify         # Nginx configuration file
└── sites-enabled/
    └── mentorify         # Symlink to sites-available/mentorify
```

## 🔧 Configuration Details

### Nginx Configuration (`nginx.conf`)

The nginx configuration handles:

1. **Static File Serving**: Serves React build files from `/home/ubuntu/unified-server/build`
2. **API Proxying**: Forwards `/api/*` requests to backend at `localhost:5020`
3. **React Router Support**: All non-file routes serve `index.html` for client-side routing
4. **Security Headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
5. **Caching**: Static assets cached for 1 year, HTML files no-cache
6. **Compression**: Gzip enabled for text files

### Frontend API Configuration

**Development** (`unified-client/env.example`):
```env
REACT_APP_API_URL=http://localhost:5020
```

**Production** (`.env.production` - created by CI/CD):
```env
REACT_APP_API_URL=/api
```

The `api.js` file automatically uses:
- `process.env.REACT_APP_API_URL` if set
- Falls back to `/api` (nginx proxy) if not set

## 🚀 Deployment Process

### Automated (via GitHub Actions)

Every push to `main` branch automatically:

1. **Builds** the React frontend with production API config
2. **Copies** files to EC2:
   - `unified-server/` → Backend files
   - `unified-client/build/` → Frontend files
   - `nginx.conf` → Nginx configuration
3. **Configures Nginx**:
   - Copies config to `/etc/nginx/sites-available/mentorify`
   - Creates symlink in `/etc/nginx/sites-enabled/`
   - Tests and reloads nginx
4. **Starts Backend** with PM2:
   - Stops/deletes existing process
   - Starts fresh instance as `mentorify-backend`
   - Saves PM2 process list

### Manual Configuration (if needed)

If you need to manually configure nginx:

```bash
# SSH into EC2
ssh ubuntu@13.200.170.243

# Copy nginx config
sudo cp ~/nginx.conf /etc/nginx/sites-available/mentorify

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Enable Mentorify site
sudo ln -sf /etc/nginx/sites-available/mentorify /etc/nginx/sites-enabled/mentorify

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## 🔍 Verification

### Check Nginx Status
```bash
sudo systemctl status nginx
```

### Check Nginx Configuration
```bash
sudo nginx -t
```

### View Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/mentorify-access.log

# Error logs
sudo tail -f /var/log/nginx/mentorify-error.log
```

### Test Frontend
```bash
curl http://13.200.170.243/
# Should return React app HTML
```

### Test API Proxy
```bash
curl http://13.200.170.243/api/
# Should proxy to backend and return API response
```

### Check Backend (PM2)
```bash
pm2 status
pm2 logs mentorify-backend
```

## 🌐 URLs

### Production URLs
- **Frontend**: http://13.200.170.243/
- **API**: http://13.200.170.243/api/*
- **Backend (internal)**: http://localhost:5020

### Development URLs
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5020

## 🔒 Security Considerations

### Current Configuration
- ✅ Security headers enabled
- ✅ Backend not exposed directly (proxied through nginx)
- ✅ Hidden files denied (`.env`, `.git`, etc.)
- ✅ XSS protection enabled

### Recommended Improvements
- [ ] Add SSL/TLS certificate (use Let's Encrypt)
- [ ] Configure firewall to block direct access to port 5020
- [ ] Add rate limiting for API endpoints
- [ ] Enable fail2ban for SSH protection
- [ ] Add domain name and use HTTPS

### SSL Configuration (Future)

Once you have a domain and SSL certificate:

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # ... rest of configuration
}

server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

## 🐛 Troubleshooting

### Issue: Nginx shows default welcome page
**Solution**: Check if site is enabled
```bash
ls -la /etc/nginx/sites-enabled/
# Should show symlink to mentorify
```

### Issue: 502 Bad Gateway
**Cause**: Backend is not running
**Solution**: Check PM2 and restart backend
```bash
pm2 status
pm2 restart mentorify-backend
```

### Issue: 404 on page refresh
**Cause**: React Router configuration
**Solution**: Verify `try_files $uri $uri/ /index.html;` is in nginx config

### Issue: API calls fail (CORS errors)
**Cause**: API proxy configuration
**Solution**: Check nginx proxy settings and backend CORS config

### Issue: Static files not loading
**Cause**: Incorrect root directory
**Solution**: Verify build files exist at `/home/ubuntu/unified-server/build`
```bash
ls -la /home/ubuntu/unified-server/build/
```

## 📊 Monitoring

### Check Disk Space
```bash
df -h
```

### Check Memory Usage
```bash
free -h
pm2 monit
```

### Check Nginx Workers
```bash
ps aux | grep nginx
```

### Check Backend Logs
```bash
pm2 logs mentorify-backend --lines 100
```

## 🔄 Updates and Maintenance

### Updating the Application
Simply push to GitHub - CI/CD will handle deployment automatically.

### Manual Restart
```bash
# Restart backend
pm2 restart mentorify-backend

# Reload nginx
sudo systemctl reload nginx

# Full restart (if needed)
sudo systemctl restart nginx
```

### Clear Nginx Cache
```bash
sudo systemctl reload nginx
```

### Update Nginx Configuration
```bash
# Edit configuration
sudo nano /etc/nginx/sites-available/mentorify

# Test configuration
sudo nginx -t

# Apply changes
sudo systemctl reload nginx
```

## 📚 Additional Resources

- [Nginx Documentation](https://nginx.org/en/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Let's Encrypt SSL](https://letsencrypt.org/getting-started/)

## 📞 Support

For issues with:
- **Nginx**: Check error logs at `/var/log/nginx/mentorify-error.log`
- **Backend**: Check PM2 logs with `pm2 logs mentorify-backend`
- **Frontend**: Check browser console for JavaScript errors
- **Deployment**: Check GitHub Actions logs

---

**Last Updated**: October 22, 2025  
**Configuration Version**: 1.0.0  
**Status**: ✅ Configured and Deployed

