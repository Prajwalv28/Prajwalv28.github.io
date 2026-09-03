import { Button } from "@/components/ui/button";
import { Calendar, Download, Phone, Mail, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import { WordReveal, FadeUp, Magnetic } from "./motion/Reveal";

const QUICK_LINKS = [
  { icon: Download, label: "Résumé", sub: "PDF", onClick: () => window.open("/Prajwal_Venkatesh_Resume_.pdf", "_blank") },
  { icon: Phone, label: "Call", sub: "(682) 406-7259", onClick: () => window.open("tel:6824067259", "_blank") },
  { icon: Linkedin, label: "LinkedIn", sub: "Connect", onClick: () => window.open("https://www.linkedin.com/in/prajwal-venkat-v-9654a5180/", "_blank") },
  { icon: Github, label: "GitHub", sub: "Code", onClick: () => window.open("https://github.com/Prajwalv28", "_blank") },
];

const ContactCTA = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border/60">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeUp className="flex justify-center">
            <span className="eyebrow">Contact</span>
          </FadeUp>
          <h2 className="mt-5 mb-6 font-display display-italic text-4xl md:text-6xl leading-[1.1]">
            <WordReveal text="Let's build something worth shipping." />
          </h2>
          <p className="text-lg text-muted-foreground">
            Actively looking at Data Scientist roles at Fortune 500 financial services companies,
            and open to a good conversation about ML systems in general.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-9">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow"
              onClick={() => window.open("https://calendly.com/prajwalvenkatv/30min", "_blank")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a call
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass hover-glow"
              onClick={() => window.open("mailto:prajwalvenkat@itjobemails.com", "_blank")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email me
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16">
          {QUICK_LINKS.map((link, i) => (
            <motion.button
              key={link.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={link.onClick}
              className="glass hover-lift p-5 rounded-xl flex flex-col items-center gap-2 text-center hover:border-primary/50 transition-colors"
            >
              <link.icon className="h-5 w-5 text-primary" />
              <div className="text-sm font-semibold">{link.label}</div>
              <div className="text-xs text-muted-foreground font-mono">{link.sub}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
