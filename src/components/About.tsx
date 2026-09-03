import { Heart, Lightbulb, Target, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { WordReveal, FadeUp, Parallax } from "./motion/Reveal";

const VALUES = [
  {
    icon: Heart,
    title: "Human-Centered Analytics",
    body: "Meaningful data science begins with people, not numbers. I design every solution with empathy, because real impact comes from understanding who is behind the data.",
  },
  {
    icon: Lightbulb,
    title: "Curious Innovator",
    body: "From experimenting with new ML architectures to exploring emerging AI trends, I am always pushing to find better solutions.",
  },
  {
    icon: Target,
    title: "Business Impact Focus",
    body: "Technical excellence means nothing without business value. I translate complex insights into strategies that drive measurable results.",
  },
  {
    icon: Rocket,
    title: "Growth Mindset",
    body: "Every project is a learning opportunity. I embrace challenges, learn from setbacks, and constantly evolve.",
  },
];

const About = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <FadeUp>
            <span className="eyebrow">About</span>
          </FadeUp>
          <p className="mt-5 font-display display-italic text-3xl md:text-5xl leading-[1.15]">
            <WordReveal text="Life, unlike data, rarely fits into neat patterns, and that is exactly what keeps me curious." />
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 max-w-5xl">
          <FadeUp delay={0.1} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Growing up between the energy of Bangalore and the wide skies of Texas, I learned to
              listen deeply and adapt, whether to a new country, a challenging role, or the rhythm of a pool.
            </p>
            <p>
              What started as curiosity, an experiment here and a challenge accepted there, became a
              career I could not have predicted. It is the unpredictability of real problems that keeps
              me engaged: protecting people from loss, guiding others through practical learning, or simply
              making numbers feel human.
            </p>
            <p>
              I am here to listen, learn, and build something valuable together, whether you are a
              recruiter, a future teammate, or just someone who sees possibility in patterns too.
            </p>

            <div className="pt-6 border-t border-border/60">
              <div className="hud-label mb-3">Beyond the work</div>
              <p className="text-base">
                Swimming is where I find peace and perspective. Each lap is a reminder that progress is
                about consistency, not just speed. Outside the pool: music, and turning reflections into words.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5 content-start">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="group p-5 rounded-xl border border-border/60 bg-card/60 dark:bg-white/[0.03] backdrop-blur-lg hover:border-primary/50 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <v.icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <span className="index-num">{String(i).padStart(2, "0")}</span>
                </div>
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
