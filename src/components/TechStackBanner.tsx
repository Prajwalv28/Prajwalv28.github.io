import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import pythonLogo from "@/assets/tech-logos/python.svg";
import mysqlLogo from "@/assets/tech-logos/mysql.svg";
import awsLogo from "@/assets/tech-logos/aws.svg";
import azureLogo from "@/assets/tech-logos/azure.svg";
import tensorflowLogo from "@/assets/tech-logos/tensorflow.svg";
import rLogo from "@/assets/tech-logos/r.svg";
import powerbiLogo from "@/assets/tech-logos/powerbi.svg";
import tableauLogo from "@/assets/tech-logos/tableau.svg";
import gitLogo from "@/assets/tech-logos/git.svg";
import sklearnLogo from "@/assets/tech-logos/sklearn.svg";
import pandasLogo from "@/assets/tech-logos/pandas.svg";
import pytorchLogo from "@/assets/tech-logos/pytorch.svg";
import excelLogo from "@/assets/tech-logos/excel.svg";

const techStacks = [
  { name: "Python", category: "language", color: "bg-gradient-hero", logo: pythonLogo },
  { name: "SQL", category: "database", color: "bg-gradient-data", logo: mysqlLogo },
  { name: "R", category: "language", color: "bg-gradient-ai", logo: rLogo },
  { name: "Power BI", category: "visualization", color: "bg-gradient-hero", logo: powerbiLogo },
  { name: "Tableau", category: "visualization", color: "bg-gradient-data", logo: tableauLogo },
  { name: "Excel", category: "tool", color: "bg-gradient-ai", logo: excelLogo },
  { name: "AWS", category: "cloud", color: "bg-gradient-hero", logo: awsLogo },
  { name: "Azure", category: "cloud", color: "bg-gradient-data", logo: azureLogo },
  { name: "MySQL", category: "database", color: "bg-gradient-ai", logo: mysqlLogo },
  { name: "Git", category: "tool", color: "bg-gradient-hero", logo: gitLogo },
  { name: "Scikit-learn", category: "ml", color: "bg-gradient-data", logo: sklearnLogo },
  { name: "TensorFlow", category: "ml", color: "bg-gradient-ai", logo: tensorflowLogo },
  { name: "Pandas", category: "ml", color: "bg-gradient-hero", logo: pandasLogo },
  { name: "PyTorch", category: "ml", color: "bg-gradient-data", logo: pytorchLogo }
];

const TechStackBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('tech-stack-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="tech-stack-section" className="py-16 bg-gradient-to-r from-background via-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="glass glow-primary mb-4">
            🛠️ Technology Stack
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-gradient-hero">Tech Stack</span> Mastery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Production-ready expertise across the modern data science ecosystem
          </p>
        </div>

        <Card className="glass hover-glow">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {techStacks.map((tech, index) => (
                <div
                  key={tech.name}
                  className={`group relative transform transition-all duration-500 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <div className={`
                    relative p-4 rounded-2xl ${tech.color} 
                    hover:scale-110 transition-all duration-300
                    text-white font-semibold text-center
                    hover:shadow-glow cursor-pointer
                    flex flex-col items-center space-y-2
                    group-hover:rotate-3
                  `}>
                    {tech.logo && (
                      <div className="text-center">
                        {tech.logo.endsWith('.svg') ? (
                          <img 
                            src={tech.logo} 
                            alt={`${tech.name} logo`} 
                            className="w-6 h-6 object-contain filter brightness-0 invert mx-auto"
                          />
                        ) : (
                          <span className="text-xl">{tech.logo}</span>
                        )}
                      </div>
                    )}
                    <div className="text-xs">{tech.name}</div>
                    <div className="text-xs opacity-70 capitalize">
                      {tech.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <div className="text-center space-y-2 animate-scale-in">
            <div className="text-2xl font-bold text-gradient-hero">2+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center space-y-2 animate-scale-in" style={{ animationDelay: "200ms" }}>
            <div className="text-2xl font-bold text-gradient-ai">$1.6M+</div>
            <div className="text-sm text-muted-foreground">Cost Savings</div>
          </div>
          <div className="text-center space-y-2 animate-scale-in" style={{ animationDelay: "400ms" }}>
            <div className="text-2xl font-bold text-gradient-data">60+</div>
            <div className="text-sm text-muted-foreground">Analyst hours saved monthly</div>
          </div>
          <div className="text-center space-y-2 animate-scale-in" style={{ animationDelay: "600ms" }}>
            <div className="text-2xl font-bold text-gradient-hero">40%</div>
            <div className="text-sm text-muted-foreground">Efficiency Improvements</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackBanner;