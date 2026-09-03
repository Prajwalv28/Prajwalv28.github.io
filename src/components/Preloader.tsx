import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "connecting to snowflake",
  "loading 6M tick records",
  "computing covariance matrix",
  "solving minimum variance",
];

const Preloader = ({ onDone }: { onDone?: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(100);
      setDone(true);
      onDone?.();
      return;
    }

    const start = performance.now();
    const DURATION = 2200;
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 2.2);
      setProgress(eased * 100);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          onDone?.();
        }, 260);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  const lineIndex = Math.min(Math.floor((progress / 100) * LINES.length), LINES.length - 1);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="w-[min(78vw,420px)]">
            <div className="flex items-end justify-between mb-4">
              <span className="hud-label">{LINES[lineIndex]}</span>
              <span className="hud-value text-4xl sm:text-5xl tabular-nums">
                {Math.round(progress)}
                <span className="text-lg text-muted-foreground">%</span>
              </span>
            </div>
            <div className="h-px w-full bg-border relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
