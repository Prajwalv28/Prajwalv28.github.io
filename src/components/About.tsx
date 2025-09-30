import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Lightbulb, Target, Rocket } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="glass glow-primary mb-4">
            ✨ My Journey
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            The Story Behind <span className="text-gradient-hero">The Data</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every algorithm tells a story. Here's mine from curiosity to impact.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Story */}
          <Card className="glass hover-glow mb-12 glow-primary">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-xl leading-relaxed mb-6">
                Every journey unfolds in its own rhythm, unexpected, beautiful, and shaped by the moments that move us forward.
                </p>

                <p className="text-xl leading-relaxed mb-6">
                For me, life has always moved like water: sometimes rushing with bold decisions, sometimes gentle and reflective, 
                always searching for new places to flow. Growing up between the vibrant energy of Bangalore and the wide skies of Texas, 
                I learned to listen deeply and adapt whether in a new country, a challenging role, or simply in the rhythm of a pool.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                Professionally, my mission goes beyond just crunching numbers. What started as a random curiosity, an experiment here, 
                a challenge accepted there, has led me to pursue a career I couldn’t have predicted. 
                Life, unlike data, rarely fits into neat patterns. But it’s this very unpredictability that fuels my curiosity 
                and pushes me to help others, whether it was protecting people from loss, guiding students with hands-on learning, 
                or simply making numbers feel human.
                </p>
                
                <p className="text-lg leading-relaxed">
                I believe true connection happens when we share our stories without pretenses. Whether you’re in tech or not, 
                a recruiter or a future teammate, I’m here to listen, learn, and build something valuable together.
                If you’re searching for someone who’s as passionate about people as about progress, someone who sees possibility in patterns,
                 who finds music and meaning in every day, then I hope my story sparks a conversation. I’d love to hear yours.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-hero rounded-lg glow-primary">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Human-Centered Analytics</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                To me, meaningful data science begins with people, not numbers. 
                I design every solution with empathy because real impact comes from understanding who’s behind the data and how their lives will change.
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-ai rounded-lg glow-ai">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Curious Innovator</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  From experimenting with new ML architectures to exploring emerging AI trends, 
                  I'm always pushing boundaries to find better solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-data rounded-lg glow-data">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Business Impact Focus</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Technical excellence means nothing without business value. I translate 
                  complex insights into actionable strategies that drive measurable results.
                </p>
              </CardContent>
            </Card>

            <Card className="glass hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-accent to-accent/70 rounded-lg glow-accent">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Growth Mindset</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Every project is a learning opportunity. I embrace challenges, 
                  learn from setbacks, and constantly evolve my skills to stay ahead.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Personal Touch */}
          <Card className="glass hover-glow mt-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-gradient-ai">Beyond the Code</h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Swimming is where I find peace and perspective. Each lap reminds me that progress isn’t just about speed, 
              but consistency and heart. Outside the pool, you’ll find me lost in my favorite music soundtracks and 
              writing poems turning reflections into words, and sometimes connecting with others in ways numbers never could.
              </p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="text-sm">Reflection Enthusiast</Badge>
                <Badge variant="secondary" className="text-sm">Mentor & Teacher</Badge>
                <Badge variant="secondary" className="text-sm">Swimmer & Seeker</Badge>
                <Badge variant="secondary" className="text-sm">Music Lover</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;