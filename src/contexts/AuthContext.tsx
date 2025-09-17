import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  validatePassword, 
  validateEmail, 
  sanitizeInput
} from '@/lib/security';
import { apiClient, type User, isOffline } from '@/lib/api';

// User type is now imported from api.ts

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOffline: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    if (!apiClient.isAuthenticated()) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.getCurrentUser();
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
        apiClient.logout();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      apiClient.logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    
    // Check auth status every 5 minutes
    const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Sanitize inputs
      const sanitizedEmail = sanitizeInput(email).toLowerCase();
      const sanitizedPassword = sanitizeInput(password);
      
      // Validate email format
      if (!validateEmail(sanitizedEmail)) {
        throw new Error('Invalid email format');
      }
      
      // Validate password
      if (sanitizedPassword.length < 1) {
        throw new Error('Password is required');
      }
      
      // Call API
      const response = await apiClient.login({
        email: sanitizedEmail,
        password: sanitizedPassword
      });
      
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        throw new Error(response.message || 'Login failed');
      }
      
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Sanitize inputs
      const sanitizedName = sanitizeInput(name);
      const sanitizedEmail = sanitizeInput(email).toLowerCase();
      const sanitizedPassword = sanitizeInput(password);
      
      // Validate email format
      if (!validateEmail(sanitizedEmail)) {
        throw new Error('Invalid email format');
      }
      
      // Validate password strength
      const passwordValidation = validatePassword(sanitizedPassword);
      if (!passwordValidation.isValid) {
        throw new Error(`Password requirements not met: ${passwordValidation.errors.join(', ')}`);
      }
      
      // Validate name
      if (sanitizedName.length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }
      
      // Call API
      const response = await apiClient.register({
        name: sanitizedName,
        email: sanitizedEmail,
        password: sanitizedPassword
      });
      
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
      
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isOffline: isOffline(),
        login,
        signup,
        logout,
        checkAuthStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};