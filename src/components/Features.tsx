import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Target, 
  Trophy, 
  Users, 
  Award,
  ArrowRight
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Interactive Quizzes",
      description: "Engaging quizzes on environment & sustainability topics with instant feedback and explanations.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Target,
      title: "Daily Eco-Challenges",
      description: "Fun daily challenges like planting trees, saving water, and reducing waste to build eco-habits.",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Trophy,
      title: "Levels & Badges",
      description: "Unlock achievements, earn badges, and level up as you complete environmental learning modules.",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Users,
      title: "Friend Leaderboard",
      description: "Compete with friends and classmates on leaderboards to see who's the ultimate eco-warrior.",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn digital certificates and credentials to showcase your environmental knowledge and commitment.",
      color: "text-primary-dark",
      bgColor: "bg-primary-dark/10"
    }
  ];

  return (
    <section className="py-20 bg-nature-pattern">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Powerful Features</span>
            <br />
            for Eco-Learning
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive platform designed to make environmental education engaging, 
            interactive, and rewarding for students of all ages.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group card-hover bg-card-gradient border-0 shadow-nature animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center space-y-4">
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Action */}
                <div className="pt-4">
                  <Button variant="ghost" size="sm" className="group/btn">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button variant="eco" size="lg" className="shadow-lg">
            Explore All Features
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;