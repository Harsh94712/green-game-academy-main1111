# Green Game Academy - Backend API

A comprehensive backend API for the Green Game Academy eco-learning platform, built with Node.js, Express, and MongoDB.

## Features

### 🎮 Game System
- **Daily Challenges**: Dynamic challenge generation with categories (energy, water, waste, transport, coding)
- **Quiz System**: Multi-category quizzes with scoring and progress tracking
- **Badge System**: Achievement badges with automatic awarding based on user actions
- **Progress Tracking**: Comprehensive user progress with streaks, levels, and statistics
- **Leaderboard**: Real-time rankings with weekly and monthly filters

### 🔐 Authentication & Security
- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting and security headers
- Account lockout protection
- Email verification system

### 📊 Data Management
- MongoDB with Mongoose ODM
- Automatic data seeding
- Optimized database indexes
- Data validation and sanitization

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Game System
- `GET /api/game/challenges` - Get daily challenges
- `POST /api/game/challenges/:id/complete` - Complete a challenge
- `GET /api/game/quizzes` - Get available quizzes
- `GET /api/game/quizzes/:id` - Get quiz by ID
- `POST /api/game/quizzes/:id/submit` - Submit quiz answers
- `GET /api/game/progress` - Get user progress
- `GET /api/game/leaderboard` - Get leaderboard

## Database Models

### User
- Basic user information and authentication
- Game progress integration
- Badge and achievement tracking

### UserProgress
- Comprehensive progress tracking
- Challenge and quiz completion history
- Streak and level management
- Statistics and analytics

### Challenge
- Daily challenges with categories
- Point values and difficulty levels
- Active/inactive status management

### Quiz
- Multi-category quiz system
- Question bank with explanations
- Time limits and scoring

### Badge
- Achievement system
- Automatic badge awarding
- Category-based organization

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd green-game-academy/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/green-game-academy
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=http://localhost:5173
   
   # Email Configuration (Optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000` and automatically seed the database with initial data.

### Development

```bash
# Start in development mode with hot reload
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

## Data Seeding

The application automatically seeds the database with:
- 15+ daily challenges across 5 categories
- 3 comprehensive quizzes with 17 questions
- 6 achievement badges
- Sample user data

## API Usage Examples

### Complete a Challenge
```javascript
const response = await fetch('/api/game/challenges/lights-off/complete', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const result = await response.json();
// Returns: { success: true, points: 10, totalPoints: 150, level: 2, newBadges: [] }
```

### Submit Quiz Answers
```javascript
const response = await fetch('/api/game/quizzes/quiz-id/submit', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    answers: [1, 2, 0, 3, 1] // Array of selected answer indices
  })
});

const result = await response.json();
// Returns: { success: true, score: 4, maxScore: 5, percentage: 80, points: 80, ... }
```

### Get Leaderboard
```javascript
const response = await fetch('/api/game/leaderboard?period=weekly', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const result = await response.json();
// Returns: { success: true, leaderboard: [...] }
```

## Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **Helmet**: Security headers for protection
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Comprehensive request validation
- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Security**: Secure token-based authentication

## Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexes
- **Aggregation Pipelines**: Efficient data processing
- **Connection Pooling**: MongoDB connection optimization
- **Response Caching**: Strategic caching for better performance

## Error Handling

- Comprehensive error handling with meaningful messages
- Proper HTTP status codes
- Detailed logging for debugging
- Graceful fallbacks for offline mode

## Monitoring & Logging

- Request/response logging
- Error tracking and reporting
- Performance monitoring
- Health check endpoints

## Deployment

The backend is designed to be deployed on various platforms:
- **Vercel**: Serverless deployment
- **Heroku**: Container-based deployment
- **AWS/DigitalOcean**: VPS deployment
- **Docker**: Containerized deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

