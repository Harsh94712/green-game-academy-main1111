import Challenge from '../models/Challenge.js';
import Quiz from '../models/Quiz.js';
import Badge from '../models/Badge.js';

// Seed challenges
export const seedChallenges = async () => {
  try {
    const challenges = [
      // Energy challenges
      {
        id: 'lights-off',
        title: 'Turn off lights when leaving room',
        description: 'Save energy by switching off lights in empty rooms',
        points: 10,
        category: 'energy',
        difficulty: 'easy'
      },
      {
        id: 'take-stairs',
        title: 'Take stairs instead of elevator',
        description: 'Get exercise while saving energy',
        points: 5,
        category: 'energy',
        difficulty: 'easy'
      },
      {
        id: 'unplug-devices',
        title: 'Unplug unused electronic devices',
        description: 'Reduce phantom energy consumption',
        points: 15,
        category: 'energy',
        difficulty: 'medium'
      },
      
      // Water challenges
      {
        id: 'short-shower',
        title: 'Take a 5-minute shower',
        description: 'Conserve water with shorter showers',
        points: 20,
        category: 'water',
        difficulty: 'easy'
      },
      {
        id: 'fix-leaks',
        title: 'Fix any water leaks',
        description: 'Prevent water waste from leaks',
        points: 30,
        category: 'water',
        difficulty: 'medium'
      },
      {
        id: 'rainwater-collection',
        title: 'Set up rainwater collection',
        description: 'Collect rainwater for plants',
        points: 50,
        category: 'water',
        difficulty: 'hard'
      },
      
      // Waste challenges
      {
        id: 'reusable-bottle',
        title: 'Use reusable water bottle',
        description: 'Avoid single-use plastic bottles today',
        points: 15,
        category: 'waste',
        difficulty: 'easy'
      },
      {
        id: 'compost-food',
        title: 'Compost food waste',
        description: 'Turn food scraps into nutrient-rich soil',
        points: 25,
        category: 'waste',
        difficulty: 'medium'
      },
      {
        id: 'zero-waste-day',
        title: 'Have a zero-waste day',
        description: 'Avoid generating any waste for a day',
        points: 100,
        category: 'waste',
        difficulty: 'hard'
      },
      
      // Transport challenges
      {
        id: 'walk-bike',
        title: 'Walk or bike for short trips',
        description: 'Choose eco-friendly transportation',
        points: 25,
        category: 'transport',
        difficulty: 'easy'
      },
      {
        id: 'carpool',
        title: 'Carpool or use public transport',
        description: 'Reduce individual carbon footprint',
        points: 20,
        category: 'transport',
        difficulty: 'medium'
      },
      {
        id: 'electric-vehicle',
        title: 'Use electric vehicle or hybrid',
        description: 'Choose low-emission transportation',
        points: 40,
        category: 'transport',
        difficulty: 'hard'
      },
      
      // Coding challenges
      {
        id: 'code-eco-algorithm',
        title: 'Code an eco-friendly algorithm',
        description: 'Write efficient code that reduces computational waste',
        points: 50,
        category: 'coding',
        difficulty: 'medium'
      },
      {
        id: 'optimize-energy-usage',
        title: 'Optimize code for energy efficiency',
        description: 'Refactor code to use less CPU and memory',
        points: 75,
        category: 'coding',
        difficulty: 'hard'
      },
      {
        id: 'green-web-design',
        title: 'Design a green website',
        description: 'Create a website with minimal environmental impact',
        points: 60,
        category: 'coding',
        difficulty: 'hard'
      }
    ];
    
    // Clear existing challenges
    await Challenge.deleteMany({});
    
    // Insert new challenges
    await Challenge.insertMany(challenges);
    
    console.log('✅ Challenges seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding challenges:', error);
  }
};

