import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Gamepad2, Gift, ArrowRight, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: BookOpen,
      title: "Learn",
      subtitle: "Discover & Explore",
      description: "Start with interactive lessons covering climate change, conservation, renewable energy, and sustainable living practices.",
      features: ["Interactive Videos", "Visual Learning", "Expert Content"]
    },
    {
      number: 2,
      icon: Gamepad2,
      title: "Play",
      subtitle: "Challenge & Compete",
      description: "Take fun quizzes, complete daily challenges, and compete with friends in our gamified learning environment.",
      features: ["Daily Quizzes", "Eco Challenges", "Friend Competitions"]
    },
    {
      number: 3,
      icon: Gift,
      title: "Earn Rewards",
      subtitle: "Achieve & Celebrate",
      description: "Unlock badges, climb leaderboards, and earn certificates as you progress through your environmental learning journey.",
      features: ["Digital Badges", "Certificates", "Leaderboard Rankings"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="text-gradient-primary">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our simple 3-step process makes environmental learning engaging and rewarding
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2 z-10">
                  <ArrowRight className="absolute -right-3 -top-2 w-5 h-5 text-primary" />
                </div>
              )}
              
              <Card className="relative card-hover bg-card-gradient border-0 shadow-nature animate-fade-in-up overflow-hidden"
                    style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-8 text-center space-y-6">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-primary font-semibold">
                        {step.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-2 pt-2">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center justify-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Ready to Start Your Eco-Learning Journey?</h3>
            <p className="text-muted-foreground">Join thousands of students making a difference</p>
            <Button variant="hero" size="lg" className="shadow-lg">
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;