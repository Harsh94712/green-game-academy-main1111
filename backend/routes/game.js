import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getDailyChallenges,
  completeChallenge,
  getQuizzes,
  getQuizById,
  submitQuiz,
  getUserProgress,
  getLeaderboard,
  getRecentQuizzes
} from '../controllers/gameController.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Challenge routes
router.get('/challenges', getDailyChallenges);
router.post('/challenges/:id/complete', completeChallenge);

// Quiz routes
router.get('/quizzes', getQuizzes);
router.get('/quizzes/:id', getQuizById);
router.post('/quizzes/:id/submit', submitQuiz);

// Progress routes
router.get('/progress', getUserProgress);

// Leaderboard routes
router.get('/leaderboard', getLeaderboard);

// Recent quizzes route
router.get('/recent-quizzes', getRecentQuizzes);

export default router;

