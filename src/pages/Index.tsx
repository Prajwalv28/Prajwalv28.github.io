import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TechStackBanner from "@/components/TechStackBanner";
import About from "@/components/About";
import ProjectShowcase from "@/components/ProjectShowcase";
import Experience from "@/components/Experience";
import SkillsVisualization from "@/components/SkillsVisualization";
import Certifications from "@/components/Certifications";
import ContactCTA from "@/components/ContactCTA";
import ThresholdLab from "@/components/ThresholdLab";
import CommandPalette from "@/components/CommandPalette";
import AIChat from "@/components/AIChat";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import { CustomCursor, ScrollProgress, FilmOverlay } from "@/components/Chrome";

const Index = () => {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <FilmOverlay />
      <CommandPalette />

      <div className="atmosphere" aria-hidden="true" />

      <div className="relative z-[1] min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <TechStackBanner />
          <section id="about">
            <About />
          </section>
          <ProjectShowcase />
          <ThresholdLab />
          <section id="experience">
            <Experience />
          </section>
          <section id="skills">
            <SkillsVisualization />
          </section>
          <Certifications />
          <section id="contact">
            <ContactCTA />
          </section>
        </main>
        <AIChat />
      </div>
    </SmoothScroll>
  );
};

export default Index;
