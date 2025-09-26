import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink, Calendar, CheckCircle, Clock } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      title: "AWS Cloud Practitioner",
      organization: "Amazon Web Services",
      year: "2025",
      status: "completed",
      description: "Foundational understanding of AWS cloud services, architecture, and best practices",
      skills: ["Cloud Computing", "AWS Services", "Security", "Cost Optimization"],
      // verificationLink: "sample-link.com"
    },
    {
      title: "Oracle Cloud Infrastructure Foundations Associate",
      organization: "Oracle",
      year: "Expected Oct 2025",
      status: "in-progress", 
      description: "Comprehensive knowledge of Oracle Cloud Infrastructure services and solutions",
      skills: ["OCI Services", "Cloud Architecture", "Database Management", "Networking"],
      // verificationLink: "sample-link.com"
    }
  ];

  const achievements = [
    {
      title: "4.0 GPA - Master's Program",
      organization: "UT Arlington",
      year: "2023-2025",
      description: "Perfect academic performance in Data Science program",
      icon: "🎓"
    },
    {
      title: "$1.6M Cost Savings Achievement",
      organization: "Valley Infosystems",
      year: "2023",
      description: "Delivered measurable business impact through fraud detection optimization",
      icon: "💰"
    },
    {
      title: "Research Publication Contributor",
      organization: "UT Arlington",
      year: "2025",
      description: "Contributing to ML research with standardized evaluation frameworks",
      icon: "📄"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="glass glow-primary mb-4">
            🏆 Credentials & Recognition
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Certifications & <span className="text-gradient-ai">Achievements</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development backed by industry recognition
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-gradient-hero">
            Professional Certifications
          </h3>
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <Card 
                key={cert.title}
                className="glass hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Award className="h-6 w-6 text-accent" />
                        <CardTitle className="text-xl text-gradient-hero">
                          {cert.title}
                        </CardTitle>
                      </div>
                      <div className="text-muted-foreground font-semibold">
                        {cert.organization}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{cert.year}</span>
                        {cert.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-accent" />
                        ) : (
                          <Clock className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </div>
                    <Badge 
                      className={
                        cert.status === "completed" 
                          ? "bg-gradient-hero" 
                          : "bg-gradient-ai"
                      }
                    >
                      {cert.status === "completed" ? "Certified" : "In Progress"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="glass">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass hover-glow w-full"
                    // onClick={() => window.open(`https://sample-link.com`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Verify Certificate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center text-gradient-data">
            Key Achievements
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.title}
                className="glass hover-lift text-center animate-scale-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h4 className="font-bold text-lg text-gradient-ai">
                    {achievement.title}
                  </h4>
                  <div className="text-sm text-muted-foreground font-semibold">
                    {achievement.organization} • {achievement.year}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;