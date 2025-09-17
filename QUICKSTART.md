# 🚀 Greenverse Quick Start Guide

Get your Greenverse environmental education platform up and running in minutes!

## 📋 Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (optional) - [Download here](https://www.mongodb.com/try/download/community)
  - If MongoDB is not installed, the app will run in mock mode with local storage

## ⚡ Quick Setup

### Option 1: Automatic Setup (Recommended)
```bash
# Clone and navigate to the project
cd greenverse

# Run the setup script (installs all dependencies)
npm run setup

# Start the application (both frontend and backend)
npm start
```

### Option 2: Manual Setup
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Start both frontend and backend
npm start
```

## 🌐 Access the Application

Once started, open your browser and go to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🎮 Test the Authentication

### 1. Create an Account
- Click "Sign up" on the login page
- Fill in your details with a strong password
- You'll be automatically logged in after registration

### 2. Test Login/Logout
- Use the credentials you just created
- The system includes rate limiting and security features

### 3. Test Password Reset
- Click "Forgot password?" on the login page
- Enter your email address
- Check the console logs for the reset link (since email is in mock mode)

## 🔧 Development Commands

```bash
# Start frontend only
npm run dev

# Start backend only  
npm run backend

# Build for production
npm run build

# Run linting
npm run lint
```

## 🗄️ Database Modes

### Mock Mode (Default)
- No MongoDB required
- Data stored in browser localStorage
- Perfect for development and testing
- User data persists in browser session

### Full Database Mode
- Requires MongoDB installation
- Full user management and persistence
- Email functionality (configure SMTP settings)
- Production-ready features

## 🔐 Authentication Features

✅ **Secure Registration** - Strong password requirements with real-time validation  
✅ **Rate-Limited Login** - Protection against brute force attacks  
✅ **Password Reset** - Email-based password reset with secure tokens  
✅ **Session Management** - Automatic token expiration and cleanup  
✅ **Account Locking** - Temporary lockout after failed attempts  
✅ **Input Validation** - Comprehensive server-side validation  

## 🎯 What's Working

- ✅ User registration with validation
- ✅ Secure login with rate limiting  
- ✅ Password reset flow (mock email)
- ✅ Protected routes and authentication
- ✅ Responsive UI with Tailwind CSS
- ✅ Real-time password strength meter
- ✅ Toast notifications for user feedback
- ✅ Automatic fallback to mock mode

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# If port 5173 is busy, Vite will automatically use the next available port
# If port 5000 is busy, update the PORT in backend/.env
```

### MongoDB Connection Issues
```bash
# The app automatically falls back to mock mode if MongoDB is unavailable
# Check backend console logs for connection status
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules backend/node_modules
npm run setup
```

## 📧 Email Configuration (Optional)

To enable real email sending, update `backend/.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Greenverse <noreply@greenverse.com>
```

## 🌍 Ready to Save the Planet!

Your Greenverse platform is now ready! Students can:
- 🎮 Take environmental quizzes
- 🏆 Earn badges and points
- 📚 Learn about sustainability
- 🌱 Track their eco-learning progress

Happy learning! 🌍✨