// Game logic for points, levels, and achievements

export interface UserProgress {
  totalPoints: number;
  level: number;
  badges: Badge[];
  streak: number;
  lastActivity: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  earned: boolean;
  earnedAt?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  category: 'energy' | 'water' | 'waste' | 'transport' | 'coding';
}

// Calculate level from total points
export const calculateLevel = (points: number): number => {
  return Math.floor(points / 1000) + 1;
};

// Calculate points needed for next level
export const pointsToNextLevel = (currentPoints: number): number => {
  const currentLevel = calculateLevel(currentPoints);
  const nextLevelPoints = currentLevel * 1000;
  return nextLevelPoints - currentPoints;
};

// Award points and check for level up
export const awardPoints = (currentPoints: number, newPoints: number) => {
  const oldLevel = calculateLevel(currentPoints);
  const totalPoints = currentPoints + newPoints;
  const newLevel = calculateLevel(totalPoints);
  
  return {
    totalPoints,
    newLevel,
    leveledUp: newLevel > oldLevel,
    pointsAwarded: newPoints
  };
};

// Default badges system
export const getAvailableBadges = (): Badge[] => [
  {
    id: 'first-quiz',
    name: 'Quiz Starter',
    description: 'Complete your first quiz',
    icon: '🎯',
    points: 50,
    earned: false
  },
  {
    id: 'eco-warrior',
    name: 'Eco Warrior',
    description: 'Complete 10 daily challenges',
    icon: '🌱',
    points: 100,
    earned: false
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Score 90%+ on 5 quizzes',
    icon: '🧠',
    points: 200,
    earned: false
  },
  {
    id: 'streak-champion',
    name: 'Streak Champion',
    description: 'Maintain 30-day activity streak',
    icon: '🔥',
    points: 300,
    earned: false
  },
  {
    id: 'level-master',
    name: 'Level Master',
    description: 'Reach level 10',
    icon: '⭐',
    points: 500,
    earned: false
  },
  {
    id: 'eco-coder',
    name: 'Eco Coder',
    description: 'Complete 5 coding challenges',
    icon: '💻',
    points: 150,
    earned: false
  }
];

// Check if user earned new badges
export const checkBadgeEarned = (
  userProgress: UserProgress,
  action: 'quiz-complete' | 'challenge-complete' | 'level-up',
  data?: any
): Badge[] => {
  const newBadges: Badge[] = [];
  const availableBadges = getAvailableBadges();

  availableBadges.forEach(badge => {
    if (userProgress.badges.some(b => b.id === badge.id)) return;

    let earned = false;

    switch (badge.id) {
      case 'first-quiz':
        earned = action === 'quiz-complete';
        break;
      case 'eco-warrior':
        // Mock: assume user completed 10 challenges if they have 500+ points
        earned = userProgress.totalPoints >= 500;
        break;
      case 'quiz-master':
        // Mock: assume quiz mastery at 1000+ points
        earned = userProgress.totalPoints >= 1000;
        break;
      case 'streak-champion':
        earned = userProgress.streak >= 30;
        break;
      case 'level-master':
        earned = userProgress.level >= 10;
        break;
      case 'eco-coder':
        // Mock: assume eco coder badge at 200+ points from coding
        earned = userProgress.totalPoints >= 200;
        break;
    }

    if (earned) {
      newBadges.push({
        ...badge,
        earned: true,
        earnedAt: new Date().toISOString()
      });
    }
  });

  return newBadges;
};

// Generate daily challenges
export const getDailyChallenges = (): Challenge[] => [
  {
    id: 'lights-off',
    title: 'Turn off lights when leaving room',
    description: 'Save energy by switching off lights in empty rooms',
    points: 10,
    completed: Math.random() > 0.5,
    category: 'energy'
  },
  {
    id: 'reusable-bottle',
    title: 'Use reusable water bottle',
    description: 'Avoid single-use plastic bottles today',
    points: 15,
    completed: Math.random() > 0.5,
    category: 'waste'
  },
  {
    id: 'take-stairs',
    title: 'Take stairs instead of elevator',
    description: 'Get exercise while saving energy',
    points: 5,
    completed: Math.random() > 0.5,
    category: 'energy'
  },
  {
    id: 'short-shower',
    title: 'Take a 5-minute shower',
    description: 'Conserve water with shorter showers',
    points: 20,
    completed: Math.random() > 0.5,
    category: 'water'
  },
  {
    id: 'walk-bike',
    title: 'Walk or bike for short trips',
    description: 'Choose eco-friendly transportation',
    points: 25,
    completed: Math.random() > 0.5,
    category: 'transport'
  },
  {
    id: 'code-eco-algorithm',
    title: 'Code an eco-friendly algorithm',
    description: 'Write efficient code that reduces computational waste',
    points: 50,
    completed: false,
    category: 'coding'
  },
  {
    id: 'optimize-energy-usage',
    title: 'Optimize code for energy efficiency',
    description: 'Refactor code to use less CPU and memory',
    points: 75,
    completed: false,
    category: 'coding'
  }
];

// Save user progress to localStorage
export const saveUserProgress = (progress: UserProgress): void => {
  localStorage.setItem('userProgress', JSON.stringify(progress));
};

// Load user progress from localStorage
export const loadUserProgress = (): UserProgress | null => {
  try {
    const stored = localStorage.getItem('userProgress');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// Calculate streak based on last activity
export const calculateStreak = (lastActivity: string): number => {
  const lastActivityDate = new Date(lastActivity);
  const today = new Date();
  const diffTime = today.getTime() - lastActivityDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // If last activity was today, maintain current streak
  if (diffDays === 0) {
    return 1; // Will be updated by the context
  }
  // If last activity was yesterday, increment streak
  else if (diffDays === 1) {
    return 1; // Will be incremented by the context
  }
  // If more than 1 day gap, reset streak
  else {
    return 1;
  }
};

// Initialize default user progress
export const initializeUserProgress = (): UserProgress => {
  return {
    totalPoints: 0,
    level: 1,
    badges: [],
    streak: 1,
    lastActivity: new Date().toISOString()
  };
};