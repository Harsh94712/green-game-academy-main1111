// Security utilities for authentication and validation

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  score: number; // 0-100
}

export interface SessionData {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
  expiresAt: number;
  createdAt: number;
}

// Password strength validation
export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];
  let score = 0;

  // Length check
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else if (password.length >= 12) {
    score += 20;
  } else {
    score += 10;
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else {
    score += 15;
  }

  // Lowercase check
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else {
    score += 15;
  }

  // Number check
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  } else {
    score += 15;
  }

  // Special character check
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  } else {
    score += 15;
  }

  // Common password check
  const commonPasswords = [
    'password', '123456', 'password123', 'admin', 'qwerty',
    'letmein', 'welcome', 'monkey', '1234567890', 'abc123'
  ];
  
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    errors.push('Password contains common words and is not secure');
    score -= 20;
  }

  // Sequential characters check
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password should not contain repeated characters');
    score -= 10;
  }

  return {
    isValid: errors.length === 0,
    errors,
    score: Math.max(0, Math.min(100, score))
  };
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate secure session token
export const generateSessionToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Session management
export const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const createSession = (user: SessionData['user']): SessionData => {
  const now = Date.now();
  return {
    user,
    token: generateSessionToken(),
    expiresAt: now + SESSION_DURATION,
    createdAt: now
  };
};

export const isSessionValid = (session: SessionData): boolean => {
  return Date.now() < session.expiresAt;
};

export const saveSession = (session: SessionData): void => {
  localStorage.setItem('session', JSON.stringify(session));
};

export const getSession = (): SessionData | null => {
  try {
    const stored = localStorage.getItem('session');
    if (!stored) return null;
    
    const session: SessionData = JSON.parse(stored);
    return isSessionValid(session) ? session : null;
  } catch {
    return null;
  }
};

export const clearSession = (): void => {
  localStorage.removeItem('session');
};

// Rate limiting for login attempts
interface LoginAttempt {
  email: string;
  attempts: number;
  lastAttempt: number;
  blockedUntil?: number;
}

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW = 60 * 60 * 1000; // 1 hour

export const checkLoginAttempts = (email: string): { allowed: boolean; remainingAttempts: number; lockoutTime?: number } => {
  const key = `login_attempts_${email}`;
  const stored = localStorage.getItem(key);
  
  if (!stored) {
    return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS };
  }

  const attempt: LoginAttempt = JSON.parse(stored);
  const now = Date.now();

  // Check if currently locked out
  if (attempt.blockedUntil && now < attempt.blockedUntil) {
    return { 
      allowed: false, 
      remainingAttempts: 0,
      lockoutTime: attempt.blockedUntil
    };
  }

  // Reset attempts if outside the window
  if (now - attempt.lastAttempt > ATTEMPT_WINDOW) {
    localStorage.removeItem(key);
    return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS };
  }

  const remainingAttempts = Math.max(0, MAX_LOGIN_ATTEMPTS - attempt.attempts);
  return { allowed: remainingAttempts > 0, remainingAttempts };
};

export const recordLoginAttempt = (email: string, success: boolean): void => {
  const key = `login_attempts_${email}`;
  const stored = localStorage.getItem(key);
  
  if (success) {
    // Clear attempts on successful login
    localStorage.removeItem(key);
    return;
  }

  const now = Date.now();
  let attempt: LoginAttempt = stored ? JSON.parse(stored) : {
    email,
    attempts: 0,
    lastAttempt: now
  };

  attempt.attempts += 1;
  attempt.lastAttempt = now;

  // Block if max attempts reached
  if (attempt.attempts >= MAX_LOGIN_ATTEMPTS) {
    attempt.blockedUntil = now + LOCKOUT_DURATION;
  }

  localStorage.setItem(key, JSON.stringify(attempt));
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// CSRF protection token
export const generateCSRFToken = (): string => {
  return generateSessionToken();
};


