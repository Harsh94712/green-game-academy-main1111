import Challenge from '../models/Challenge.js';
import Quiz from '../models/Quiz.js';
import Badge from '../models/Badge.js';
import UserProgress from '../models/UserProgress.js';
import User from '../models/User.js';

// @route   GET /api/game/challenges
// @desc    Get daily challenges
// @access  Private
export const getDailyChallenges = async (req, res) => {
  try {
    const { category } = req.query;
    
    // Build query
    const query = { isActive: true };
    if (category) {
      query.category = category;
    }
    
    // Get random challenges (limit to 5-7 per day)
    const challenges = await Challenge.aggregate([
      { $match: query },
      { $sample: { size: 7 } }
    ]);
    
    res.json({
      success: true,
      challenges
    });
  } catch (error) {
    console.error('Get challenges error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching challenges'
    });
  }
};

// @route   POST /api/game/challenges/:id/complete
// @desc    Complete a challenge
// @access  Private
export const completeChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    // Find the challenge
    const challenge = await Challenge.findOne({ id, isActive: true });
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    // Get or create user progress
    let userProgress = await UserProgress.findOne({ user: userId });
    if (!userProgress) {
      userProgress = new UserProgress({ user: userId });
    }
    
    // Check if already completed today
    if (userProgress.hasCompletedChallengeToday(challenge._id)) {
      return res.status(400).json({
        success: false,
        message: 'Challenge already completed today'
      });
    }
    
    // Add challenge completion
    userProgress.completedChallenges.push({
      challenge: challenge._id,
      points: challenge.points
    });
    
    // Update points and level
    userProgress.totalPoints += challenge.points;
    userProgress.level = userProgress.calculateLevel();
    
    // Update streak
    userProgress.updateStreak();
    
    // Update statistics
    userProgress.statistics.totalChallengesCompleted += 1;
    userProgress.statistics.lastLogin = new Date();
    
    await userProgress.save();
    
    // Update user model
    await User.findByIdAndUpdate(userId, {
      totalPoints: userProgress.totalPoints,
      level: userProgress.level
    });
    
    // Check for new badges
    const newBadges = await checkAndAwardBadges(userId, 'challenge-complete');
    
    res.json({
      success: true,
      message: 'Challenge completed successfully',
      points: challenge.points,
      totalPoints: userProgress.totalPoints,
      level: userProgress.level,
      newBadges
    });
  } catch (error) {
    console.error('Complete challenge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while completing challenge'
    });
  }
};

// @route   GET /api/game/quizzes
// @desc    Get available quizzes
// @access  Private
export const getQuizzes = async (req, res) => {
  try {
    const { category } = req.query;
    
    // Build query
    const query = { isActive: true };
    if (category) {
      query.category = category;
    }
    
    const quizzes = await Quiz.find(query).select('-questions.correct');
    
    res.json({
      success: true,
      quizzes
    });
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching quizzes'
    });
  }
};

// @route   GET /api/game/quizzes/:id
// @desc    Get quiz by ID
// @access  Private
export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const quiz = await Quiz.findById(id).select('-questions.correct');
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    res.json({
      success: true,
      quiz
    });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching quiz'
    });
  }
};

// @route   POST /api/game/quizzes/:id/submit
// @desc    Submit quiz answers
// @access  Private
export const submitQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body; // Array of answer indices
    const userId = req.user._id;
    
    // Find the quiz
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Get or create user progress
    let userProgress = await UserProgress.findOne({ user: userId });
    if (!userProgress) {
      userProgress = new UserProgress({ user: userId });
    }
    
    // Check if already completed
    if (userProgress.hasCompletedQuiz(quiz._id)) {
      return res.status(400).json({
        success: false,
        message: 'Quiz already completed'
      });
    }
    
    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correctAnswers++;
      }
    });
    
    const percentage = Math.round((correctAnswers / quiz.questions.length) * 100);
    const basePoints = correctAnswers * 20; // 20 points per correct answer
    const bonusPoints = percentage >= 90 ? 50 : percentage >= 70 ? 25 : 0;
    const totalPoints = basePoints + bonusPoints;
    
    // Add quiz completion
    userProgress.completedQuizzes.push({
      quiz: quiz._id,
      score: correctAnswers,
      maxScore: quiz.questions.length,
      percentage,
      points: totalPoints
    });
    
    // Update points and level
    userProgress.totalPoints += totalPoints;
    userProgress.level = userProgress.calculateLevel();
    
    // Update streak
    userProgress.updateStreak();
    
    // Update statistics
    userProgress.statistics.totalQuizzesCompleted += 1;
    userProgress.statistics.averageQuizScore = 
      (userProgress.statistics.averageQuizScore * (userProgress.statistics.totalQuizzesCompleted - 1) + percentage) / 
      userProgress.statistics.totalQuizzesCompleted;
    userProgress.statistics.lastLogin = new Date();
    
    await userProgress.save();
    
    // Update user model
    await User.findByIdAndUpdate(userId, {
      totalPoints: userProgress.totalPoints,
      level: userProgress.level
    });
    
    // Check for new badges
    const newBadges = await checkAndAwardBadges(userId, 'quiz-complete', { percentage, score: correctAnswers });
    
    res.json({
      success: true,
      message: 'Quiz submitted successfully',
      score: correctAnswers,
      maxScore: quiz.questions.length,
      percentage,
      points: totalPoints,
      totalPoints: userProgress.totalPoints,
      level: userProgress.level,
      newBadges
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting quiz'
    });
  }
};

