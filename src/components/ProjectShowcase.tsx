import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Play, TrendingUp, Brain, Database } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
  tech: string[];
  category: 'ml' | 'analytics' | 'automation';
  metrics: {
    label: string;
    value: string;
    change: string;
  }[];
  demoAvailable: boolean;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: "fina",
    title: "Fina: AI Powered Credit Risk & Advisory System",
    description: "Fina is an innovative banking assistant platform designed to help financial teams make fast, safe, and informed decisions. Leveraging retrieval-augmented generation (RAG) and advanced machine learning, Fina streamlines credit risk assessment with conversational AI, domain-specific financial awareness, and real-time risk prediction powered by explainable SHAP visualizations.",
    impact: "30% risk reduction for clients",
    tech: ["Python", "Machine Learning", "RAG", "SHAP"],
    category: 'ml',
    metrics: [
      { label: "Top Risk Flagged", value: "2%", change: "+2%" },
      { label: "Evaluation Time Cut", value: "15%", change: "+15%" },
      { label: "Decision turnaround", value: "13%", change: "+13%" }
    ],
    demoAvailable: true,
    featured: true
  },
  {
    id: "vibesync",
    title: "VibeSync: AI-Driven Music Recommendation",
    description: "Intelligent music discovery platform using advanced ML algorithms to analyze user preferences, mood patterns, and social listening habits. Delivers hyper-personalized playlists with 90%+ user satisfaction rates.",
    impact: "90%+ user satisfaction rate",
    tech: ["Python", "Deep Learning", "Spotify API", "NLP"],
    category: 'ml',
    metrics: [
      { label: "Users", value: "200", change: "+50%" },
      { label: "Avg Rec Time", value: "2s", change: "-35%" },
      { label: "Engagement", value: "+40%", change: "+40%" }
    ],
    demoAvailable: true,
    featured: true
  },
  {
    id: "nyc-taxi-trip-duration",
    title: "NYC Taxi Trip Duration Prediction",
    description: "Custom deep learning and feature engineering pipeline to predict New York City taxi ride durations using spatial and temporal data. Multiple architectures and optimization techniques were compared to maximize predictive accuracy for ride-hailing and logistics use cases.",
    impact: "Reduced RMSLE to 0.5637, enabling accurate trip time estimates.",
    tech: ["Python", "Custom Neural Networks", "Feature Engineering", "Hyperparameter Tuning"],
    category: 'ml',
    metrics: [
      { label: "Test RMSLE", value: "0.5637", change: "best model (↓ error)" },
      { label: "Model Architectures Compared", value: "3", change: "+2 alternatives" },
      { label: "Features Engineered", value: "8+", change: "+4 new time/location features" }
    ],
    demoAvailable: false,
    featured: false
  },  
  {
    id: "netflix-analysis",
    title: "Netflix Content Analysis Dashboard",
    description: "Interactive Tableau dashboard analyzing Netflix's global content catalogue by genre, rating, release year, and geographic distribution. Highlights key viewing trends and platform growth patterns using intuitive data visualizations.",
    impact: "Provided actionable insights into top genres, regional content trends, and year-over-year additions to support business and marketing strategies.",
    tech: ["Tableau", "Data Visualization", "Geospatial Analysis"],
    category: "analytics",
    metrics: [
      { label: "Content Growth Rate", value: "19% YoY", change: "year-over-year increase" },
      { label: "Top Genre (Most Watched)", value: "Documentaries", change: "No. 1 genre" },
      { label: "Genre Diversity Index", value: "0.74 (Simpson's Index)", change: "catalogue variety" }
    ],
    demoAvailable: false,
    featured: false
  },
  {
    id: "railflow-reservation-system",
    title: "RailFlow Railway Reservation Analytics System",
    description: "End-to-end desktop application for simulating and analyzing train ticketing using a Python Tkinter GUI and SQLite database. Developed comprehensive features for booking, passenger and train management, and real-time ticket status analytics—including age segmentation and train-wise reporting—via custom SQL queries and a user-friendly dashboard.",
    impact: "Streamlined the process of managing railway reservations, improved ticket tracking accuracy, and enabled in-depth analysis of booking, passenger demographics, and operational efficiency.",
    tech: ["Python", "Tkinter", "SQLite", "SQL"],
    category: "analytics",
    "metrics": [
      { label: "Database Design", value: "4+ schemas", change: "Integrated booking, passenger, train, and status tables" },
      { label: "Query Automation", value: "7+ SQL queries", change: "Automated booking reports and analytics" },
      { label: "Process Optimization", value: "Real-time ticket and waitlist updates", change: "Boosted user/admin efficiency" }
    ],
    demoAvailable: false,
    featured: false
}
];

const categoryIcons = {
  ml: Brain,
  analytics: TrendingUp,
  automation: Database
};

const ProjectShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleDemoClick = (projectId: string) => {
    // Demo functionality will be implemented with Supabase integration
    console.log(`Opening demo for project: ${projectId}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/10 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="glass glow-accent mb-4">
            🚀 Featured Projects
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            AI Projects That <span className="text-gradient-ai">Drive Results</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world AI implementations delivering measurable business impact. 
            Each project showcases end-to-end data science and ML engineering expertise.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-3 p-2 bg-card rounded-2xl glass">
            {[
              { key: 'all', label: 'All Projects', icon: '🎯' },
              { key: 'ml', label: 'Machine Learning', icon: '🧠' },
              { key: 'analytics', label: 'Analytics', icon: '📊' },
              { key: 'automation', label: 'Automation', icon: '⚡' }
            ].map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "ghost"}
                className={`${selectedCategory === category.key ? 'bg-gradient-hero glow-primary' : 'hover-glow'} transition-all duration-300`}
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.icon} {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const CategoryIcon = categoryIcons[project.category];
            
            return (
              <Card 
                key={project.id}
                className={`glass hover-lift transition-all duration-500 ${project.featured ? 'glow-primary' : ''} ${hoveredProject === project.id ? 'scale-105' : ''}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-ai rounded-lg glow-ai">
                        <CategoryIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        {project.featured && (
                          <Badge variant="secondary" className="mt-1">
                            ⭐ Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Impact Highlight */}
                  <div className="p-4 bg-gradient-data rounded-lg glass">
                    <div className="text-sm font-semibold text-gradient-data mb-1">
                      Business Impact
                    </div>
                    <div className="text-lg font-bold">{project.impact}</div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center space-y-1">
                        <div className="text-2xl font-bold text-gradient-hero">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {metric.label}
                        </div>
                        <div className="text-xs text-accent font-semibold">
                          {metric.change}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <div className="text-sm font-semibold">Tech Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    {project.demoAvailable && (
                      <Button 
                        className="bg-gradient-ai hover:shadow-ai-glow transition-all duration-300 flex-1"
                        // onClick={() => window.open('https://sample-link.com/demo', '_blank')}
                        onClick={() => {
                          const demoUrls = {
                            'fina': 'https://finarag.streamlit.app',
                            'vibesync': 'https://vibesyncai.streamlit.app',
                            // 'nyc-taxi-trip-duration': 'https://sample-a-demo.sample-link.com',
                            // 'netflix-analysis': 'https://sample-b-demo.sample-link.com'
                          };
                          window.open(demoUrls[project.id as keyof typeof demoUrls], '_blank');
                        }}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Try AI Demo
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="glass hover-glow"
                      // onClick={() => window.open('https://github.com/sample-link', '_blank')}
                      onClick={() => {
                        const codeUrls = {
                          'fina': 'https://github.com/Prajwalv28/Fina-RAG-Assistant',
                          'vibesync': 'https://github.com/Prajwalv28/VibeSync',
                          'nyc-taxi-trip-duration': 'https://github.com/Prajwalv28/My_projects/tree/main/NYC%20TAXI%20TRIP%20DURATION',
                          'netflix-analysis': 'https://public.tableau.com/app/profile/prajwal.venkat1754/viz/NetflixAnalysis_17562755529400/Netflix',
                          'railflow-reservation-system': 'https://github.com/Prajwalv28/My_projects/tree/main/RailFlow'
                        };
                        window.open(codeUrls[project.id as keyof typeof codeUrls], '_blank');
                      }}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="glass hover-glow"
                      // onClick={() => window.open('https://sample-link.com', '_blank')}
                      onClick={() => {
                        const detailUrls = {
                          'fina': 'https://github.com/Prajwalv28/Fina-RAG-Assistant/blob/main/README.md',
                          'vibesync': 'https://github.com/Prajwalv28/VibeSync/blob/main/README.md',
                          'nyc-taxi-trip-duration': 'https://github.com/Prajwalv28/My_projects/blob/main/NYC%20TAXI%20TRIP%20DURATION/README.md',
                          'netflix-analysis': 'https://public.tableau.com/app/profile/prajwal.venkat1754/viz/NetflixAnalysis_17562755529400/Netflix',
                          'railflow-reservation-system': 'https://github.com/Prajwalv28/My_projects/blob/main/RailFlow/README.md'
                        };
                        window.open(detailUrls[project.id as keyof typeof detailUrls], '_blank');
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="glass p-8 rounded-3xl max-w-2xl mx-auto glow-primary">
            <h3 className="text-2xl font-bold mb-4">
              Want to see more projects or discuss implementations?
            </h3>
            <p className="text-muted-foreground mb-6">
              I can walk through the technical details 
              of any project that interests you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-hero hover:shadow-glow"
                onClick={() => {
                  // Show all projects by removing any filter
                  const projectsSection = document.getElementById('projects');
                  projectsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Full Portfolio
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass hover-glow"
                onClick={() => window.open('https://calendly.com/prajwalvenkatv/30min', '_blank')}
              >
                Schedule Technical Deep Dive
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;