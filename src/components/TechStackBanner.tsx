const TICKER_ITEMS: { t: string; d: "up" | "down" }[] = [
  { t: "PYTH", d: "up" },
  { t: "XGB", d: "up" },
  { t: "LGBM", d: "up" },
  { t: "PYTORCH", d: "up" },
  { t: "SPARK", d: "up" },
  { t: "SNFLK", d: "down" },
  { t: "DBRX", d: "up" },
  { t: "AIRFLW", d: "up" },
  { t: "KAFKA", d: "up" },
  { t: "AWS", d: "up" },
  { t: "DOCKR", d: "up" },
  { t: "MLFLOW", d: "down" },
  { t: "LANGCHAIN", d: "up" },
  { t: "RAG", d: "up" },
  { t: "SQL", d: "up" },
  { t: "PBI", d: "up" },
];

const STATS: { to: number; suffix: string; label: string }[] = [
  { to: 4, suffix: "+", label: "Years Experience" },
  { to: 95, suffix: "M+", label: "Lending Records Modeled" },
  { to: 3, suffix: "×", label: "Faster RAG Research" },
  { to: 25, suffix: "×", label: "Faster Rebalancing" },
];

import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import { Counter } from "./motion/Reveal";

const TechStackBanner = () => {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  // Ticker leans into the scroll, a small physical cue that the page
  // has weight. Clamped so it never becomes a gimmick.
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 220, damping: 42, mass: 0.4 });
  const skewX = useTransform(smooth, [-2200, 0, 2200], [6, 0, -6], { clamp: true });

  return (
    <section className="border-y border-border/60 bg-card/70 dark:bg-card/40 overflow-hidden">
      <div className="py-4 overflow-hidden">
        <motion.div className="ticker-row skew-target" style={{ skewX }}>
          {doubled.map((item, i) => (
            <span
              key={i}
              className="font-mono text-sm px-6 whitespace-nowrap border-r border-border/50 flex items-center gap-2"
            >
              <b className="font-semibold text-foreground">{item.t}</b>
              <span className={item.d === "up" ? "text-gain" : "text-loss"}>
                {item.d === "up" ? "▲" : "▼"}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="hud-value text-3xl sm:text-4xl tabular-nums">
              <Counter to={s.to} suffix={s.suffix} />
            </div>
            <div className="hud-label mt-2">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStackBanner;
