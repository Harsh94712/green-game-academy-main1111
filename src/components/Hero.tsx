import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-environment.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/5 to-accent overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-hero-gradient opacity-10" />
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-gradient-hero">Learn, Play</span>
                <br />
                <span className="text-foreground">& Save the</span>
                <br />
                <span className="text-gradient-primary">Planet 🌍</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Join thousands of students in an exciting journey to learn about environmental conservation through interactive quizzes, challenges, and rewards!
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group">
                <Play className="w-5 h-5 group-hover:animate-pulse" />
                Play Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="border-primary/20 text-primary hover:bg-primary/10">
                Learn More
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Challenges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Children learning about environmental conservation in nature" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating achievement badge */}
            <div className="absolute -top-4 -right-4 bg-card p-4 rounded-2xl shadow-lg animate-pulse-glow">
              <div className="text-2xl">🌱</div>
              <div className="text-xs font-semibold text-success">+50 Points</div>
            </div>
            
            {/* Floating progress indicator */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-lg">
              <div className="text-xs font-semibold text-muted-foreground mb-2">Progress</div>
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;