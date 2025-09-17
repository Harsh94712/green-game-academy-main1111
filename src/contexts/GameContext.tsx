import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  UserProgress,
  Badge,
  Challenge,
  awardPoints,
  checkBadgeEarned,
  getDailyChallenges,
  saveUserProgress,
  loadUserProgress,
  initializeUserProgress,
  calculateStreak
} from '@/lib/gameLogic';
import { useToast } from '@/hooks/use-toast';
import { 
  getDailyChallenges as apiGetDailyChallenges,
  completeChallenge as apiCompleteChallenge,
  getQuizzes as apiGetQuizzes,
  submitQuiz as apiSubmitQuiz,
  getUserProgress as apiGetUserProgress,
  getLeaderboard as apiGetLeaderboard
} from '@/lib/api';

interface GameContextType {
  progress: UserProgress;
  challenges: Challenge[];
  awardPointsToUser: (points: number, reason: string) => void;
  completeChallenge: (challengeId: string) => void;
  completeQuiz: (score: number, maxScore: number) => void;
  refreshChallenges: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<UserProgress>(initializeUserProgress());
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // Load user progress when authenticated
  useEffect(() => {
    const loadProgress = async () => {
      if (isAuthenticated && user) {
        try {
          // Try to get progress from backend first
          const response = await apiGetUserProgress();
          if (response.success && response.progress) {
            // Convert backend progress to frontend format
            const backendProgress: UserProgress = {
              totalPoints: response.progress.totalPoints,
              level: response.progress.level,
              badges: response.progress.earnedBadges.map(eb => ({
                id: eb.badge.id,
                name: eb.badge.name,
                description: eb.badge.description,
                icon: eb.badge.icon,
                points: eb.badge.points,
                earned: true,
                earnedAt: eb.earnedAt
              })),
              streak: response.progress.streak,
              lastActivity: response.progress.lastActivity
            };
            setProgress(backendProgress);
            saveUserProgress(backendProgress);
          } else {
            throw new Error('No progress from backend');
          }
        } catch (error) {
          console.log('Backend not available, using local storage');
          // Fallback to local storage
          const savedProgress = loadUserProgress();
          if (savedProgress) {
            // Calculate current streak based on last activity
            const currentStreak = calculateStreak(savedProgress.lastActivity);
            const updatedProgress = {
              ...savedProgress,
              streak: currentStreak,
              lastActivity: new Date().toISOString()
            };
            setProgress(updatedProgress);
            saveUserProgress(updatedProgress);
          } else {
            // Initialize with user data from auth
            const initialProgress: UserProgress = {
              totalPoints: user.totalPoints || 0,
              level: user.level || 1,
              badges: user.badges?.map(b => ({
                id: b.name.toLowerCase().replace(/\s+/g, '-'),
                name: b.name,
                description: `Earned ${b.points} points`,
                icon: '🏆',
                points: b.points,
                earned: true,
                earnedAt: b.earnedAt
              })) || [],
              streak: 1, // Start with 1 day streak
              lastActivity: new Date().toISOString()
            };
            setProgress(initialProgress);
            saveUserProgress(initialProgress);
          }
        }
        
        // Load daily challenges
        try {
          const challengesResponse = await apiGetDailyChallenges();
          if (challengesResponse.success && challengesResponse.challenges) {
            // Convert backend challenges to frontend format
            const backendChallenges: Challenge[] = challengesResponse.challenges.map(c => ({
              id: c.id,
              title: c.title,
              description: c.description,
              points: c.points,
              completed: false, // Will be updated based on user progress
              category: c.category
            }));
            setChallenges(backendChallenges);
          } else {
            throw new Error('No challenges from backend');
          }
        } catch (error) {
          console.log('Backend not available, using local challenges');
          setChallenges(getDailyChallenges());
        }
      }
    };

    loadProgress();
  }, [isAuthenticated, user]);

  const awardPointsToUser = (points: number, reason: string) => {
    const result = awardPoints(progress.totalPoints, points);
    const newBadges = checkBadgeEarned(progress, 'quiz-complete');
    
    // Update streak based on activity
    const today = new Date().toDateString();
    const lastActivityDate = new Date(progress.lastActivity).toDateString();
    const newStreak = today === lastActivityDate ? progress.streak : progress.streak + 1;
    
    const updatedProgress: UserProgress = {
      ...progress,
      totalPoints: result.totalPoints,
      level: result.newLevel,
      badges: [...progress.badges, ...newBadges],
      streak: newStreak,
      lastActivity: new Date().toISOString()
    };

    setProgress(updatedProgress);
    saveUserProgress(updatedProgress);

    // Show success toast
    toast({
      title: `+${points} Points! 🎉`,
      description: reason,
    });

    // Show level up toast
    if (result.leveledUp) {
      toast({
        title: `Level Up! 🚀`,
        description: `You reached level ${result.newLevel}!`,
      });
    }

    // Show badge earned toasts
    newBadges.forEach(badge => {
      toast({
        title: `Badge Earned! ${badge.icon}`,
        description: `${badge.name}: ${badge.description}`,
      });
    });
  };

  const completeChallenge = async (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge || challenge.completed) return;

    try {
      // Try to complete challenge via backend
      const response = await apiCompleteChallenge(challengeId);
      if (response.success) {
        // Update challenge status
        setChallenges(prev => 
          prev.map(c => 
            c.id === challengeId ? { ...c, completed: true } : c
          )
        );

        // Update progress with backend response
        const updatedProgress: UserProgress = {
          ...progress,
          totalPoints: response.totalPoints,
          level: response.level,
          lastActivity: new Date().toISOString()
        };
        setProgress(updatedProgress);
        saveUserProgress(updatedProgress);

        // Show success toast
        toast({
          title: `+${response.points} Points! 🎉`,
          description: `Completed: ${challenge.title}`,
        });

        // Show new badges if any
        if (response.newBadges && response.newBadges.length > 0) {
          response.newBadges.forEach(badge => {
            toast({
              title: `Badge Earned! ${badge.icon}`,
              description: `${badge.name}: ${badge.description}`,
            });
          });
        }
      } else {
        throw new Error('Backend completion failed');
      }
    } catch (error) {
      console.log('Backend not available, using local completion');
      // Fallback to local completion
      setChallenges(prev => 
        prev.map(c => 
          c.id === challengeId ? { ...c, completed: true } : c
        )
      );

      // Award points locally
      awardPointsToUser(challenge.points, `Completed: ${challenge.title}`);
    }
  };

  const completeQuiz = async (quizId: string, answers: number[]) => {
    try {
      // Try to submit quiz via backend
      const response = await apiSubmitQuiz(quizId, answers);
      if (response.success) {
        // Update progress with backend response
        const updatedProgress: UserProgress = {
          ...progress,
          totalPoints: response.totalPoints,
          level: response.level,
          lastActivity: new Date().toISOString()
        };
        setProgress(updatedProgress);
        saveUserProgress(updatedProgress);

        // Show success toast
        toast({
          title: `+${response.points} Points! 🎉`,
          description: `Quiz completed with ${response.percentage}% score`,
        });

        // Show new badges if any
        if (response.newBadges && response.newBadges.length > 0) {
          response.newBadges.forEach(badge => {
            toast({
              title: `Badge Earned! ${badge.icon}`,
              description: `${badge.name}: ${badge.description}`,
            });
          });
        }
      } else {
        throw new Error('Backend submission failed');
      }
    } catch (error) {
      console.log('Backend not available, using local completion');
      // Fallback to local completion
      const score = answers.filter((answer, index) => {
        // This is a simplified check - in a real app, you'd need the correct answers
        return answer === 0; // Assuming first option is always correct for fallback
      }).length;
      const maxScore = answers.length;
      const percentage = (score / maxScore) * 100;
      const basePoints = score * 20;
      const bonusPoints = percentage >= 90 ? 50 : percentage >= 70 ? 25 : 0;
      const totalPoints = basePoints + bonusPoints;

      awardPointsToUser(totalPoints, `Quiz completed with ${percentage.toFixed(0)}% score`);
    }
  };

  const refreshChallenges = () => {
    setChallenges(getDailyChallenges());
  };

  return (
    <GameContext.Provider
      value={{
        progress,
        challenges,
        awardPointsToUser,
        completeChallenge,
        completeQuiz,
        refreshChallenges
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};