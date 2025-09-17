// Password reset functionality
import { userDatabase } from './userDatabase';

export interface PasswordResetToken {
  token: string;
  email: string;
  expiresAt: number;
  createdAt: number;
  used: boolean;
}

// Generate secure reset token
const generateResetToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Token storage (in production, this would be in a database)
let resetTokens: PasswordResetToken[] = [];

// Load tokens from localStorage
const loadTokens = (): void => {
  try {
    const stored = localStorage.getItem('passwordResetTokens');
    if (stored) {
      resetTokens = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load reset tokens:', error);
    resetTokens = [];
  }
};

// Save tokens to localStorage
const saveTokens = (): void => {
  try {
    localStorage.setItem('passwordResetTokens', JSON.stringify(resetTokens));
  } catch (error) {
    console.error('Failed to save reset tokens:', error);
  }
};

// Initialize on module load
loadTokens();

// Clean up expired tokens
const cleanupExpiredTokens = (): void => {
  const now = Date.now();
  resetTokens = resetTokens.filter(token => token.expiresAt > now);
  saveTokens();
};

export const passwordResetService = {
  // Create password reset token
  createResetToken: (email: string): string => {
    cleanupExpiredTokens();
    
    // Check if user exists
    if (!userDatabase.userExists(email)) {
      throw new Error('No account found with this email address');
    }
    
    // Generate new token
    const token = generateResetToken();
    const now = Date.now();
    const expiresAt = now + (30 * 60 * 1000); // 30 minutes
    
    // Remove any existing tokens for this email
    resetTokens = resetTokens.filter(t => t.email !== email);
    
    // Add new token
    const resetToken: PasswordResetToken = {
      token,
      email: email.toLowerCase(),
      expiresAt,
      createdAt: now,
      used: false
    };
    
    resetTokens.push(resetToken);
    saveTokens();
    
    return token;
  },

  // Validate reset token
  validateResetToken: (token: string): PasswordResetToken | null => {
    cleanupExpiredTokens();
    
    const resetToken = resetTokens.find(t => t.token === token && !t.used);
    
    if (!resetToken) {
      return null;
    }
    
    if (Date.now() > resetToken.expiresAt) {
      return null;
    }
    
    return resetToken;
  },

  // Use reset token (mark as used)
  useResetToken: (token: string): boolean => {
    cleanupExpiredTokens();
    
    const resetToken = resetTokens.find(t => t.token === token);
    
    if (!resetToken || resetToken.used) {
      return false;
    }
    
    resetToken.used = true;
    saveTokens();
    
    return true;
  },

  // Get reset token by email (for testing)
  getTokenByEmail: (email: string): PasswordResetToken | null => {
    cleanupExpiredTokens();
    return resetTokens.find(t => t.email === email.toLowerCase() && !t.used) || null;
  },

  // Clear all tokens (for testing)
  clearAllTokens: (): void => {
    resetTokens = [];
    localStorage.removeItem('passwordResetTokens');
  }
};


