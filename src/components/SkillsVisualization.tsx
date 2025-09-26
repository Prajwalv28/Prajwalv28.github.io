import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'ai' | 'data' | 'business';
  projects: number;
}

const skills: Skill[] = [
  { name: "Python", level: 95, category: 'technical', projects: 15 },
  { name: "SQL", level: 92, category: 'data', projects: 20 },
  { name: "Power BI", level: 88, category: 'data', projects: 12 },
  { name: "Tableau", level: 85, category: 'data', projects: 10 },
  { name: "Machine Learning", level: 90, category: 'ai', projects: 8 },
  { name: "Statistical Analysis", level: 88, category: 'data', projects: 15 },
  { name: "Business Intelligence", level: 90, category: 'business', projects: 18 },
  { name: "Data Analysis", level: 95, category: 'data', projects: 25 },
  { name: "ETL Tools", level: 80, category: 'technical', projects: 12 },
  { name: "A/B Testing", level: 82, category: 'business', projects: 8 },
  { name: "Fraud Detection", level: 92, category: 'ai', projects: 5 },
  { name: "Risk Analysis", level: 90, category: 'business', projects: 7 }
];

const categoryColors = {
  technical: 'primary',
  ai: 'ai-primary',
  data: 'data-viz',
  business: 'accent'
};

const SkillsVisualization = () => {
  const [animatedSkills, setAnimatedSkills] = useState<Skill[]>(
    skills.map(skill => ({ ...skill, level: 0 }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedSkills(skills);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getSkillsByCategory = (category: string) => 
    skills.filter(skill => skill.category === category);

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="glass glow-primary mb-4">
            📊 Skills & Expertise
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Technical <span className="text-gradient-data">Proficiency</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world expertise across the full data science and AI pipeline, 
            from data collection to production model deployment.
          </p>
        </div>

        {/* Overall Skills Chart */}
        <div className="mb-16">
          <Card className="glass hover-glow animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-gradient-hero">Core Competencies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {animatedSkills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="space-y-3 transform transition-all duration-300 hover:scale-105"
                    style={{ 
                      animation: `fadeIn 0.6s ease-out ${index * 100}ms both`
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{skill.name}</span>
                      <span className="font-bold">{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={animatedSkills[index].level} 
                        className="h-3 transition-all duration-1000 ease-out hover:shadow-glow"
                        style={{ 
                          animationDelay: `${index * 150}ms`,
                          transform: 'translateX(0)',
                          opacity: 1
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.entries({
            'Technical Stack': 'technical',
            'AI & ML': 'ai',
            'Data Science': 'data',
            'Business Impact': 'business'
          }).map(([title, category]) => {
            const categorySkills = getSkillsByCategory(category);
            const avgLevel = categorySkills.reduce((acc, skill) => acc + skill.level, 0) / categorySkills.length;
            
            return (
              <Card key={category} className="glass hover-lift">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl font-bold text-gradient-hero">
                      {Math.round(avgLevel)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      avg proficiency
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categorySkills.map((skill) => (
                      <div key={skill.name} className="flex justify-between items-center">
                        <span className="text-sm">{skill.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {skill.level}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievement Metrics */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            { label: "User Engagement", value: "100+", icon: "🚀" },
            { label: "Data Sources Integrated", value: "20+", icon: "🔗" },
            { label: "Team Presentations", value: "25+", icon: "🎓" }
          ].map((metric, index) => (
            <div 
              key={metric.label}
              className="text-center space-y-4 transform transition-all duration-500 hover:scale-110 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-2 animate-bounce">{metric.icon}</div>
              <div className="text-4xl font-bold text-gradient-ai">{metric.value}</div>
              <div className="text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsVisualization;