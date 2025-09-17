import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Medal, Crown, Shield, Zap, ArrowRight } from "lucide-react";
import ecoBadges from "@/assets/eco-badges.jpg";

const Gamification = () => {
  const achievements = [
    { icon: Trophy, name: "Eco Warrior", points: 500, color: "text-yellow-600" },
    { icon: Star, name: "Tree Hugger", points: 250, color: "text-green-600" },
    { icon: Medal, name: "Water Saver", points: 300, color: "text-blue-600" },
    { icon: Crown, name: "Climate Hero", points: 1000, color: "text-purple-600" },
    { icon: Shield, name: "Planet Protector", points: 750, color: "text-emerald-600" },
    { icon: Zap, name: "Energy Saver", points: 400, color: "text-orange-600" }
  ];

  const leaderboardData = [
    { rank: 1, name: "Sarah Chen", points: 2450, avatar: "👩‍🎓", badge: "🏆" },
    { rank: 2, name: "Alex Rodriguez", points: 2380, avatar: "👨‍🎓", badge: "🥈" },
    { rank: 3, name: "Maya Patel", points: 2290, avatar: "👩‍🎓", badge: "🥉" },
    { rank: 4, name: "David Kim", points: 2180, avatar: "👨‍🎓", badge: "" },
    { rank: 5, name: "Emma Johnson", points: 2050, avatar: "👩‍🎓", badge: "" }
  ];

  return (
    <section className="py-20 bg-nature-pattern">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Gamification</span>
            <br />
            That Motivates
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Level up your environmental knowledge with our comprehensive reward system designed to keep you engaged and motivated.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Achievements & Points */}
          <div className="space-y-8">
            {/* Points System */}
            <Card className="bg-card-gradient shadow-nature border-0 animate-fade-in-up">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Points System</h3>
                    <p className="text-muted-foreground">Earn points for every action</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Daily Quiz</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">+50 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Eco Challenge</span>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary">+100 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Complete Module</span>
                    <Badge variant="secondary" className="bg-success/10 text-success">+200 pts</Badge>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Your Progress</span>
                      <span className="text-sm text-muted-foreground">1,850 / 2,000 pts</span>
                    </div>
                    <Progress value={92.5} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">150 points to next level!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card className="bg-card-gradient shadow-nature border-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <img src={ecoBadges} alt="Environmental achievement badges" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="text-xl font-semibold">Achievement Badges</h3>
                    <p className="text-muted-foreground">Unlock & collect badges</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center group">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                      </div>
                      <p className="text-xs font-medium text-foreground">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.points} pts</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Leaderboard */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Card className="bg-card-gradient shadow-nature border-0">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-warning to-yellow-500 rounded-2xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Leaderboard</h3>
                      <p className="text-muted-foreground">Top eco-learners</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>

                <div className="space-y-4">
                  {leaderboardData.map((user, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-accent/50 ${
                        user.rank <= 3 ? 'bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10' : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          user.rank === 1 ? 'bg-yellow-500 text-white' :
                          user.rank === 2 ? 'bg-gray-400 text-white' :
                          user.rank === 3 ? 'bg-orange-500 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {user.rank}
                        </div>
                        
                        <div className="text-2xl">{user.avatar}</div>
                        
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.points.toLocaleString()} points</p>
                        </div>
                        
                        {user.badge && (
                          <div className="text-2xl">{user.badge}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t mt-6">
                  <Button variant="eco" className="w-full" size="lg">
                    Join Competition
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gamification;