// Seed quizzes
export const seedQuizzes = async () => {
  try {
    const quizzes = [
      {
        title: 'Climate Change & Environment',
        description: 'Test your knowledge about climate change and environmental issues',
        category: 'environment',
        totalPoints: 120,
        timeLimit: 30,
        questions: [
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
          {
            id: 4,
            question: "How many species go extinct each day due to human activities?",
            options: [
              "1-5 species",
              "10-20 species",
              "50-100 species",
              "200+ species"
            ],
            correct: 3,
            explanation: "Scientists estimate that 150-200 species go extinct every day due to human activities, which is 1000 times the natural rate.",
            category: 'environment',
            difficulty: 'hard'
          },
          {
            id: 5,
            question: "What percentage of the world's forests have been lost since 1990?",
            options: [
              "About 5%",
              "About 10%",
              "About 20%",
              "About 30%"
            ],
            correct: 1,
            explanation: "The world has lost about 10% of its forest area since 1990, equivalent to an area larger than India.",
            category: 'environment',
            difficulty: 'medium'
          },
          {
            id: 6,
            question: "What is the primary cause of ocean acidification?",
            options: [
              "Plastic pollution",
              "Oil spills",
              "CO2 absorption by seawater",
              "Overfishing"
            ],
            correct: 2,
            explanation: "Ocean acidification is primarily caused by the absorption of CO2 by seawater, which forms carbonic acid and lowers the pH of the ocean.",
            category: 'environment',
            difficulty: 'medium'
          }
        ]
      },
      {
        title: 'Energy & Resources',
        description: 'Learn about renewable energy and resource conservation',
        category: 'energy',
        totalPoints: 90,
        timeLimit: 25,
        questions: [
          {
            id: 1,
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
            id: 2,
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
            id: 3,
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
          }
        ]
      },
      {
        title: 'Eco-Coding & Technology',
        description: 'Sustainable programming and green technology',
        category: 'coding',
        totalPoints: 90,
        timeLimit: 20,
        questions: [
          {
            id: 1,
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
            id: 2,
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
            id: 3,
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
        ]
      }
    ];
    
    // Clear existing quizzes
    await Quiz.deleteMany({});
    
    // Insert new quizzes
    await Quiz.insertMany(quizzes);
    
    console.log('✅ Quizzes seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding quizzes:', error);
  }
};

// Seed badges
export const seedBadges = async () => {
  try {
    const badges = [
      {
        id: 'first-quiz',
        name: 'Quiz Starter',
        description: 'Complete your first quiz',
        icon: '🎯',
        points: 50,
        category: 'quiz',
        requirements: { action: 'quiz-complete', count: 1 }
      },
      {
        id: 'eco-warrior',
        name: 'Eco Warrior',
        description: 'Complete 10 daily challenges',
        icon: '🌱',
        points: 100,
        category: 'challenge',
        requirements: { action: 'challenge-complete', count: 10 }
      },
      {
        id: 'quiz-master',
        name: 'Quiz Master',
        description: 'Score 90%+ on 5 quizzes',
        icon: '🧠',
        points: 200,
        category: 'quiz',
        requirements: { action: 'quiz-complete', percentage: 90, count: 5 }
      },
      {
        id: 'streak-champion',
        name: 'Streak Champion',
        description: 'Maintain 30-day activity streak',
        icon: '🔥',
        points: 300,
        category: 'streak',
        requirements: { action: 'streak', count: 30 }
      },
      {
        id: 'level-master',
        name: 'Level Master',
        description: 'Reach level 10',
        icon: '⭐',
        points: 500,
        category: 'level',
        requirements: { action: 'level-up', count: 10 }
      },
      {
        id: 'eco-coder',
        name: 'Eco Coder',
        description: 'Complete 5 coding challenges',
        icon: '💻',
        points: 150,
        category: 'challenge',
        requirements: { action: 'challenge-complete', category: 'coding', count: 5 }
      }
    ];
    
    // Clear existing badges
    await Badge.deleteMany({});
    
    // Insert new badges
    await Badge.insertMany(badges);
    
    console.log('✅ Badges seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding badges:', error);
  }
};

// Seed all data
export const seedAllData = async () => {
  try {
    console.log('🌱 Starting data seeding...');
    
    await seedChallenges();
    await seedQuizzes();
    await seedBadges();
    
    console.log('✅ All data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
};

