import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Download, Calendar, Mic, MicOff, Github, Linkedin, Phone } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import AnimatedAvatar from "./AnimatedAvatar";
import AnimatedRoles from "./AnimatedRoles";

const Hero = () => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isListening, setIsListening] = useState(false);
  
  const texts = [
    "Data Analyst & AI Innovator",
    "Business Analyst & Risk Analyst", 
    "Let's Analyze Tomorrow. Live!",
    "$1.6M Cost Savings Delivered"
  ];
  
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const typeText = async () => {
      const text = texts[textIndex];
      for (let i = 0; i <= text.length; i++) {
        setCurrentText(text.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      for (let i = text.length; i >= 0; i--) {
        setCurrentText(text.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      setTextIndex((prev) => (prev + 1) % texts.length);
    };

    typeText();
  }, [textIndex]);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice functionality will be implemented with Supabase integration
  };

  const handleChatOpen = () => {
    // AI Chat functionality will be implemented with Supabase integration
    console.log("Opening AI chat...");
  };

  const handleDownloadResume = () => {
    // Create and trigger download
    const link = document.createElement('a');
    link.href = 'public/Prajwal_Venkatesh_Resume_.pdf';
    link.download = 'Prajwal_Venkatesh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBookMeeting = () => {
    // Replace with your actual Calendly link
    window.open('https://calendly.com/prajwalvenkatv/30min', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/80 to-background" />
      
      {/* Floating AI Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full floating opacity-60" />
      <div className="absolute bottom-32 right-32 w-6 h-6 bg-accent rounded-full floating opacity-40" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-ai-primary rounded-full floating opacity-50" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Badge variant="outline" className="glass glow-primary">
                💼  Professional Portfolio
              </Badge>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                Hi, I'm <span className="text-gradient-hero">Prajwal</span>
              </h1>
              
              <div className="h-16 flex items-center">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gradient-ai">
                  {currentText}
                  <span className="animate-pulse">|</span>
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Data Analysis Professional with expertise in fraud detection, business intelligence, and ML model deployment. 
                Delivered $1.6M+ cost savings through automated dashboards and anomaly detection on 3M+ transactions.
              </p>
            </div>

            {/* Interactive CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-hero hover:shadow-glow transition-all duration-300 group"
                onClick={handleChatOpen}
              >
                <MessageCircle className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Start Conversation
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="glass hover-glow"
                onClick={handleVoiceToggle}
              >
                {isListening ? (
                  <Mic className="mr-2 h-5 w-5 text-accent animate-pulse" />
                ) : (
                  <MicOff className="mr-2 h-5 w-5" />
                )}
                Voice Assistant
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                className="hover-lift"
                onClick={handleDownloadResume}
              >
                <Download className="mr-2 h-5 w-5" />
                Get Resume PDF
              </Button>
              
              <Button 
                size="lg"
                className="bg-gradient-data hover:shadow-accent-glow transition-all duration-300"
                onClick={handleBookMeeting}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Interview
              </Button>
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Button 
                variant="outline" 
                size="sm"
                className="glass hover-glow"
                onClick={() => window.open('https://www.linkedin.com/in/prajwal-venkat-v-9654a5180', '_blank')}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="glass hover-glow"
                onClick={() => window.open('https://github.com/Prajwalv28', '_blank')}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="glass hover-glow"
                onClick={() => window.open('tel:682-406-7259', '_blank')}
              >
                <Phone className="mr-2 h-4 w-4" />
                (682) 406-7259
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="glass hover-glow"
                onClick={() => window.open('mailto:prajwalvenkatv@gmail.com', '_blank')}
              >
                ✉️ Contact Email
              </Button>
            </div>

            {/* Recruiter Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gradient-hero">4.0</div>
                <div className="text-sm text-muted-foreground">GPA Masters</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gradient-ai">$1.6M+</div>
                <div className="text-sm text-muted-foreground">Cost Savings</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gradient-data">3M+</div>
                <div className="text-sm text-muted-foreground">Transactions Analyzed</div>
              </div>
            </div>
          </div>

          {/* Animated Avatar & Skills */}
          <div className="relative flex flex-col items-center lg:items-end">
            {/* Animated Roles */}
            <AnimatedRoles />
            
            <div className="relative flex justify-center lg:justify-end">
              <AnimatedAvatar />
              
              {/* Status Indicator */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-card px-4 py-2 rounded-full glass border">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Available for Interviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;