// @route   GET /api/game/progress
// @desc    Get user progress
// @access  Private
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    
    let userProgress = await UserProgress.findOne({ user: userId })
      .populate('completedChallenges.challenge')
      .populate('completedQuizzes.quiz')
      .populate('earnedBadges.badge');
    
    if (!userProgress) {
      // Create new progress if doesn't exist
      userProgress = new UserProgress({ user: userId });
      await userProgress.save();
    }
    
    res.json({
      success: true,
      progress: userProgress
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching progress'
    });
  }
};

// @route   GET /api/game/leaderboard
// @desc    Get leaderboard
// @access  Private
export const getLeaderboard = async (req, res) => {
  try {
    const { period = 'weekly' } = req.query;
    
    let dateFilter = {};
    if (period === 'weekly') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      dateFilter = { 'statistics.lastLogin': { $gte: oneWeekAgo } };
    } else if (period === 'monthly') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      dateFilter = { 'statistics.lastLogin': { $gte: oneMonthAgo } };
    }
    
    // Get leaderboard with proper aggregation for better performance
    const leaderboard = await UserProgress.aggregate([
      { $match: dateFilter },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      { $unwind: '$userInfo' },
      {
        $project: {
          user: {
            name: '$userInfo.name',
            email: '$userInfo.email',
            avatar: '$userInfo.avatar'
          },
          totalPoints: 1,
          level: 1,
          streak: 1,
          lastActivity: '$statistics.lastLogin',
          badgesCount: { $size: '$earnedBadges' },
          challengesCompleted: '$statistics.totalChallengesCompleted',
          quizzesCompleted: '$statistics.totalQuizzesCompleted'
        }
      },
      { $sort: { totalPoints: -1, lastActivity: -1 } },
      { $limit: 50 }
    ]);
    
    res.json({
      success: true,
      leaderboard: leaderboard.map((entry, index) => ({
        rank: index + 1,
        name: entry.user.name,
        email: entry.user.email,
        avatar: entry.user.avatar || '🌱',
        points: entry.totalPoints,
        level: entry.level,
        streak: entry.streak,
        badges: entry.badgesCount,
        challengesCompleted: entry.challengesCompleted,
        quizzesCompleted: entry.quizzesCompleted,
        lastActivity: entry.lastActivity
      }))
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leaderboard'
    });
  }
};

// @route   GET /api/game/recent-quizzes
// @desc    Get recent quiz results for user
// @access  Private
export const getRecentQuizzes = async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit = 5 } = req.query;
    
    const userProgress = await UserProgress.findOne({ user: userId })
      .populate({
        path: 'completedQuizzes.quiz',
        select: 'title description category totalPoints timeLimit'
      })
      .select('completedQuizzes');
    
    if (!userProgress) {
      return res.json({
        success: true,
        recentQuizzes: []
      });
    }
    
    // Sort by completion date and limit results
    const recentQuizzes = userProgress.completedQuizzes
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .slice(0, parseInt(limit))
      .map(quiz => ({
        id: quiz.quiz._id,
        title: quiz.quiz.title,
        description: quiz.quiz.description,
        category: quiz.quiz.category,
        score: quiz.score,
        maxScore: quiz.maxScore,
        percentage: quiz.percentage,
        points: quiz.points,
        completedAt: quiz.completedAt,
        completed: true
      }));
    
    res.json({
      success: true,
      recentQuizzes
    });
  } catch (error) {
    console.error('Get recent quizzes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching recent quizzes'
    });
  }
};

// Helper function to check and award badges
const checkAndAwardBadges = async (userId, action, data = {}) => {
  try {
    const userProgress = await UserProgress.findOne({ user: userId })
      .populate('earnedBadges.badge');
    
    const badges = await Badge.find({ isActive: true });
    const newBadges = [];
    
    for (const badge of badges) {
      // Skip if already earned
      if (userProgress.hasEarnedBadge(badge._id)) {
        continue;
      }
      
      let shouldAward = false;
      
      switch (badge.id) {
        case 'first-quiz':
          shouldAward = action === 'quiz-complete';
          break;
        case 'quiz-master':
          shouldAward = action === 'quiz-complete' && data.percentage >= 90;
          break;
        case 'eco-warrior':
          shouldAward = userProgress.statistics.totalChallengesCompleted >= 10;
          break;
        case 'streak-champion':
          shouldAward = userProgress.streak >= 30;
          break;
        case 'level-master':
          shouldAward = userProgress.level >= 10;
          break;
        case 'eco-coder':
          shouldAward = userProgress.totalPoints >= 200;
          break;
      }
      
      if (shouldAward) {
        userProgress.earnedBadges.push({
          badge: badge._id,
          points: badge.points
        });
        
        userProgress.totalPoints += badge.points;
        userProgress.level = userProgress.calculateLevel();
        userProgress.statistics.totalBadgesEarned += 1;
        
        newBadges.push({
          id: badge.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          points: badge.points
        });
      }
    }
    
    if (newBadges.length > 0) {
      await userProgress.save();
    }
    
    return newBadges;
  } catch (error) {
    console.error('Check badges error:', error);
    return [];
  }
};

