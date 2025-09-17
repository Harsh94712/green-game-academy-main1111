# Greenverse Setup Guide

This guide will help you set up both the frontend and backend for Greenverse.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Email service (Gmail, SendGrid, etc.)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env file with your configuration
# Required: MONGODB_URI, JWT_SECRET, EMAIL_*
```

### 2. Frontend Setup

```bash
# Navigate to root directory
cd ..

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env file
# VITE_API_URL=http://localhost:5000/api
```

### 3. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

### 4. Email Service Setup

#### Option A: Gmail (Free)
1. Enable 2-factor authentication on Gmail
2. Generate App Password
3. Update backend `.env`:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Greenverse <noreply@greenverse.com>
```

#### Option B: SendGrid (Production)
1. Create account at [SendGrid](https://sendgrid.com)
2. Get API key
3. Update backend `.env`:
```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=Greenverse <noreply@greenverse.com>
```

### 5. Run the Application

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

Visit: http://localhost:5173

## 🔧 Configuration

### Backend Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/greenverse

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Greenverse <noreply@greenverse.com>

# Frontend
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing the Setup

### 1. Test Backend
```bash
curl http://localhost:5000/api/health
```

### 2. Test Registration
1. Go to http://localhost:5173/signup
2. Create a new account
3. Check email for welcome message

### 3. Test Password Reset
1. Go to http://localhost:5173/forgot-password
2. Enter your email
3. Check email for reset link
4. Click link and reset password

## 🚀 Production Deployment

### Backend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy backend:
```bash
cd backend
vercel
```

3. Set environment variables in Vercel dashboard

### Frontend Deployment (Vercel)

1. Deploy frontend:
```bash
vercel
```

2. Update `VITE_API_URL` to your backend URL

### Database (MongoDB Atlas)

1. Create production cluster
2. Update `MONGODB_URI` in production environment

## 🔒 Security Checklist

- [ ] Change default JWT secret
- [ ] Use HTTPS in production
- [ ] Set up proper CORS
- [ ] Configure rate limiting
- [ ] Use environment variables
- [ ] Enable MongoDB authentication
- [ ] Set up email service with proper credentials

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string
   - Check network access (for Atlas)

2. **Email Not Sending**
   - Verify email credentials
   - Check spam folder
   - Test with different email service

3. **CORS Errors**
   - Update `FRONTEND_URL` in backend `.env`
   - Check frontend `VITE_API_URL`

4. **JWT Errors**
   - Verify `JWT_SECRET` is set
   - Check token expiration

### Debug Mode

Enable debug logging:
```bash
NODE_ENV=development npm run dev
```

## 📞 Support

If you encounter issues:
1. Check the console logs
2. Verify environment variables
3. Test API endpoints with curl/Postman
4. Check MongoDB connection
5. Verify email service configuration

---

**Happy coding! 🌱**

