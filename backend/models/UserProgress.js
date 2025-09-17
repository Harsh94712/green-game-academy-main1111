import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  totalPoints: {
    type: Number,
    default: 0,
    min: 0
  },
  level: {
    type: Number,
    default: 1,
    min: 1
  },
  streak: {
    type: Number,
    default: 0,
    min: 0
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  completedChallenges: [{
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    points: {
      type: Number,
      required: true
    }
  }],
  completedQuizzes: [{
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    score: {
      type: Number,
      required: true
    },
    maxScore: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    points: {
      type: Number,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  earnedBadges: [{
    badge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Badge'
    },
    earnedAt: {
      type: Date,
      default: Date.now
    },
    points: {
      type: Number,
      required: true
    }
  }],
  dailyChallenges: [{
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge'
    },
    date: {
      type: Date,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Date
    }
  }],
  statistics: {
    totalChallengesCompleted: {
      type: Number,
      default: 0
    },
    totalQuizzesCompleted: {
      type: Number,
      default: 0
    },
    totalBadgesEarned: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    averageQuizScore: {
      type: Number,
      default: 0
    },
    lastLogin: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Index for better performance
userProgressSchema.index({ user: 1 });
userProgressSchema.index({ totalPoints: -1 });
userProgressSchema.index({ level: -1 });
userProgressSchema.index({ streak: -1 });
userProgressSchema.index({ 'statistics.lastLogin': -1 });

// Method to calculate level from points
userProgressSchema.methods.calculateLevel = function() {
  return Math.floor(this.totalPoints / 1000) + 1;
};

// Method to check if user has completed a challenge today
userProgressSchema.methods.hasCompletedChallengeToday = function(challengeId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return this.completedChallenges.some(completed => 
    completed.challenge.toString() === challengeId.toString() &&
    completed.completedAt >= today
  );
};

// Method to check if user has completed a quiz
userProgressSchema.methods.hasCompletedQuiz = function(quizId) {
  return this.completedQuizzes.some(completed => 
    completed.quiz.toString() === quizId.toString()
  );
};

// Method to check if user has earned a badge
userProgressSchema.methods.hasEarnedBadge = function(badgeId) {
  return this.earnedBadges.some(earned => 
    earned.badge.toString() === badgeId.toString()
  );
};

// Method to update streak
userProgressSchema.methods.updateStreak = function() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const lastActivity = new Date(this.lastActivity);
  lastActivity.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  
  if (lastActivity.getTime() === today.getTime()) {
    // Activity today, maintain streak
    return this.streak;
  } else if (lastActivity.getTime() === yesterday.getTime()) {
    // Activity yesterday, increment streak
    this.streak += 1;
  } else {
    // No activity yesterday, reset streak
    this.streak = 1;
  }
  
  this.lastActivity = new Date();
  return this.streak;
};

export default mongoose.model('UserProgress', userProgressSchema);

