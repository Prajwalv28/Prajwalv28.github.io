import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStackBanner from "@/components/TechStackBanner";
import SkillsVisualization from "@/components/SkillsVisualization";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import ProjectShowcase from "@/components/ProjectShowcase";
import Certifications from "@/components/Certifications";
import ContactCTA from "@/components/ContactCTA";
import AIChat from "@/components/AIChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <div id="about">
          <About />
        </div>
        <TechStackBanner />
        <div id="skills">
          <SkillsVisualization />
        </div>
        <div id="education">
          <Education />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="projects">
          <ProjectShowcase />
        </div>
        <div id="certifications">
          <Certifications />
        </div>
        <div id="contact">
          <ContactCTA />
        </div>
      </main>
      
      {/* AI Chat Assistant */}
      <AIChat />
    </div>
  );
};

export default Index;