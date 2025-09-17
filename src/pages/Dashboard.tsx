import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Leaf, BookOpen, Target, Star, Award, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { progress, challenges, completeChallenge, awardPointsToUser } = useGame();
  const navigate = useNavigate();

  // Using challenges from game context

  const recentQuizzes = [
    { id: 1, title: 'Climate Change Basics', score: 85, maxScore: 100, completed: true },
    { id: 2, title: 'Renewable Energy', score: 92, maxScore: 100, completed: true },
    { id: 3, title: 'Ocean Conservation', score: 0, maxScore: 100, completed: false },
  ];

  // Using badges from game context

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-green-600">🌱 Greenverse</h1>
              <Badge variant="secondary">Level {user?.level || 1}</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => navigate('/leaderboard')} variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Leaderboard
              </Button>
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold">{user?.name}</p>
              </div>
              <Button onClick={logout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Points</p>
                  <p className="text-2xl font-bold">{progress.totalPoints}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-2xl font-bold">{progress.streak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Badges Earned</p>
                  <p className="text-2xl font-bold">{progress.badges.filter(b => b.earned).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Current Level</p>
                  <p className="text-2xl font-bold">{progress.level}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="challenges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="challenges">Daily Challenges</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="challenges">
            <div className="space-y-6">
              {/* Code Today Eco Button */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-xl">💻</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Code Today Eco</h3>
                        <p className="text-sm text-gray-600">Complete coding challenges with environmental focus</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+50 pts</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Coding</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="eco" 
                      size="lg"
                      onClick={() => {
                        // Award points for coding activity
                        awardPointsToUser(50, "Started coding with eco focus! 🌱");
                        // You can add more functionality here like opening a coding challenge
                      }}
                      className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Start Coding
                      <span className="ml-2">🚀</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Coding Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-xl mr-2">💻</span>
                    Coding Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {challenges.filter(c => c.category === 'coding').map((challenge) => (
                      <div key={challenge.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow bg-gradient-to-r from-blue-50 to-green-50">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => !challenge.completed && completeChallenge(challenge.id)}
                            className={`w-4 h-4 rounded-full ${challenge.completed ? 'bg-green-500' : 'bg-gray-300 hover:bg-gray-400'} ${!challenge.completed ? 'cursor-pointer' : ''} transition-colors`}
                          />
                          <div>
                            <span className={challenge.completed ? 'line-through text-gray-500' : 'text-gray-900 font-medium'}>{challenge.title}</span>
                            <p className="text-sm text-gray-600">{challenge.description}</p>
                          </div>
                        </div>
                        <Badge variant={challenge.completed ? 'default' : 'secondary'} className="bg-blue-100 text-blue-800">
                          +{challenge.points} pts
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Daily Eco Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="h-5 w-5 mr-2" />
                    Daily Eco Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {challenges.filter(c => c.category !== 'coding').map((challenge) => (
                      <div key={challenge.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => !challenge.completed && completeChallenge(challenge.id)}
                            className={`w-4 h-4 rounded-full ${challenge.completed ? 'bg-green-500' : 'bg-gray-300 hover:bg-gray-400'} ${!challenge.completed ? 'cursor-pointer' : ''} transition-colors`}
                          />
                          <span className={challenge.completed ? 'line-through text-gray-500' : 'text-gray-900'}>{challenge.title}</span>
                        </div>
                        <Badge variant={challenge.completed ? 'default' : 'secondary'}>
                          +{challenge.points} pts
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quizzes">
            <div className="space-y-6">
              {/* Quiz Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/quiz')}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <h3 className="font-semibold mb-2">Environment & Climate</h3>
                    <p className="text-sm text-gray-600 mb-4">Test your knowledge about climate change and environmental issues</p>
                    <Badge variant="secondary">6 Questions</Badge>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/quiz')}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="font-semibold mb-2">Energy & Resources</h3>
                    <p className="text-sm text-gray-600 mb-4">Learn about renewable energy and resource conservation</p>
                    <Badge variant="secondary">3 Questions</Badge>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/quiz')}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💻</span>
                    </div>
                    <h3 className="font-semibold mb-2">Eco-Coding</h3>
                    <p className="text-sm text-gray-600 mb-4">Sustainable programming and green technology</p>
                    <Badge variant="secondary">3 Questions</Badge>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/quiz')}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">♻️</span>
                    </div>
                    <h3 className="font-semibold mb-2">Waste & Recycling</h3>
                    <p className="text-sm text-gray-600 mb-4">Understanding waste management and recycling</p>
                    <Badge variant="secondary">3 Questions</Badge>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/quiz')}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💧</span>
                    </div>
                    <h3 className="font-semibold mb-2">Water Conservation</h3>
                    <p className="text-sm text-gray-600 mb-4">Water usage and conservation strategies</p>
                    <Badge variant="secondary">3 Questions</Badge>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/quiz')}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🦋</span>
                    </div>
                    <h3 className="font-semibold mb-2">Biodiversity</h3>
                    <p className="text-sm text-gray-600 mb-4">Wildlife conservation and ecosystem protection</p>
                    <Badge variant="secondary">2 Questions</Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Quiz Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Recent Quiz Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentQuizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{quiz.title}</h3>
                          {quiz.completed && (
                            <p className="text-sm text-gray-600">Score: {quiz.score}/{quiz.maxScore}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {quiz.completed ? (
                            <Badge variant="default">Completed</Badge>
                          ) : (
                            <Button size="sm" onClick={() => navigate('/quiz')}>Start Quiz</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="badges">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievement Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {progress.badges.map((badge, index) => (
                    <div key={index} className={`p-4 border rounded-lg text-center ${badge.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h3 className="font-medium">{badge.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                      {badge.earned && <Badge className="mt-2">Earned!</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Level Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Level {progress.level}</span>
                        <span>{progress.totalPoints}/1000 pts</span>
                      </div>
                      <Progress value={(progress.totalPoints % 1000) / 10} className="mt-2" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {1000 - (progress.totalPoints % 1000)} points to next level
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Challenges Completed</span>
                      <span className="text-sm font-medium">12/21</span>
                    </div>
                    <Progress value={57} />
                    <div className="flex justify-between">
                      <span className="text-sm">Quizzes Taken</span>
                      <span className="text-sm font-medium">3/5</span>
                    </div>
                    <Progress value={60} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;