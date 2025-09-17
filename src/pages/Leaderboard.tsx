import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Crown, ArrowLeft, TrendingUp, Users, Star } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  points: number;
  level: number;
  streak: number;
  badges: number;
  avatar: string;
  lastActivity: string;
  hasStarted: boolean;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { progress } = useGame();
  const [activePlayers, setActivePlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading active players from a database
  useEffect(() => {
    const loadActivePlayers = () => {
      // Get players from localStorage (simulating a database)
      const storedPlayers = localStorage.getItem('activePlayers');
      let players: Player[] = storedPlayers ? JSON.parse(storedPlayers) : [];

      // Add some sample active players if none exist
      if (players.length === 0) {
        players = [
          {
            id: '1',
            name: 'Emma Green',
            points: 2450,
            level: 12,
            streak: 28,
            badges: 15,
            avatar: '👩‍🌾',
            lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            hasStarted: true
          },
          {
            id: '2',
            name: 'Alex Rivers',
            points: 2380,
            level: 11,
            streak: 25,
            badges: 13,
            avatar: '👨‍🔬',
            lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            hasStarted: true
          },
          {
            id: '3',
            name: 'Maya Forest',
            points: 2290,
            level: 11,
            streak: 22,
            badges: 12,
            avatar: '👩‍🎓',
            lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            hasStarted: true
          },
          {
            id: '4',
            name: 'Sam Ocean',
            points: 2100,
            level: 10,
            streak: 18,
            badges: 10,
            avatar: '👨‍💼',
            lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            hasStarted: true
          }
        ];
        localStorage.setItem('activePlayers', JSON.stringify(players));
      }

      // Add current user if they have started playing
      if (user && progress.totalPoints > 0) {
        const currentUser: Player = {
          id: user.id || 'current-user',
          name: user.name || 'You',
          points: progress.totalPoints,
          level: progress.level,
          streak: progress.streak,
          badges: progress.badges.filter(b => b.earned).length,
          avatar: '🌱',
          lastActivity: new Date().toISOString(),
          hasStarted: true
        };

        // Update or add current user
        const existingUserIndex = players.findIndex(p => p.id === currentUser.id);
        if (existingUserIndex >= 0) {
          players[existingUserIndex] = currentUser;
        } else {
          players.push(currentUser);
        }
      }

      // Filter only players who have started (points > 0) and sort by points
      const activePlayersOnly = players
        .filter(player => player.hasStarted && player.points > 0)
        .sort((a, b) => b.points - a.points)
        .map((player, index) => ({ ...player, rank: index + 1 }));

      setActivePlayers(activePlayersOnly);
      setLoading(false);
    };

    loadActivePlayers();
  }, [user, progress]);

  // Filter players by time period
  const getWeeklyLeaders = () => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return activePlayers.filter(player => 
      new Date(player.lastActivity) >= oneWeekAgo
    ).slice(0, 10);
  };

  const getMonthlyLeaders = () => {
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return activePlayers.filter(player => 
      new Date(player.lastActivity) >= oneMonthAgo
    ).slice(0, 10);
  };

  const weeklyLeaders = getWeeklyLeaders();
  const monthlyLeaders = getMonthlyLeaders();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Medal className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'bg-green-50 border-green-200';
    switch (rank) {
      case 1: return 'bg-yellow-50 border-yellow-200';
      case 2: return 'bg-gray-50 border-gray-200';
      case 3: return 'bg-amber-50 border-amber-200';
      default: return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/dashboard')} variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="ml-4">
            <h1 className="text-2xl font-bold flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
              Leaderboard
            </h1>
            <p className="text-gray-600">See how you rank among eco-warriors!</p>
          </div>
        </div>

        {/* User's Current Rank Card */}
        {progress.totalPoints > 0 ? (
          <Card className="mb-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Your Current Rank</h3>
                  <p className="text-green-100">Keep climbing the leaderboard!</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">
                    #{activePlayers.findIndex(p => p.name === (user?.name || 'You')) + 1 || '?'}
                  </div>
                  <div className="text-sm text-green-100">Out of {activePlayers.length} players</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Start Your Eco Journey!</h3>
                  <p className="text-orange-100">Complete challenges and quizzes to join the leaderboard</p>
                </div>
                <div className="text-right">
                  <Button 
                    onClick={() => navigate('/dashboard')} 
                    variant="secondary"
                    className="bg-white text-orange-600 hover:bg-orange-50"
                  >
                    Start Playing
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly Leaders</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Leaders</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  This Week's Top Performers
                  <Badge variant="secondary" className="ml-2">
                    {weeklyLeaders.length} active players
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading leaderboard...</p>
                  </div>
                ) : weeklyLeaders.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Players This Week</h3>
                    <p className="text-gray-500">Be the first to start playing and appear on the leaderboard!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {weeklyLeaders.map((leader) => {
                      const isCurrentUser = leader.name === (user?.name || 'You');
                      return (
                        <div
                          key={leader.id}
                          className={`flex items-center justify-between p-4 border rounded-lg ${getRankBg(leader.rank, isCurrentUser)}`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-10 h-10">
                              {getRankIcon(leader.rank)}
                            </div>
                            <div className="text-2xl">{leader.avatar}</div>
                            <div>
                              <h3 className="font-semibold flex items-center">
                                {leader.name}
                                {isCurrentUser && <Badge className="ml-2" variant="secondary">You</Badge>}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Level {leader.level} • {leader.streak} day streak
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              {leader.points.toLocaleString()} pts
                            </div>
                            <div className="text-sm text-gray-500">this week</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Monthly Champions
                  <Badge variant="secondary" className="ml-2">
                    {monthlyLeaders.length} active players
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading leaderboard...</p>
                  </div>
                ) : monthlyLeaders.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Players This Month</h3>
                    <p className="text-gray-500">Be the first to start playing and become a monthly champion!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {monthlyLeaders.map((leader) => {
                      const isCurrentUser = leader.name === (user?.name || 'You');
                      return (
                        <div
                          key={leader.id}
                          className={`flex items-center justify-between p-4 border rounded-lg ${getRankBg(leader.rank, isCurrentUser)}`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-10 h-10">
                              {getRankIcon(leader.rank)}
                            </div>
                            <div className="text-2xl">{leader.avatar}</div>
                            <div>
                              <h3 className="font-semibold flex items-center">
                                {leader.name}
                                {isCurrentUser && <Badge className="ml-2" variant="secondary">You</Badge>}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Level {leader.level} • {leader.badges} badges
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              {leader.points.toLocaleString()} pts
                            </div>
                            <div className="text-sm text-gray-500">this month</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievement Goals */}
        {progress.totalPoints > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>🎯 Your Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl mb-2">🥉</div>
                  <h3 className="font-semibold">Reach Top 3</h3>
                  <p className="text-sm text-gray-600">
                    {monthlyLeaders.length >= 3 
                      ? `Need ${(monthlyLeaders[2]?.points || 0) + 1}+ points`
                      : 'Be among the first 3 players!'
                    }
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl mb-2">🔥</div>
                  <h3 className="font-semibold">30-Day Streak</h3>
                  <p className="text-sm text-gray-600">
                    {30 - progress.streak > 0 
                      ? `${30 - progress.streak} more days to go!`
                      : 'Achieved! 🎉'
                    }
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl mb-2">⭐</div>
                  <h3 className="font-semibold">Level 10</h3>
                  <p className="text-sm text-gray-600">
                    {10 - progress.level > 0 
                      ? `${10 - progress.level} more levels!`
                      : 'Achieved! 🎉'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;