import { Suspense, lazy, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowUpRight, MousePointer2 } from "lucide-react";
// Three.js + postprocessing is ~700kB; load it after first paint so the
// headline renders immediately rather than waiting on the WebGL bundle.
const HeroScene = lazy(() => import("./HeroScene"));
import { MaskReveal, WordReveal, Magnetic, Counter } from "./motion/Reveal";

const ROLES = ["Credit Risk ML", "Generative AI / RAG", "Anomaly Detection", "Quant Portfolio Systems"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.25], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background)/0.55) 0%, hsl(var(--background)/0.15) 35%, hsl(var(--background)/0.75) 82%, hsl(var(--background)) 100%)",
        }}
      />

      {/* corner HUD, real project telemetry */}
      <motion.div
        className="absolute left-6 top-24 z-10 hidden flex-col gap-4 sm:flex lg:left-12"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {[
          { l: "Sharpe", v: <Counter to={1.82} decimals={2} /> },
          { l: "Assets", v: <><Counter to={500} />+</> },
          { l: "Rebalance", v: <><Counter to={1.8} decimals={1} />s</> },
        ].map((s) => (
          <div key={s.l}>
            <div className="hud-label">{s.l}</div>
            <div className="hud-value text-lg">{s.v}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="absolute right-6 top-24 z-10 hidden text-right sm:block lg:right-12"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hud-label">Surface</div>
        <div className="hud-value flex items-center justify-end gap-1.5 text-lg">
          <MousePointer2 className="h-3.5 w-3.5" /> drag
        </div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"
      >
        <div className="mx-auto w-full max-w-7xl">
          <MaskReveal delay={1.1}>
            <span className="eyebrow">Data Scientist at JPMorgan Chase</span>
          </MaskReveal>

          <h1 className="mt-5 max-w-4xl text-[13vw] font-extrabold leading-[0.95] tracking-tight sm:text-[9vw] lg:text-[6.4rem]">
            <MaskReveal delay={1.25}>Prajwal Venkat</MaskReveal>
            <MaskReveal delay={1.38}>
              <span className="display-italic font-normal text-primary">Venkatesh</span>
            </MaskReveal>
          </h1>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <MaskReveal delay={1.6}>
                <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Over four years shipping production ML in regulated financial
                  environments, across credit risk, generative AI, and fraud.
                </p>
              </MaskReveal>

              <motion.div
                className="mt-5 flex items-center gap-2 font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.6 }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                <span className="text-muted-foreground">focus:</span>
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-primary"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Magnetic>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  See the work
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="/Prajwal_Venkatesh_Resume_.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur-lg transition-colors hover:border-primary hover:text-primary"
                >
                  <Download className="h-4 w-4" />
                  Résumé
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        <span className="hud-label">scroll</span>
        <motion.span
          className="h-8 w-px bg-gradient-to-b from-primary to-transparent"
          animate={{ scaleY: [0, 1, 0], transformOrigin: ["top", "top", "bottom"] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
