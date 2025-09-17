// API configuration and utilities

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Flag to check if we're in offline mode (no backend connection)
let isOfflineMode = false;

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: T;
  token?: string;
  errors?: any[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  totalPoints: number;
  level: number;
  badges?: Array<{
    name: string;
    earnedAt: string;
    points: number;
  }>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
}

// Game-related interfaces
export interface Challenge {
  _id: string;
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'energy' | 'water' | 'waste' | 'transport' | 'coding';
  difficulty: 'easy' | 'medium' | 'hard';
  isActive: boolean;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  category: 'environment' | 'energy' | 'water' | 'waste' | 'biodiversity' | 'coding';
  totalPoints: number;
  timeLimit: number;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Badge {
  _id: string;
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  category: 'quiz' | 'challenge' | 'streak' | 'level' | 'special';
}

export interface UserProgress {
  _id: string;
  user: string;
  totalPoints: number;
  level: number;
  streak: number;
  lastActivity: string;
  completedChallenges: Array<{
    challenge: Challenge;
    completedAt: string;
    points: number;
  }>;
  completedQuizzes: Array<{
    quiz: Quiz;
    score: number;
    maxScore: number;
    percentage: number;
    points: number;
    completedAt: string;
  }>;
  earnedBadges: Array<{
    badge: Badge;
    earnedAt: string;
    points: number;
  }>;
  statistics: {
    totalChallengesCompleted: number;
    totalQuizzesCompleted: number;
    totalBadgesEarned: number;
    longestStreak: number;
    averageQuizScore: number;
    lastLogin: string;
  };
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  email: string;
  avatar: string;
  points: number;
  level: number;
  streak: number;
  badges: number;
  challengesCompleted: number;
  quizzesCompleted: number;
  lastActivity: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  private loadToken() {
    this.token = localStorage.getItem('authToken');
  }

  private setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  private clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }
      
