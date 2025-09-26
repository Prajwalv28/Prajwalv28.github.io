import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp, Users, DollarSign } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Research Assistant",
      company: "The University of Texas at Arlington",
      location: "Arlington, TX",
      period: "Jul 2025 – Present",
      type: "Research",
      achievements: [
        "Accelerated research cycles by 15% analyzing 30+ machine learning papers",
        "Created standardized evaluation frameworks for $200K research initiative",
        "Built Python-based experiment pipelines with automated evaluation",
        "Supported 5-member cross-functional team on ML algorithm testing",
        "Reduced validation error from 20 to 5 per project"
      ],
      metrics: { efficiency: "+15%", budget: "$200K", papers: "30+" },
      current: true
    },
    {
      title: " Data Analyst - GTA",
      company: "The University of Texas at Arlington", 
      location: "Arlington, TX",
      period: "Aug 2024 – Jun 2025",
      type: "Academic",
      achievements: [
        "Delivered 20% operational efficiency gains analyzing 800+ student records",
        "Generated insights informing $50K budget reallocation towards tutoring",
        "Boosted student engagement 25% building real-time KPI dashboards in Tableau",
        "Improved assessment outcomes 40% delivering 12+ workshops to 80+ participants"
      ],
      metrics: { efficiency: "+20%", engagement: "+25%", outcomes: "+40%" },
      current: false
    },
    {
      title: "Data Scientist",
      company: "Valley Infosystems",
      location: "Bangalore, India", 
      period: "Oct 2022 – May 2023",
      type: "Industry",
      achievements: [
        "Achieved $1.6M+ annual cost savings with anomaly detection models",
        "Processed 3M+ transactions, reducing false positives by 18%",
        "Improved AUC-ROC from 0.81 to 0.89 through model optimization",
        "Saved 15 analyst hours weekly automating business processes",
        "Reduced fraud response time 10% deploying Power BI risk dashboards"
      ],
      metrics: { savings: "$1.6M+", transactions: "3M+", efficiency: "+18%" },
      current: false
    },
    {
      title: "Machine Learning Intern",
      company: "Suvidha Foundation",
      location: "Nagpur, India",
      period: "Oct 2021 – Nov 2021", 
      type: "Internship",
      achievements: [
        "Sorted and categorized 42,000+ botanical images for product development",
        "Achieved 80.9% accuracy in automated classification",
        "Improved detection accuracy 22% developing CNN models",
        "Validated model readiness for production deployment"
      ],
      metrics: { images: "42K+", accuracy: "80.9%", improvement: "+22%" },
      current: false
    },
    {
      title: "Machine Learning Intern",
      company: "Verzeo",
      location: "Bangalore, India",
      period: "May 2021 – Jun 2021", 
      type: "Internship",
      achievements: [
        "Built sentiment classification models using regression techniques",
        "Developed digit classification models, increasing accuracy by 18%",
        "Automated data wrangling, preprocessing, and cleaning in Python, reducing errors by 15%",
        "Saved 6 hours weekly by eliminating manual tasks"
      ],
      metrics: { saved: "+6 hrs", accuracy: "+18%", reduction: "-15%" },
      current: false
    }
  ];

  const roleTypes = {
    "Research": "bg-gradient-ai",
    "Academic": "bg-gradient-data", 
    "Industry": "bg-gradient-hero",
    "Internship": "bg-gradient-data",
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="glass glow-primary mb-4">
            💼 Professional Journey
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Career <span className="text-gradient-hero">Evolution</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From research innovation to business impact - a story of continuous growth and measurable results
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div 
              key={`${exp.company}-${exp.title}`}
              className={`relative timeline-item`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline Line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-primary to-transparent" />
              )}
              
              {/* Experience Card */}
              <div className="flex gap-6">
                {/* Timeline Dot */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold shadow-glow hover:scale-110 transition-transform duration-300">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Content */}
                <Card className={`flex-1 glass hover-lift group ${exp.current ? 'glow-primary' : 'hover-glow'}`}>
                  <CardContent className="p-8 relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardHeader className="relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <CardTitle className="text-xl lg:text-2xl text-gradient-hero group-hover:scale-105 transition-transform duration-300">
                              {exp.title}
                            </CardTitle>
                            {exp.current && (
                              <Badge className="bg-gradient-ai">
                                Current
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-muted-foreground">
                            <span className="font-semibold text-lg">{exp.company}</span>
                            <Badge className={`${roleTypes[exp.type]} text-white`}>
                              {exp.type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{exp.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{exp.period}</span>
                            </div>
                          </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="flex flex-wrap gap-4 lg:text-right">
                          {Object.entries(exp.metrics).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-lg font-bold text-gradient-ai">{value}</div>
                              <div className="text-xs text-muted-foreground capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="space-y-3">
                        {exp.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <TrendingUp className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-foreground leading-relaxed">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Impact Summary */}
        <div className="mt-16 grid md:grid-cols-4 gap-8">
          <div className="text-center space-y-2 animate-scale-in">
            <DollarSign className="h-8 w-8 mx-auto text-accent" />
            <div className="text-3xl font-bold text-gradient-hero">$1.6M+</div>
            <div className="text-sm text-muted-foreground">Total Cost Savings</div>
          </div>
          <div className="text-center space-y-2 animate-scale-in" style={{ animationDelay: "200ms" }}>
            <Users className="h-8 w-8 mx-auto text-primary" />
            <div className="text-3xl font-bold text-gradient-ai">80+</div>
            <div className="text-sm text-muted-foreground">People Trained</div>
          </div>
          <div className="text-center space-y-2 animate-scale-in" style={{ animationDelay: "400ms" }}>
            <TrendingUp className="h-8 w-8 mx-auto text-data-viz" />
            <div className="text-3xl font-bold text-gradient-data">40%</div>
            <div className="text-sm text-muted-foreground">Max Efficiency Gain</div>
          </div>
          <div className="text-center space-y-2 animate-scale-in" style={{ animationDelay: "600ms" }}>
            <Calendar className="h-8 w-8 mx-auto text-accent" />
            <div className="text-3xl font-bold text-gradient-hero">2+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;