import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Calendar, Download, Phone, Mail, Linkedin, Github } from "lucide-react";

const ContactCTA = () => {
  const handleScheduleCall = () => {
    window.open('https://calendly.com/prajwalvenkatv/30min', '_blank');
  };

  const handleDownloadResume = () => {
    window.open("/Prajwal_Venkatesh_Resume_.pdf", '_blank');
  };

  const handleEmailContact = () => {
    window.open('mailto:prajwalvenkatv@gmail.com', '_blank');
  };

  const handleLinkedIn = () => {
    window.open('http://www.linkedin.com/in/prajwal-venkat-v-9654a5180', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="glass glow-primary mb-4">
            🤝 Let's Connect
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Discuss <span className="text-gradient-hero">Your Next Project?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm actively seeking new opportunities to apply my data science expertise. 
            Let's schedule a call to discuss how I can drive value for your team.
          </p>
        </div>

        {/* Primary CTA Card */}
        <Card className="glass hover-glow max-w-4xl mx-auto mb-12">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gradient-ai">
                  Let's Schedule a Fit Check
                </h3>
                <p className="text-muted-foreground mb-6">
                  30-minute discovery call to discuss your data challenges and how my expertise 
                  in fraud detection, business intelligence, and ML can solve them.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary">Available Immediately</Badge>
                  <Badge variant="secondary">Remote/Hybrid Ready</Badge>
                  <Badge variant="secondary">Open to Relocation</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300"
                  onClick={handleScheduleCall}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Interview Call
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full glass hover-glow"
                  onClick={handleEmailContact}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Send Direct Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="glass hover-lift p-6 h-auto flex flex-col space-y-3"
            onClick={handleDownloadResume}
          >
            <Download className="h-8 w-8 text-primary" />
            <div className="text-center">
              <div className="font-semibold">Download Resume</div>
              <div className="text-xs text-muted-foreground">PDF Format</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="glass hover-lift p-6 h-auto flex flex-col space-y-3"
            onClick={() => window.open('tel:682-406-7259', '_blank')}
          >
            <Phone className="h-8 w-8 text-accent" />
            <div className="text-center">
              <div className="font-semibold">Quick Call</div>
              <div className="text-xs text-muted-foreground">(682) 406-7259</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="glass hover-lift p-6 h-auto flex flex-col space-y-3"
            onClick={handleLinkedIn}
          >
            <Linkedin className="h-8 w-8 text-primary" />
            <div className="text-center">
              <div className="font-semibold">LinkedIn</div>
              <div className="text-xs text-muted-foreground">Professional Network</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="glass hover-lift p-6 h-auto flex flex-col space-y-3"
            onClick={() => window.open('https://github.com/Prajwalv28', '_blank')}
          >
            <Github className="h-8 w-8 text-accent" />
            <div className="text-center">
              <div className="font-semibold">GitHub</div>
              <div className="text-xs text-muted-foreground">Code Portfolio</div>
            </div>
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-hero">24-48hrs</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-ai">100%</div>
              <div className="text-sm text-muted-foreground">Professional References</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-data">$1.6M+</div>
              <div className="text-sm text-muted-foreground">Proven Value Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;