      // If we successfully connected to the backend, reset offline mode
      if (isOfflineMode) {
        console.log('Backend connection restored, exiting offline mode');
        isOfflineMode = false;
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      // Check if this is a network error (likely backend not running)
      if (error instanceof Error && error.message.includes('fetch')) {
        console.log('Network error detected, entering offline mode');
        isOfflineMode = true;
      }
      
      throw error;
    }
  }

  // Authentication methods
  async register(data: RegisterData): Promise<ApiResponse<User>> {
    try {
      // Try to connect to the backend
      const response = await this.request<User>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.token) {
        this.setToken(response.token);
      }

      return response;
    } catch (error) {
      console.log('Backend connection failed, using mock registration');
      
      // Mock successful registration if backend is not available
      const mockUser: User = {
        id: 'mock-' + Date.now(),
        name: data.name,
        email: data.email,
        role: 'student',
        totalPoints: 0,
        level: 1
      };
      
      // Generate a mock token
      const mockToken = 'mock-token-' + Date.now();
      this.setToken(mockToken);
      
      // Store user in localStorage for persistence
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      
      return {
        success: true,
        message: 'Registration successful (Mock)',
        user: mockUser,
        token: mockToken
      };
    }
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    try {
      // Try to connect to the backend
      const response = await this.request<User>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (response.token) {
        this.setToken(response.token);
      }

      return response;
    } catch (error) {
      console.log('Backend connection failed, checking for mock user');
      
      // Check if we have a mock user with matching credentials
      const mockUserStr = localStorage.getItem('mockUser');
      if (mockUserStr) {
        const mockUser = JSON.parse(mockUserStr) as User;
        
        // Simple check if the email matches (in a real app, we'd check password too)
        if (mockUser.email === credentials.email) {
          // Generate a mock token
          const mockToken = 'mock-token-' + Date.now();
          this.setToken(mockToken);
          
          return {
            success: true,
            message: 'Login successful (Mock)',
            user: mockUser,
            token: mockToken
          };
        }
      }
      
      // If no matching mock user or no mock users at all
      throw new Error('Invalid email or password');
    }
  }

  async logout(): Promise<ApiResponse> {
    try {
      // Check if we're using a mock token
      if (this.token && this.token.startsWith('mock-token-')) {
        // Don't remove mock user from localStorage - keep it for future logins
        this.clearToken();
        
        return {
          success: true,
          message: 'Logged out successfully (Mock)',
        };
      }
      
      // Try to connect to the backend
      await this.request('/auth/logout', {
        method: 'POST',
      });
      
      this.clearToken();
      
      return {
        success: true,
        message: 'Logged out successfully',
      };
    } catch (error) {
      // If backend request fails, still clear the token but keep mock user
      this.clearToken();
      
      return {
        success: true,
        message: 'Logged out successfully (offline mode)',
      };
    }
  }

  async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(token: string, data: ResetPasswordData): Promise<ApiResponse<User>> {
    const response = await this.request<User>(`/auth/reset-password/${token}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      return await this.request<User>('/auth/me');
    } catch (error) {
      console.log('Backend connection failed, checking for mock user');
      
      // Check if we have a mock user stored in localStorage
      const mockUserStr = localStorage.getItem('mockUser');
      if (mockUserStr && this.token && this.token.startsWith('mock-token-')) {
        const mockUser = JSON.parse(mockUserStr) as User;
        
        return {
          success: true,
          message: 'User retrieved successfully (Mock)',
          user: mockUser
        };
      }
      
      // If no mock user or no valid token
      throw new Error('Not authenticated');
    }
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
  
  isOffline(): boolean {
    return isOfflineMode;
  }

  // Method to clear mock user data (useful for testing or manual cleanup)
  clearMockUser(): void {
    localStorage.removeItem('mockUser');
  }

  // Method to check if we have a mock user
  hasMockUser(): boolean {
    return !!localStorage.getItem('mockUser');
  }

  // Game-related methods
  async getDailyChallenges(category?: string): Promise<ApiResponse<Challenge[]>> {
    try {
      const query = category ? `?category=${category}` : '';
      return await this.request<Challenge[]>(`/game/challenges${query}`);
    } catch (error) {
      console.log('Backend connection failed, using mock challenges');
      // Return mock challenges if backend is not available
      return {
        success: true,
        challenges: [
          {
            _id: 'mock-1',
            id: 'lights-off',
            title: 'Turn off lights when leaving room',
            description: 'Save energy by switching off lights in empty rooms',
            points: 10,
            category: 'energy',
            difficulty: 'easy',
            isActive: true
          },
          {
            _id: 'mock-2',
            id: 'reusable-bottle',
            title: 'Use reusable water bottle',
            description: 'Avoid single-use plastic bottles today',
            points: 15,
            category: 'waste',
            difficulty: 'easy',
            isActive: true
          }
        ]
      };
    }
  }

  async completeChallenge(challengeId: string): Promise<ApiResponse<{
    points: number;
    totalPoints: number;
    level: number;
    newBadges: Badge[];
  }>> {
    try {
      return await this.request(`/game/challenges/${challengeId}/complete`, {
        method: 'POST'
      });
    } catch (error) {
      console.log('Backend connection failed, using mock completion');
      // Return mock completion if backend is not available
      return {
        success: true,
        message: 'Challenge completed successfully (Mock)',
        points: 10,
        totalPoints: 10,
        level: 1,
        newBadges: []
      };
    }
  }

  async getQuizzes(category?: string): Promise<ApiResponse<Quiz[]>> {
    try {
      const query = category ? `?category=${category}` : '';
      return await this.request<Quiz[]>(`/game/quizzes${query}`);
    } catch (error) {
      console.log('Backend connection failed, using mock quizzes');
      // Return mock quizzes if backend is not available
      return {
        success: true,
        quizzes: [
          {
            _id: 'mock-quiz-1',
            title: 'Climate Change & Environment',
            description: 'Test your knowledge about climate change',
            category: 'environment',
            totalPoints: 120,
            timeLimit: 30,
            questions: []
          }
        ]
      };
    }
  }

  async getQuizById(quizId: string): Promise<ApiResponse<Quiz>> {
    try {
      return await this.request<Quiz>(`/game/quizzes/${quizId}`);
    } catch (error) {
      console.log('Backend connection failed, using mock quiz');
      // Return mock quiz if backend is not available
      return {
        success: true,
        quiz: {
          _id: quizId,
          title: 'Mock Quiz',
          description: 'A mock quiz for offline mode',
          category: 'environment',
          totalPoints: 100,
          timeLimit: 30,
          questions: []
        }
      };
    }
  }

  async submitQuiz(quizId: string, answers: number[]): Promise<ApiResponse<{
    score: number;
    maxScore: number;
    percentage: number;
    points: number;
    totalPoints: number;
    level: number;
    newBadges: Badge[];
  }>> {
    try {
      return await this.request(`/game/quizzes/${quizId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers })
      });
    } catch (error) {
      console.log('Backend connection failed, using mock submission');
      // Return mock submission if backend is not available
      const score = Math.floor(Math.random() * 5) + 3; // Random score between 3-7
      const maxScore = 5;
      const percentage = Math.round((score / maxScore) * 100);
      const points = score * 20;
      
      return {
        success: true,
        message: 'Quiz submitted successfully (Mock)',
        score,
        maxScore,
        percentage,
        points,
        totalPoints: points,
        level: 1,
        newBadges: []
      };
    }
  }

  async getUserProgress(): Promise<ApiResponse<UserProgress>> {
    try {
      return await this.request<UserProgress>('/game/progress');
    } catch (error) {
      console.log('Backend connection failed, using mock progress');
      // Return mock progress if backend is not available
      return {
        success: true,
        progress: {
          _id: 'mock-progress',
          user: 'mock-user',
          totalPoints: 0,
          level: 1,
          streak: 0,
          lastActivity: new Date().toISOString(),
          completedChallenges: [],
          completedQuizzes: [],
          earnedBadges: [],
          statistics: {
            totalChallengesCompleted: 0,
            totalQuizzesCompleted: 0,
            totalBadgesEarned: 0,
            longestStreak: 0,
            averageQuizScore: 0,
            lastLogin: new Date().toISOString()
          }
        }
      };
    }
  }

  async getLeaderboard(period: 'weekly' | 'monthly' = 'weekly'): Promise<ApiResponse<LeaderboardEntry[]>> {
    try {
      return await this.request<LeaderboardEntry[]>(`/game/leaderboard?period=${period}`);
    } catch (error) {
      console.log('Backend connection failed, using mock leaderboard');
      // Return mock leaderboard if backend is not available
      return {
        success: true,
        leaderboard: [
          {
            rank: 1,
            name: 'Emma Green',
            email: 'emma@example.com',
            avatar: '👩‍🌾',
            points: 2450,
            level: 12,
            streak: 28,
            badges: 15,
            challengesCompleted: 25,
            quizzesCompleted: 8,
            lastActivity: new Date().toISOString()
          },
          {
            rank: 2,
            name: 'Alex Rivers',
            email: 'alex@example.com',
            avatar: '👨‍🔬',
            points: 2380,
            level: 11,
            streak: 25,
            badges: 13,
            challengesCompleted: 22,
            quizzesCompleted: 7,
            lastActivity: new Date().toISOString()
          }
        ]
      };
    }
  }

  async getRecentQuizzes(limit: number = 5): Promise<ApiResponse<any[]>> {
    try {
      return await this.request<any[]>(`/game/recent-quizzes?limit=${limit}`);
    } catch (error) {
      console.log('Backend connection failed, using mock recent quizzes');
      // Return mock recent quizzes if backend is not available
      return {
        success: true,
        recentQuizzes: [
          {
            id: 'mock-1',
            title: 'Climate Change Basics',
            description: 'Test your knowledge about climate change',
            category: 'environment',
            score: 85,
            maxScore: 100,
            percentage: 85,
            points: 170,
            completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            completed: true
          },
          {
            id: 'mock-2',
            title: 'Renewable Energy',
            description: 'Learn about sustainable energy sources',
            category: 'energy',
            score: 92,
            maxScore: 100,
            percentage: 92,
            points: 184,
            completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            completed: true
          }
        ]
      };
    }
  }
}

// Create singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export individual methods for convenience
export const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  isAuthenticated,
  getToken,
  isOffline,
  clearMockUser,
  hasMockUser,
  getDailyChallenges,
  completeChallenge,
  getQuizzes,
  getQuizById,
  submitQuiz,
  getUserProgress,
  getLeaderboard,
  getRecentQuizzes,
} = apiClient;

