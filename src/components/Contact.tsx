import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Users, 
  GraduationCap,
  Building,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Thank you for your interest!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({
      name: "",
      email: "",
      organization: "",
      role: "",
      message: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch for support",
      value: "hello@ecolearn.com",
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      color: "text-secondary"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters",
      value: "123 Green Street, Eco City",
      color: "text-success"
    }
  ];

  const benefits = [
    "Free trial for 30 days",
    "Dedicated support team",
    "Custom curriculum integration",
    "Teacher training included",
    "Progress analytics & reports",
    "Multi-language support"
  ];

  return (
    <section className="py-20 bg-nature-pattern">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient-primary">Get Started</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of educators and students making environmental education engaging and impactful. 
            Contact us today to start your eco-learning journey!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="bg-card shadow-nature border-0 animate-fade-in-up">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                Join Our Platform
              </CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll set up your account
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization">School/Organization</Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="Your school or organization"
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="Teacher, Student, Administrator..."
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your environmental education goals..."
                    rows={4}
                    className="border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  <Send className="w-5 h-5" />
                  Send Message & Join Platform
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>

              {/* Benefits List */}
              <div className="pt-6 border-t">
                <h4 className="font-semibold text-foreground mb-4">What you'll get:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info & Quick Actions */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {contactInfo.map((info, index) => (
                <Card key={index} className="group card-hover bg-card-gradient border-0 shadow-nature">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{info.title}</h4>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                      <p className="text-sm font-medium text-primary">{info.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Action Cards */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Card className="bg-card-gradient border-0 shadow-nature">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">For Educators</h4>
                      <p className="text-sm text-muted-foreground">Special pricing for schools</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10">
                    View Education Plans
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card-gradient border-0 shadow-nature">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Users className="w-8 h-8 text-secondary" />
                    <div>
                      <h4 className="font-semibold">For Students</h4>
                      <p className="text-sm text-muted-foreground">Free individual accounts</p>
                    </div>
                  </div>
                  <Button variant="playful" className="w-full">
                    Start Learning Free
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card-gradient border-0 shadow-nature">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Building className="w-8 h-8 text-success" />
                    <div>
                      <h4 className="font-semibold">For Organizations</h4>
                      <p className="text-sm text-muted-foreground">Enterprise solutions</p>
                    </div>
                  </div>
                  <Button variant="eco" className="w-full">
                    Schedule Demo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;