# HTTPS/SSL Setup Guide for Mentorify

This guide explains how to add HTTPS (SSL/TLS encryption) to your Mentorify application.

## 🔒 Why HTTPS?

- **Security**: Encrypts data between users and server
- **Trust**: Browsers show "Secure" badge
- **SEO**: Better Google rankings
- **Modern Features**: Required for PWA, geolocation, etc.
- **Compliance**: Required for handling sensitive data

---

## 📋 Prerequisites

Before setting up HTTPS, you need:

1. ✅ **Domain Name** (e.g., `mentorify.com`)
   - Purchase from: Namecheap, GoDaddy, Google Domains, etc.
   - Cost: ~$10-15/year

2. ✅ **Domain Pointed to EC2**
   - Add A record: `yourdomain.com` → `13.200.170.243`
   - Add A record: `www.yourdomain.com` → `13.200.170.243`

3. ✅ **Port 443 Open in Security Group**
   - AWS Console → EC2 → Security Groups
   - Add inbound rule: HTTPS (443) from 0.0.0.0/0

---

## 🚀 Method 1: Let's Encrypt (Free SSL) - RECOMMENDED

### Step 1: Point Your Domain to EC2

In your domain registrar's DNS settings:

```
Type    Name    Value
A       @       13.200.170.243
A       www     13.200.170.243
```

Wait 5-10 minutes for DNS propagation.

**Verify DNS is working:**
```bash
nslookup yourdomain.com
# Should return 13.200.170.243
```

### Step 2: Update Nginx Configuration

SSH into EC2 and update the nginx config:

```bash
ssh ubuntu@13.200.170.243

# Edit nginx config
sudo nano /etc/nginx/sites-available/mentorify
```

Change `server_name` from IP to your domain:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;  # Change this line
    
    # ... rest of config
}
```

Test and reload:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Step 3: Install Certbot

```bash
# Update packages
sudo apt update

# Install Certbot and Nginx plugin
sudo apt install certbot python3-certbot-nginx -y
```

### Step 4: Obtain SSL Certificate

```bash
# Get certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Certbot will ask:
# 1. Email address (for renewal notifications)
# 2. Agree to Terms of Service (yes)
# 3. Share email with EFF (optional)
# 4. Redirect HTTP to HTTPS (choose option 2)
```

**That's it!** Certbot will:
- ✅ Obtain SSL certificate from Let's Encrypt
- ✅ Update nginx configuration automatically
- ✅ Set up HTTP → HTTPS redirect
- ✅ Configure auto-renewal

### Step 5: Verify HTTPS is Working

```bash
# Test from EC2
curl -I https://yourdomain.com

# Open in browser
https://yourdomain.com
```

You should see:
- ✅ Padlock icon in browser
- ✅ "Connection is secure" message
- ✅ Valid certificate

### Step 6: Auto-Renewal

Certbot automatically sets up certificate renewal. Test it:

```bash
# Dry run renewal
sudo certbot renew --dry-run

# Check renewal timer
sudo systemctl status certbot.timer
```

Certificates auto-renew every 60 days!

---

## 🔐 Method 2: AWS Certificate Manager (ACM) + Load Balancer

For production environments, consider using AWS ACM with Application Load Balancer.

### Pros:
- ✅ Free SSL certificates
- ✅ Automatic renewal
- ✅ Built-in AWS integration
- ✅ Better scalability

### Cons:
- ❌ More complex setup
- ❌ Additional AWS costs (ALB)
- ❌ Requires more configuration

### Basic Steps:

1. **Create Certificate in ACM**
   - AWS Console → Certificate Manager
   - Request public certificate
   - Add your domain name
   - Validate via DNS or Email

2. **Create Application Load Balancer**
   - AWS Console → EC2 → Load Balancers
   - Create ALB
   - Add HTTPS listener (port 443)
   - Attach ACM certificate

3. **Configure Target Group**
   - Point to your EC2 instance
   - Health check on port 80

4. **Update DNS**
   - Point domain to ALB DNS name (CNAME)

---

## ⚠️ Method 3: Self-Signed Certificate (NOT RECOMMENDED)

Only use for testing/development. Browsers will show security warnings.

```bash
# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/nginx-selfsigned.key \
  -out /etc/ssl/certs/nginx-selfsigned.crt

