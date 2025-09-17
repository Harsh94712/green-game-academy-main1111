import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Grade 8 Student",
      avatar: "👩‍🎓",
      rating: 5,
      text: "This platform made learning about the environment so much fun! I never thought I'd enjoy studying climate change, but the quizzes and challenges keep me engaged. I've already earned 5 badges!",
      achievement: "Eco Warrior Badge"
    },
    {
      name: "Mr. David Chen",
      role: "Environmental Science Teacher",
      avatar: "👨‍🏫",
      rating: 5,
      text: "As an educator, I'm impressed by how this platform combines learning with gamification. My students are more motivated than ever to learn about sustainability. The progress tracking is excellent.",
      achievement: "Used by 150+ students"
    },
    {
      name: "Emma Rodriguez", 
      role: "High School Student",
      avatar: "👩‍🎓",
      rating: 5,
      text: "The daily eco-challenges have actually changed my habits at home! I'm now more conscious about water usage and recycling. Plus, competing with my friends makes it even more exciting.",
      achievement: "Planet Protector Level"
    },
    {
      name: "Ms. Lisa Park",
      role: "Elementary Teacher",
      avatar: "👩‍🏫", 
      rating: 5,
      text: "My younger students love the interactive quizzes and colorful badges. It's amazing how they retain information better when it's presented in a fun, game-like format. Highly recommended!",
      achievement: "Teacher of the Month"
    },
    {
      name: "Alex Thompson",
      role: "Grade 10 Student",
      avatar: "👨‍🎓",
      rating: 5,
      text: "I'm usually not into environmental stuff, but this platform changed my mind completely. The leaderboard feature made me want to learn more to beat my friends. Now I'm genuinely interested in sustainability!",
      achievement: "Climate Hero Badge"
    },
    {
      name: "Dr. Maria Santos",
      role: "School Principal",
      avatar: "👩‍💼",
      rating: 5,
      text: "We've seen a remarkable improvement in environmental awareness across our school since implementing this platform. Students are not just learning, but actively participating in eco-friendly initiatives.",
      achievement: "School-wide Implementation"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-gradient-primary">Community</span> Says
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover how students and teachers are transforming their approach to environmental education through our platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group card-hover bg-card-gradient border-0 shadow-nature animate-fade-in-up h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary/30 group-hover:text-primary/50 transition-colors" />
                </div>
                
                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                  "{testimonial.text}"
                </p>
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                    />
                  ))}
                </div>
                
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                {/* Achievement Badge */}
                <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-xs font-medium text-primary text-center">
                    🏆 {testimonial.achievement}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-primary mb-2">98%</div>
            <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-primary mb-2">50K+</div>
            <p className="text-sm text-muted-foreground">Happy Students</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-primary mb-2">2K+</div>
            <p className="text-sm text-muted-foreground">Teachers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-primary mb-2">500+</div>
            <p className="text-sm text-muted-foreground">Schools</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;