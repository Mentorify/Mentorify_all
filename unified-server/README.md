# Mentorify Server

Express.js backend API for the Mentorify career guidance platform.

## 🎯 Overview

This is the backend server application built with Express.js and MongoDB that provides RESTful APIs for the Mentorify platform, handling authentication, user management, coupon systems, and more.

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```bash
cp env.example .env
```

Configure the environment variables:

```env
PORT=5020
NODE_ENV=development
DATABASE=mongodb://127.0.0.1:27017/mentorify
SECRET_KEY=your_secure_secret_key_here
SUPER_ADMIN_EMAIL=admin@mentorify.com
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Running the Server

Development mode (with hot reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will run on `http://localhost:5020`

## 📁 Project Structure

```
server/
├── db/                    # Database configuration
│   └── conn.js           # MongoDB connection
├── model/                # Mongoose models
│   ├── userSchema.js     # User model
│   └── couponSchema.js   # Coupon model
├── router/               # Route handlers
│   ├── auth.js           # User authentication
│   ├── adminAuth.js      # Admin routes
│   ├── franchiseAuth.js  # Franchise routes
│   ├── schoolAuth.js     # School routes
│   ├── superAdminAuth.js # Super admin routes
│   ├── profile.js        # User profile routes
│   ├── couponRoutes.js   # Coupon management
│   └── forgotPassword.js # Password recovery
├── services/             # Business logic
│   ├── middleware/       # Custom middleware
│   └── sendMail/         # Email service
├── utils/                # Utility functions
│   └── constants.js      # App constants
└── app.js                # Express app setup
```

## 🛣️ API Routes

### Base URL: `http://localhost:5020`

### Authentication Routes (`/api/`)
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/logout` - User logout
- `GET /api/verify` - Verify JWT token

### Admin Routes (`/api/admin`)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/user/:id` - Update user
- `DELETE /api/admin/user/:id` - Delete user

### Franchise Routes (`/api/franchise`)
- `POST /api/franchise/register` - Register franchise
- `GET /api/franchise/students` - Get franchise students
- `POST /api/franchise/add-student` - Add student

### School Routes (`/api/school`)
- `POST /api/school/register` - Register school
- `GET /api/school/students` - Get school students
- `POST /api/school/add-student` - Add student
- `GET /api/school/analytics` - Get analytics

### Super Admin Routes (`/api/superadmin`)
- `POST /api/superadmin/login` - Super admin login
- `GET /api/superadmin/all-admins` - Get all admins
- `POST /api/superadmin/create-admin` - Create new admin
- `DELETE /api/superadmin/admin/:id` - Delete admin

### Profile Routes (`/api/profile`)
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `PUT /api/profile/change-password` - Change password

### Coupon Routes (`/api/coupons`)
- `POST /api/coupons/create` - Create coupon
- `GET /api/coupons` - Get all coupons
- `POST /api/coupons/validate` - Validate coupon
- `PUT /api/coupons/:id` - Update coupon
- `DELETE /api/coupons/:id` - Delete coupon

### Password Recovery (`/api/forgot-password`)
- `POST /api/forgot-password/request` - Request password reset
- `POST /api/forgot-password/reset` - Reset password

## 🗄️ Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  mobile: String,
  password: String (hashed),
  role: String (user/admin/school/franchise/superadmin),
  gender: String,
  state: String,
  city: String,
  testResults: Array,
  createdAt: Date,
  updatedAt: Date
}
```

### Coupon Schema
```javascript
{
  code: String (unique),
  testType: String,
  maxUses: Number,
  currentUses: Number,
  expiryDate: Date,
  createdBy: ObjectId (ref: User),
  isActive: Boolean,
  createdAt: Date
}
```

## 🔐 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Token-based authentication
- **Input Validation**: express-validator for request validation
- **CORS**: Configured for cross-origin requests
- **Cookie Parser**: Secure cookie handling
- **Environment Variables**: Sensitive data in .env

## 🛠️ Middleware

### Authentication Middleware
- `authenticate` - Verify JWT token
- `requireAuth` - Protect routes requiring authentication
- `requireAdmin` - Admin-only access
- `requireSuperAdmin` - Super admin-only access

### Validation Middleware
- Input validation using express-validator
- Custom validators for email, phone, etc.

### Error Handling
- Centralized error handling
- HTTP error responses
- 404 handler for undefined routes

## 📧 Email Service

The server uses Nodemailer for sending emails:

- Password reset emails
- Welcome emails
- Notification emails

Configure email settings in `.env`:
```env
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

For Gmail, use App Passwords for enhanced security.

## 🔧 Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| PORT | No | Server port | 8000 |
| NODE_ENV | Yes | Environment mode | development |
| DATABASE | Yes | MongoDB connection string | - |
| SECRET_KEY | Yes | JWT secret key | - |
| SUPER_ADMIN_EMAIL | Yes | Super admin email | - |
| EMAIL_USERNAME | Yes | SMTP email username | - |
| EMAIL_PASSWORD | Yes | SMTP email password | - |

## 📦 Dependencies

### Production Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **nodemailer** - Email service
- **express-validator** - Input validation
- **cookie-parser** - Cookie parsing
- **morgan** - HTTP request logger
- **multer** - File upload handling

### Development Dependencies
- **nodemon** - Auto-restart on file changes

## 🚀 Deployment

### Prerequisites for Production
1. MongoDB database (local or cloud like MongoDB Atlas)
2. Node.js hosting service (Heroku, AWS, DigitalOcean, etc.)
3. Email service credentials

### Deployment Steps

1. **Set Environment Variables**
   ```bash
   NODE_ENV=production
   DATABASE=your_production_mongodb_url
   SECRET_KEY=strong_random_string
   ```

2. **Build and Deploy**
   ```bash
   npm install --production
   npm start
   ```

3. **Database Setup**
   - Ensure MongoDB is accessible
   - Create database indexes
   - Set up initial super admin user

### MongoDB Atlas Setup (Cloud Database)

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `DATABASE` in `.env`:
   ```env
   DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/mentorify?retryWrites=true&w=majority
   ```

## 🧪 Testing

Run tests (when implemented):
```bash
npm test
```

## 📊 Logging

The server uses Morgan for HTTP request logging in development mode:
```javascript
app.use(morgan('dev'))
```

## 🔍 Debugging

Enable detailed error messages in development:
```env
NODE_ENV=development
```

View logs in console for:
- Database connection status
- API requests
- Errors and warnings

## ⚡ Performance Tips

1. **Database Indexing**: Add indexes to frequently queried fields
2. **Caching**: Implement Redis for session/data caching
3. **Compression**: Use compression middleware for responses
4. **Rate Limiting**: Add rate limiting to prevent abuse

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Check if MongoDB is running
- Verify DATABASE connection string
- Check network access (for Atlas)

**JWT Errors**
- Ensure SECRET_KEY is set
- Check token expiration

**Email Not Sending**
- Verify EMAIL_USERNAME and EMAIL_PASSWORD
- For Gmail, use App Password, not regular password
- Check firewall/network settings

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "status": 400
}
```

## 🤝 Contributing

1. Follow RESTful API conventions
2. Add proper error handling
3. Validate all inputs
4. Document new routes
5. Write tests for new features

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Documentation](https://jwt.io/)
- [Nodemailer Documentation](https://nodemailer.com/)

---

**Part of the Mentorify Platform**
