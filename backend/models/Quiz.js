import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: [{
    type: String,
    required: true,
    trim: true
  }],
  correct: {
    type: Number,
    required: true,
    min: 0
  },
  explanation: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['environment', 'energy', 'water', 'waste', 'biodiversity', 'coding']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  questions: [questionSchema],
  category: {
    type: String,
    required: true,
    enum: ['environment', 'energy', 'water', 'waste', 'biodiversity', 'coding']
  },
  totalPoints: {
    type: Number,
    required: true,
    min: 0
  },
  timeLimit: {
    type: Number, // in minutes
    default: 30
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better performance
quizSchema.index({ category: 1, isActive: 1 });
quizSchema.index({ totalPoints: 1 });

export default mongoose.model('Quiz', quizSchema);

