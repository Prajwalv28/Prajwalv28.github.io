import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Master of Science in Data Science",
      school: "The University of Texas at Arlington",
      location: "Arlington, TX",
      period: "Aug 2023 – May 2025",
      gpa: "4.0/4.0",
      coursework: [
        "Big Data & Cloud Computing (Azure)",
        "Probability and Statistics", 
        "AI & Neural Networks",
        "Project Management"
      ],
      current: true
    },
    {
      degree: "Bachelor of Engineering in Electronics and Communication",
      school: "M S Ramaiah Institute of Technology",
      location: "Bengaluru, India",
      period: "Aug 2018 – Jun 2022",
      coursework: [
        "Digital Signal Processing",
        "Data Structures & Algorithms",
        "Engineering Mathematics",
        "Machine Learning"
      ],
      current: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="glass glow-primary mb-4">
            🎓 Academic Excellence
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Educational <span className="text-gradient-data">Foundation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rigorous academic preparation combining theoretical depth with practical application
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <Card 
              key={edu.school} 
              className={`glass hover-lift ${edu.current ? 'glow-primary' : 'hover-glow'} animate-slide-up`}
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl lg:text-2xl text-gradient-hero">
                      {edu.degree}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4" />
                        <span className="font-semibold">{edu.school}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {/* {edu.current && (
                      <Badge className="bg-gradient-ai mb-2">
                        Current
                      </Badge>
                    )} */}
                    {edu.gpa && (
                      <div className="text-2xl font-bold text-gradient-ai">
                        {edu.gpa}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Key Coursework:</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <Badge 
                        key={course} 
                        variant="secondary" 
                        className="glass"
                      >
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;