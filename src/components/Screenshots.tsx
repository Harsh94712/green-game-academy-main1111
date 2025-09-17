import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Monitor, 
  Tablet, 
  Play,
  ArrowRight,
  CheckCircle,
  Trophy,
  Target,
  BarChart3
} from "lucide-react";

const Screenshots = () => {
  const mockupData = [
    {
      title: "Interactive Quiz Interface",
      description: "Engaging multiple-choice questions with instant feedback and explanations",
      device: "desktop",
      icon: Monitor,
      features: ["Real-time scoring", "Detailed explanations", "Progress tracking"],
      gradient: "from-primary to-primary-light"
    },
    {
      title: "Daily Challenge Dashboard",
      description: "Track your eco-challenges and see your impact on the environment",
      device: "mobile",
      icon: Smartphone,
      features: ["Daily tasks", "Impact metrics", "Streak tracking"],
      gradient: "from-secondary to-secondary-light"
    },
    {
      title: "Achievement System",
      description: "Unlock badges and certificates as you progress through learning modules",
      device: "tablet",
      icon: Tablet,
      features: ["Digital badges", "Certificates", "Level progression"],
      gradient: "from-success to-primary"
    }
  ];

  const QuizMockup = () => (
    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="secondary" className="bg-primary/10 text-primary">Question 3 of 10</Badge>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="w-4 h-4" />
          <span>50 pts</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What is the most effective way to reduce plastic waste?</h3>
        
        <div className="space-y-3">
          {[
            "Use reusable bags and containers",
            "Buy more plastic products", 
            "Throw plastic in regular trash",
            "Burn plastic waste"
          ].map((option, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                index === 0 
                  ? 'border-success bg-success/10 text-success' 
                  : 'border-border hover:border-primary/30 hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  index === 0 ? 'border-success bg-success' : 'border-muted-foreground'
                }`}>
                  {index === 0 && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <span className="text-sm">{option}</span>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="eco" className="w-full mt-4">
          Next Question
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const ChallengeMockup = () => (
    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Today's Eco-Challenges</h3>
        <Badge variant="secondary" className="bg-secondary/10 text-secondary">3 Active</Badge>
      </div>
      
      <div className="space-y-4">
        {[
          { task: "Take a 5-minute shower", progress: 100, points: 50, status: "complete" },
          { task: "Use reusable water bottle", progress: 75, points: 30, status: "progress" },
          { task: "Plant a small herb", progress: 0, points: 100, status: "pending" }
        ].map((challenge, index) => (
          <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{challenge.task}</span>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">+{challenge.points}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    challenge.status === 'complete' ? 'bg-success' :
                    challenge.status === 'progress' ? 'bg-secondary' : 'bg-muted'
                  }`}
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{challenge.progress}%</span>
            </div>
          </div>
        ))}
        
        <Button variant="playful" className="w-full mt-4">
          View All Challenges
        </Button>
      </div>
    </div>
  );

  const AchievementMockup = () => (
    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-warning to-yellow-500 rounded-full flex items-center justify-center">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Congratulations! 🎉</h3>
        <p className="text-sm text-muted-foreground">You've unlocked a new badge</p>
      </div>
      
      <div className="space-y-4">
        <div className="text-center p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20">
          <div className="text-2xl mb-2">🌱</div>
          <h4 className="font-semibold text-success">Eco Warrior</h4>
          <p className="text-xs text-muted-foreground">Completed 10 eco-challenges</p>
        </div>
        
        <div className="grid grid-cols-3 gap-3 pt-2">
          {[
            { icon: "🏆", name: "Champion", unlocked: true },
            { icon: "🌍", name: "Planet Saver", unlocked: true },
            { icon: "💧", name: "Water Guardian", unlocked: false },
          ].map((badge, index) => (
            <div key={index} className={`text-center p-3 rounded-lg ${
              badge.unlocked ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30 border border-muted'
            }`}>
              <div className={`text-lg mb-1 ${badge.unlocked ? 'grayscale-0' : 'grayscale'}`}>
                {badge.icon}
              </div>
              <p className={`text-xs ${badge.unlocked ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {badge.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See Our Platform <span className="text-gradient-primary">In Action</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Take a peek at our intuitive interface designed to make environmental learning engaging, 
            interactive, and rewarding for students of all ages.
          </p>
        </div>

        {/* Mockups Grid */}
        <div className="space-y-16">
          {mockupData.map((mockup, index) => (
            <div 
              key={index} 
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 animate-fade-in-up ${
                index % 2 === 1 ? 'lg:col-start-2' : ''
              }`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${mockup.gradient} rounded-2xl flex items-center justify-center`}>
                    <mockup.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary capitalize">
                    {mockup.device} View
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-foreground">
                    {mockup.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {mockup.description}
                  </p>
                </div>
                
                {/* Features List */}
                <div className="space-y-3">
                  {mockup.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                    <Play className="w-4 h-4" />
                    Try Interactive Demo
                  </Button>
                </div>
              </div>

              {/* Mockup */}
              <div className={`animate-fade-in-up ${
                index % 2 === 1 ? 'lg:col-start-1' : ''
              }`} style={{ animationDelay: `${index * 0.2 + 0.1}s` }}>
                <div className="relative">
                  {/* Device Frame */}
                  <div className={`relative p-6 bg-gradient-to-br ${mockup.gradient} rounded-3xl shadow-2xl`}>
                    <div className="bg-background rounded-2xl p-4 shadow-inner">
                      {/* Render different mockups based on index */}
                      {index === 0 && <QuizMockup />}
                      {index === 1 && <ChallengeMockup />}
                      {index === 2 && <AchievementMockup />}
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-success rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center animate-float">
                    <BarChart3 className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <Card className="bg-card-gradient shadow-nature border-0 max-w-2xl mx-auto">
            <CardContent className="p-8 text-center space-y-6">
              <h3 className="text-2xl font-bold">Ready to Experience It Yourself?</h3>
              <p className="text-muted-foreground">
                Join thousands of students already learning and having fun with our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  <Play className="w-5 h-5" />
                  Try Free Demo
                </Button>
                <Button variant="outline" size="lg" className="border-primary/20 text-primary hover:bg-primary/10">
                  Schedule Walkthrough
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Screenshots;