# Mentorify - Career Guidance Platform

A comprehensive career guidance and mentorship platform built with the MERN stack (MongoDB, Express, React, Node.js). This application provides career counseling services, psychometric tests, and administrative dashboards for multiple user roles.

## 🌟 Features

### For Students/Individuals
- Career clarification and guidance
- Psychometric assessments and tests
- Test result analysis and reports
- Profile management
- Access to career resources and blog content

### For Administrators
- Multiple admin levels (Super Admin, Admin, School, Franchise)
- User management and monitoring
- Coupon code management for test access
- Dashboard analytics
- Content management
- Student progress tracking

### Additional Features
- Secure authentication with JWT
- Role-based access control
- Email notifications
- Responsive design for all devices
- PDF report generation
- Protected test routes with coupon validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (v4.0 or higher)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Mentorify_Merged_and_coupon
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd unified-server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file based on `env.example`:

```bash
cp env.example .env
```

Configure your environment variables in `.env`:

```env
PORT=5020
NODE_ENV=development
DATABASE=mongodb://127.0.0.1:27017/mentorify
SECRET_KEY=your_secure_secret_key_here
SUPER_ADMIN_EMAIL=admin@mentorify.com
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

Start the development server:

```bash
npm run dev
```

The backend server will run on `http://localhost:5020`

### 3. Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
cd unified-client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file based on `env.example`:

```bash
cp env.example .env
```

Configure your environment variables in `.env`:

```env
REACT_APP_API_URL=http://localhost:5020
```

Start the development server:

```bash
npm start
```

The frontend application will run on `http://localhost:3000`

## 📁 Project Structure

```
Mentorify_Merged_and_coupon/
├── unified-client/          # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── Pages/           # Page components
│   │   ├── context/         # React context providers
│   │   ├── Hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   └── App.js           # Main app component
│   └── package.json
│
└── unified-server/          # Express backend application
    ├── server/
    │   ├── db/              # Database connection
    │   ├── model/           # Mongoose models
    │   ├── router/          # API routes
    │   ├── services/        # Business logic & utilities
    │   └── app.js           # Express app setup
    └── package.json
```

## 🔑 Environment Variables

### Backend (`unified-server/env.example`)

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5020 |
| NODE_ENV | Environment mode | development/production |
| DATABASE | MongoDB connection string | mongodb://127.0.0.1:27017/mentorify |
| SECRET_KEY | JWT secret key | random_secure_string |
| SUPER_ADMIN_EMAIL | Super admin email | admin@mentorify.com |
| EMAIL_USERNAME | SMTP email username | your_email@gmail.com |
| EMAIL_PASSWORD | SMTP email password | your_app_password |

### Frontend (`unified-client/env.example`)

| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5020 |

## 🛠️ Available Scripts

### Backend

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

### Frontend

```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
npm run analyze  # Analyze bundle size
```

## 📦 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **Syncfusion Components** - Advanced UI components
- **Framer Motion** - Animations
- **jsPDF & html2canvas** - PDF generation

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Express Validator** - Input validation

## 🔐 Security

- Passwords are hashed using bcryptjs
- JWT tokens for secure authentication
- Protected routes with middleware
- Input validation on all endpoints
- CORS enabled with proper configuration
- Environment variables for sensitive data

## 📝 API Documentation

The API runs on `http://localhost:5020` and includes the following route groups:

- `/api/` - User authentication and registration
- `/api/admin` - Admin operations
- `/api/franchise` - Franchise management
- `/api/school` - School dashboard operations
- `/api/superadmin` - Super admin operations
- `/api/profile` - User profile management
- `/api/coupons` - Coupon code management
- `/api/forgot-password` - Password recovery

## 🚀 Deployment

### Backend Deployment

1. Set `NODE_ENV=production` in your environment
2. Update the `DATABASE` connection string for production
3. Generate a strong `SECRET_KEY`
4. Configure email service for production
5. Build and deploy to your hosting service

### Frontend Deployment

1. Update `REACT_APP_API_URL` to your production backend URL
2. Run `npm run build` to create production build
3. Deploy the `build` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 User Roles

1. **Student/Individual** - Access tests and view results
2. **School Admin** - Manage school students and tests
3. **Franchise Admin** - Manage franchise operations
4. **Admin** - Platform administration
5. **Super Admin** - Full system control

## 📧 Support

For support and queries, please contact the development team.

## 🔄 Version History

- **1.0.0** - Initial release with core features

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)

---

**Built with ❤️ for Mentorify**