# Update nginx config
sudo nano /etc/nginx/sites-available/mentorify
```

Add SSL configuration:
```nginx
server {
    listen 443 ssl;
    server_name 13.200.170.243;
    
    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
    
    # ... rest of config
}
```

---

## 🔧 Troubleshooting

### Issue: "Connection is not secure" warning

**Cause**: Certificate not trusted or expired

**Solution**:
```bash
# Check certificate expiry
sudo certbot certificates

# Renew if needed
sudo certbot renew
```

### Issue: "Too many redirects"

**Cause**: Redirect loop between HTTP and HTTPS

**Solution**: Check nginx config for multiple redirects

### Issue: Mixed content warnings

**Cause**: Loading HTTP resources on HTTPS page

**Solution**: Ensure all resources use HTTPS or relative URLs

### Issue: Certificate validation failed

**Cause**: DNS not pointing to correct server

**Solution**:
```bash
# Verify DNS
dig yourdomain.com +short
# Should return your EC2 IP

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

## 🎯 Quick Start Checklist

- [ ] Purchase domain name
- [ ] Add A records pointing to EC2 IP (13.200.170.243)
- [ ] Open port 443 in EC2 Security Group
- [ ] Update nginx `server_name` to your domain
- [ ] Install Certbot: `sudo apt install certbot python3-certbot-nginx`
- [ ] Run Certbot: `sudo certbot --nginx -d yourdomain.com`
- [ ] Test HTTPS: Open https://yourdomain.com
- [ ] Verify auto-renewal: `sudo certbot renew --dry-run`

---

## 📊 After HTTPS Setup

### Update Your Application

1. **Update API URLs** (if needed)
   - Frontend should use relative URLs (`/api/...`)
   - Already configured in your app!

2. **Update Environment Variables**
   - No changes needed for current setup

3. **Update External Services**
   - Update callback URLs (OAuth, payment gateways)
   - Update webhook URLs

### Security Best Practices

```nginx
# Add these headers to nginx config (already in nginx-https.conf)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

### Monitoring

```bash
# Check certificate expiry
sudo certbot certificates

# Check renewal timer
sudo systemctl list-timers certbot

# Test renewal
sudo certbot renew --dry-run
```

---

## 💰 Cost Breakdown

| Option | Cost | Complexity | Renewal |
|--------|------|------------|---------|
| Let's Encrypt | Free | Easy | Automatic |
| ACM + ALB | ~$16/month (ALB) | Medium | Automatic |
| Self-Signed | Free | Easy | Manual |
| Commercial SSL | $50-200/year | Easy | Manual |

**Recommendation**: Use Let's Encrypt for most cases.

---

## 🔗 Useful Commands

```bash
# Check SSL certificate
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# Test SSL configuration
curl -I https://yourdomain.com

# Check certificate expiry
echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates

# Force renewal
sudo certbot renew --force-renewal

# List all certificates
sudo certbot certificates

# Delete certificate
sudo certbot delete --cert-name yourdomain.com
```

---

## 📚 Additional Resources

- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Certbot Documentation](https://certbot.eff.org/docs/)
- [SSL Server Test](https://www.ssllabs.com/ssltest/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)

---

## ⏭️ Next Steps

After setting up HTTPS:

1. ✅ Update any hardcoded HTTP URLs to HTTPS
2. ✅ Enable HSTS (Strict-Transport-Security header)
3. ✅ Set up monitoring for certificate expiry
4. ✅ Configure automatic renewal notifications
5. ✅ Test on multiple browsers and devices

---

**Current Status**: HTTP only (working)  
**After Setup**: HTTPS (secure) ✅

Once you have a domain name, setting up HTTPS takes about 5 minutes with Let's Encrypt!

