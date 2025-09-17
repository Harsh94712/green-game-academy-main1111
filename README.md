# Greenverse - Gamified Environmental Education Platform

🌱 **Learn, Play & Save the Planet!**

Greenverse is an interactive environmental education platform that makes learning about sustainability fun and engaging through gamification, quizzes, challenges, and rewards.

## 🚀 Features

- **Secure Authentication**: User registration, login, and password reset with email verification
- **Gamified Learning**: Interactive quizzes, challenges, badges, and leaderboards
- **Environmental Focus**: Educational content about climate change, conservation, and sustainability
- **Modern UI**: Beautiful, responsive design built with React and Tailwind CSS
- **Real-time Feedback**: Password strength meters, progress tracking, and achievement systems

## 🛠️ Technologies Used

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Authentication**: Custom secure authentication system
- **Email Service**: Simulated email service (ready for production integration)

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional - app works in mock mode without it)

### Quick Start

```bash
# Clone the repository
git clone <YOUR_REPOSITORY_URL>
cd greenverse

# Automatic setup (recommended)
npm run setup

# Start both frontend and backend
npm start
```

### Manual Setup

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Start development servers
npm run dev      # Frontend only
npm run backend  # Backend only
npm start        # Both together
```

### Test the Authentication

```bash
# See what you can test
npm run demo

# Then visit http://localhost:5173
```

## 🔐 Authentication System

The platform includes a comprehensive, production-ready authentication system:

### ✅ Working Features
- **User Registration**: Strong password requirements with real-time validation
- **Secure Login**: Rate limiting and brute force protection
- **Password Reset**: Email-based password reset with secure tokens
- **Session Management**: JWT tokens with automatic expiration
- **Account Security**: Automatic lockout after failed attempts
- **Input Validation**: Comprehensive server-side validation
- **Mock Mode**: Works without database for development

### 🛡️ Security Features
- Rate limiting (5 attempts per 15 minutes)
- Account lockout after 5 failed login attempts
- Password strength validation with real-time feedback
- Input sanitization and XSS protection
- Secure JWT token management
- CSRF protection ready
- Bcrypt password hashing (12 rounds)

## 📧 Email Integration

### Development Mode (Default)
- Simulated email service with console logging
- Password reset links shown in browser console
- No external email service required

### Production Setup
Update `backend/.env` with your email provider:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Greenverse <noreply@greenverse.com>
```

Supported providers:
- Gmail, Outlook, Yahoo
- SendGrid, AWS SES
- Any SMTP service

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with the included `vercel.json` configuration

### Other Platforms

The project can be deployed to any platform that supports static React applications:

- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🎯 What's Working Right Now

### ✅ Fully Functional Authentication
1. **User Registration** - Create accounts with strong password validation
2. **Secure Login** - JWT-based authentication with rate limiting
3. **Password Reset** - Complete forgot password flow with email
4. **Session Management** - Automatic token handling and expiration
5. **Security Features** - Account lockout, input validation, XSS protection

### 📱 User Interface
- Responsive design works on all devices
- Real-time password strength meter
- Toast notifications for user feedback
- Loading states and error handling
- Accessible form controls

### 🔧 Development Features
- **Mock Mode**: Works without MongoDB for instant testing
- **Hot Reload**: Frontend and backend auto-restart on changes
- **Console Logging**: Detailed logs for debugging
- **Email Simulator**: View password reset emails in console
- **Rate Limit Testing**: Try failed logins to see security in action

## 📱 User Experience

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Built with accessibility best practices
- **Performance**: Optimized for fast loading and smooth interactions
- **Security**: Enterprise-grade security features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌍 Mission

Greenverse is committed to making environmental education accessible, engaging, and effective for students worldwide. Through gamification and interactive learning, we're building a generation of environmentally conscious citizens.

---

**Built with ❤️ for the planet** 🌍