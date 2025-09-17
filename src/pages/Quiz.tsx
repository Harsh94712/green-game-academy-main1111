import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: 'environment' | 'energy' | 'water' | 'waste' | 'biodiversity' | 'coding';
  difficulty: 'easy' | 'medium' | 'hard';
}

const Quiz = () => {
  const navigate = useNavigate();
  const { completeQuiz } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions: Question[] = [
    // Environment & Climate
    {
      id: 1,
      question: "What is the main cause of climate change?",
      options: [
        "Natural weather patterns",
        "Greenhouse gas emissions from human activities",
        "Solar radiation changes",
        "Ocean currents"
      ],
      correct: 1,
      explanation: "Human activities, especially burning fossil fuels, release greenhouse gases that trap heat in the atmosphere.",
      category: 'environment',
      difficulty: 'easy'
    },
    {
      id: 2,
      question: "What percentage of global warming is caused by human activities?",
      options: [
        "About 50%",
        "About 75%",
        "About 90%",
        "About 100%"
      ],
      correct: 2,
      explanation: "Scientific consensus shows that human activities are responsible for approximately 90% of global warming since the mid-20th century.",
      category: 'environment',
      difficulty: 'medium'
    },
    {
      id: 3,
      question: "Which gas is the most significant contributor to the greenhouse effect?",
      options: [
        "Methane (CH4)",
        "Carbon Dioxide (CO2)",
        "Nitrous Oxide (N2O)",
        "Water Vapor (H2O)"
      ],
      correct: 1,
      explanation: "While water vapor is the most abundant greenhouse gas, CO2 is the most significant because it stays in the atmosphere longer and its concentration is directly influenced by human activities.",
      category: 'environment',
      difficulty: 'hard'
    },

    // Energy
    {
      id: 4,
      question: "Which renewable energy source is most widely used globally?",
      options: [
        "Solar power",
        "Wind power", 
        "Hydroelectric power",
        "Geothermal power"
      ],
      correct: 2,
      explanation: "Hydroelectric power accounts for about 16% of global electricity generation, making it the most used renewable source.",
      category: 'energy',
      difficulty: 'easy'
    },
    {
      id: 5,
      question: "What is the efficiency range of modern solar panels?",
      options: [
        "5-10%",
        "15-22%",
        "30-40%",
        "50-60%"
      ],
      correct: 1,
      explanation: "Most commercial solar panels have an efficiency of 15-22%, with some high-end panels reaching up to 24%.",
      category: 'energy',
      difficulty: 'medium'
    },
    {
      id: 6,
      question: "Which country generates the most wind energy?",
      options: [
        "United States",
        "China",
        "Germany",
        "India"
      ],
      correct: 1,
      explanation: "China is the world's largest producer of wind energy, generating more than 30% of global wind power capacity.",
      category: 'energy',
      difficulty: 'medium'
    },

    // Water
    {
      id: 7,
      question: "How much of Earth's water is fresh water?",
      options: [
        "About 50%",
        "About 25%",
        "About 10%",
        "Less than 3%"
      ],
      correct: 3,
      explanation: "Only about 2.5% of Earth's water is fresh water, and most of that is frozen in ice caps and glaciers.",
      category: 'water',
      difficulty: 'easy'
    },
    {
      id: 8,
      question: "What percentage of global water usage is for agriculture?",
      options: [
        "About 30%",
        "About 50%",
        "About 70%",
        "About 90%"
      ],
      correct: 2,
      explanation: "Agriculture accounts for approximately 70% of global freshwater withdrawals, making it the largest water-consuming sector.",
      category: 'water',
      difficulty: 'medium'
    },
    {
      id: 9,
      question: "How long can a person survive without water?",
      options: [
        "1-2 days",
        "3-4 days",
        "5-7 days",
        "10-14 days"
      ],
      correct: 1,
      explanation: "The human body can typically survive without water for 3-4 days, depending on environmental conditions and individual health.",
      category: 'water',
      difficulty: 'easy'
    },

    // Waste & Recycling
    {
      id: 10,
      question: "How long does it take for a plastic bottle to decompose?",
      options: [
        "10-20 years",
        "50-100 years",
        "200-500 years",
        "1000+ years"
      ],
      correct: 2,
      explanation: "Plastic bottles can take 450-500 years to decompose in landfills, making proper recycling crucial.",
      category: 'waste',
      difficulty: 'easy'
    },
    {
      id: 11,
      question: "What percentage of plastic waste is recycled globally?",
      options: [
        "About 5%",
        "About 15%",
        "About 30%",
        "About 50%"
      ],
      correct: 0,
      explanation: "Only about 9% of all plastic waste ever produced has been recycled, highlighting the need for better waste management.",
      category: 'waste',
      difficulty: 'hard'
    },
    {
      id: 12,
      question: "Which material has the highest recycling rate?",
      options: [
        "Plastic",
        "Glass",
        "Aluminum",
        "Paper"
      ],
      correct: 2,
      explanation: "Aluminum has the highest recycling rate at about 50%, and it can be recycled indefinitely without losing quality.",
      category: 'waste',
      difficulty: 'medium'
    },

    // Biodiversity
    {
      id: 13,
      question: "How many species go extinct each day due to human activities?",
      options: [
        "1-5 species",
        "10-20 species",
        "50-100 species",
        "200+ species"
      ],
      correct: 3,
      explanation: "Scientists estimate that 150-200 species go extinct every day due to human activities, which is 1000 times the natural rate.",
      category: 'biodiversity',
      difficulty: 'hard'
    },
    {
      id: 14,
      question: "What percentage of the world's forests have been lost since 1990?",
      options: [
        "About 5%",
        "About 10%",
        "About 20%",
        "About 30%"
      ],
      correct: 1,
      explanation: "The world has lost about 10% of its forest area since 1990, equivalent to an area larger than India.",
      category: 'biodiversity',
      difficulty: 'medium'
    },

    // Coding & Technology
    {
      id: 15,
      question: "What is the most energy-efficient programming language?",
      options: [
        "Python",
        "JavaScript",
        "C",
        "Java"
      ],
      correct: 2,
      explanation: "C is generally the most energy-efficient programming language due to its low-level nature and direct hardware interaction.",
      category: 'coding',
      difficulty: 'medium'
    },
    {
      id: 16,
      question: "What percentage of global electricity is used by data centers?",
      options: [
        "About 1%",
        "About 3%",
        "About 7%",
        "About 15%"
      ],
      correct: 1,
      explanation: "Data centers consume about 3% of global electricity, and this is expected to increase with growing digitalization.",
      category: 'coding',
      difficulty: 'hard'
    },
    {
      id: 17,
      question: "Which algorithm is most efficient for sorting large datasets?",
      options: [
        "Bubble Sort",
        "Quick Sort",
        "Merge Sort",
        "Insertion Sort"
      ],
      correct: 2,
      explanation: "Merge Sort has O(n log n) time complexity and is stable, making it efficient for large datasets and reducing computational waste.",
      category: 'coding',
      difficulty: 'hard'
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Award points for completing quiz
        const score = calculateScore();
        completeQuiz(score, questions.length);
        setQuizComplete(true);
      }
    }, 2000);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct ? 1 : 0);
    }, 0);
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "Excellent! You're an eco expert! 🌟";
    if (percentage >= 70) return "Great job! Keep learning! 🌱";
    if (percentage >= 50) return "Good effort! Room for improvement! 📚";
    return "Keep studying! You'll get there! 💪";
  };

  if (quizComplete) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quiz Complete! 🎉</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-green-600">{percentage}%</div>
              <div>
                <p className="text-xl font-semibold">You scored {score} out of {questions.length}</p>
                <p className="text-gray-600 mt-2">{getScoreMessage(score)}</p>
              </div>
              
              <div className="space-y-4">
                <Badge className="text-lg px-4 py-2">+{score * 20} Points Earned!</Badge>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={() => navigate('/dashboard')} className="w-full">
                    Back to Dashboard
                  </Button>
                  <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
                    Retake Quiz
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/dashboard')} variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="ml-4 flex-1">
            <h1 className="text-xl font-bold">Eco Knowledge Quiz</h1>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
              <Badge variant="secondary" className="text-xs">
                {currentQ.category.charAt(0).toUpperCase() + currentQ.category.slice(1)}
              </Badge>
              <Badge 
                variant={currentQ.difficulty === 'easy' ? 'default' : currentQ.difficulty === 'medium' ? 'secondary' : 'destructive'}
                className="text-xs"
              >
                {currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQ.correct
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-blue-100 border-blue-500'
                      : showResult && index === currentQ.correct
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && (
                      <div>
                        {index === currentQ.correct ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="h-5 w-5 text-red-600" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Explanation:</strong> {currentQ.explanation}
                </p>
              </div>
            )}

            <div className="mt-6">
              <Button 
                onClick={handleNext}
                disabled={selectedAnswer === null || showResult}
                className="w-full"
              >
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;