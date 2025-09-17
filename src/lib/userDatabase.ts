// Simple in-memory user database for demo purposes
// In a real app, this would connect to a proper database

export interface UserData {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: number;
  lastLogin?: number;
}

// Simple password hashing (in production, use bcrypt or similar)
const hashPassword = (password: string): string => {
  // This is a simple hash for demo - use proper hashing in production
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

// In-memory storage (resets on page refresh in demo)
let users: UserData[] = [];

// Load users from localStorage on initialization
const loadUsers = (): void => {
  try {
    const stored = localStorage.getItem('userDatabase');
    if (stored) {
      users = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load users:', error);
    users = [];
  }
};

// Save users to localStorage
const saveUsers = (): void => {
  try {
    localStorage.setItem('userDatabase', JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users:', error);
  }
};

// Initialize on module load
loadUsers();

export const userDatabase = {
  // Check if user exists by email
  userExists: (email: string): boolean => {
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  },

  // Create new user
  createUser: (name: string, email: string, password: string): UserData => {
    const emailLower = email.toLowerCase();
    
    if (userDatabase.userExists(emailLower)) {
      throw new Error('User with this email already exists');
    }

    const newUser: UserData = {
      id: Date.now().toString(), // Simple ID generation
      email: emailLower,
      name: name.trim(),
      passwordHash: hashPassword(password),
      createdAt: Date.now(),
    };

    users.push(newUser);
    saveUsers();
    return newUser;
  },

  // Authenticate user
  authenticateUser: (email: string, password: string): UserData | null => {
    const emailLower = email.toLowerCase();
    const user = users.find(u => u.email === emailLower);
    
    if (!user) {
      return null;
    }

    if (!verifyPassword(password, user.passwordHash)) {
      return null;
    }

    // Update last login
    user.lastLogin = Date.now();
    saveUsers();
    
    return user;
  },

  // Get user by ID
  getUserById: (id: string): UserData | null => {
    return users.find(user => user.id === id) || null;
  },

  // Get all users (for admin purposes)
  getAllUsers: (): UserData[] => {
    return [...users]; // Return copy to prevent mutation
  },

  // Update user password
  updateUserPassword: (userId: string, newPassword: string): boolean => {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return false;
    }
    
    users[userIndex].passwordHash = hashPassword(newPassword);
    saveUsers();
    return true;
  },

  // Update user password by email
  updateUserPasswordByEmail: (email: string, newPassword: string): boolean => {
    const userIndex = users.findIndex(user => user.email === email.toLowerCase());
    if (userIndex === -1) {
      return false;
    }
    
    users[userIndex].passwordHash = hashPassword(newPassword);
    saveUsers();
    return true;
  },

  // Clear all users (for testing)
  clearAllUsers: (): void => {
    users = [];
    localStorage.removeItem('userDatabase');
  }
};
