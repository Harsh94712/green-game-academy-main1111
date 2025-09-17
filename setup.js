#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🌱 Setting up Greenverse...\n');

// Install frontend dependencies
console.log('📦 Installing frontend dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed\n');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Install backend dependencies
console.log('📦 Installing backend dependencies...');
try {
  execSync('npm install', { cwd: 'backend', stdio: 'inherit' });
  console.log('✅ Backend dependencies installed\n');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Check if MongoDB is available
console.log('🔍 Checking MongoDB connection...');
try {
  // Try to connect to MongoDB
  execSync('mongosh --eval "db.runCommand({ ping: 1 })" --quiet', { stdio: 'pipe' });
  console.log('✅ MongoDB is running\n');
} catch (error) {
  console.log('⚠️  MongoDB not detected. The app will run in mock mode.\n');
  console.log('   To use full features, install MongoDB:');
  console.log('   - Download from: https://www.mongodb.com/try/download/community');
  console.log('   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas\n');
}

console.log('🚀 Setup complete! You can now run:');
console.log('   npm start     - Start both frontend and backend');
console.log('   npm run dev   - Start frontend only');
console.log('   npm run backend - Start backend only\n');

console.log('🌐 The app will be available at:');
console.log('   Frontend: http://localhost:5173');
console.log('   Backend:  http://localhost:5000\n');

console.log('🎮 Ready to learn and save the planet! 🌍');