# Mentorify Client

React-based frontend application for the Mentorify career guidance platform.

## 🎯 Overview

This is the client-side application built with React that provides the user interface for students, administrators, and other stakeholders to interact with the Mentorify platform.

## 📋 Prerequisites

- Node.js (v14 or higher)
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
REACT_APP_API_URL=http://localhost:5020
```

### Development

Start the development server:

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Production Build

Create an optimized production build:

```bash
npm run build
```

The build files will be in the `build/` directory.

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── NavBar/         # Navigation components
│   ├── Footer/         # Footer component
│   ├── Header/         # Header component
│   ├── Section1/       # Landing sections
│   └── ...             # Modal components
├── Pages/              # Page components
│   ├── Home/           # Home page
│   ├── About/          # About page
│   ├── Login/          # Login page
│   ├── Signup/         # Signup page
│   ├── Dashboard/      # Dashboard pages
│   ├── Services/       # Services page
│   └── ...
├── context/            # React Context providers
│   └── AuthContext.js  # Authentication context
├── Hooks/              # Custom React hooks
│   ├── useAuth.js      # Auth hook
│   └── useCouponAccess.js
├── services/           # API service files
│   └── couponService.js
├── api.js              # Axios configuration
├── App.js              # Main app component
└── index.js            # Entry point
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm test` | Launches the test runner |
| `npm run build` | Builds the app for production |
| `npm run analyze` | Analyzes the bundle size |
| `npm run eject` | Ejects from Create React App (one-way operation) |

## 📦 Key Dependencies

- **React 18.2** - UI library
- **React Router DOM 6.6** - Routing
- **Axios 1.12** - HTTP client
- **Syncfusion EJ2 React** - Advanced UI components
- **Chart.js & React-Chartjs-2** - Charts and graphs
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion
- **AOS** - Animate on scroll library

## 🎨 Features

### User Features
- User authentication (login/signup)
- Career clarification test
- Profile management
- Test results and reports
- Dashboard access based on role
- Responsive design

### Admin Features
- User management
- Coupon management
- Analytics dashboard
- Content management
- Student progress tracking

### Technical Features
- Protected routes
- JWT authentication
- Role-based access control
- Persistent state management
- API interceptors for auth
- PDF report generation
- Data visualization with charts

## 🔌 API Integration

The app uses Axios for API communication. The base configuration is in `src/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5020';
```

API calls automatically include:
- JWT token in Authorization header
- Automatic token refresh handling
- Error handling and redirects

## 🎨 Styling

The project uses CSS modules and component-specific stylesheets:
- Each major component has its own `.css` file
- Responsive design with mobile-first approach
- Syncfusion theme customization

## 🔐 Authentication

Authentication is managed through:
- `AuthContext` - Global auth state
- `useAuth` hook - Access auth methods
- Protected routes with `ProtectedTestRoute` component
- Automatic token storage in localStorage

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🧪 Testing

Run tests with:

```bash
npm test
```

Test files follow the pattern: `*.test.js` or `*.spec.js`

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Hosting Service

The `build` folder can be deployed to:
- Netlify
- Vercel
- AWS S3
- GitHub Pages
- Any static hosting service

### Environment Variables for Production

Make sure to set:
- `REACT_APP_API_URL` - Your production backend URL

## 📊 Bundle Analysis

Analyze bundle size:

```bash
npm run analyze
```

This will show you what's taking up space in your bundle.

## 🔧 Configuration

### Proxy Configuration

The app uses a proxy in development (configured in package.json):

```json
"proxy": "http://localhost:5020"
```

This allows API calls without CORS issues in development.

### Browser Support

Production builds support:
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 🐛 Troubleshooting

### Common Issues

**Issue**: API calls failing
- Check if backend server is running on port 5020
- Verify `REACT_APP_API_URL` in `.env`

**Issue**: Build fails
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf build`

**Issue**: Slow performance
- Run bundle analyzer to identify large dependencies
- Consider code splitting for large pages

## 📝 Learn More

- [Create React App Documentation](https://create-react-app.dev/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Syncfusion React Documentation](https://ej2.syncfusion.com/react/documentation/)

## 🤝 Contributing

Please follow the coding standards and component structure when contributing.

---

**Part of the Mentorify Platform**
