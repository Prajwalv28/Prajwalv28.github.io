import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

/**
 * Switching theme isn't a flip here, it's a sunrise/sunset. A warm
 * circular wipe expands from the toggle, the theme swaps behind it, then
 * the wipe clears. Sells the golden-hour ↔ midnight concept.
 */
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [wipe, setWipe] = useState<{ x: number; y: number; toLight: boolean } | null>(null);

  useEffect(() => setMounted(true), []);

  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const next = resolvedTheme === "light" ? "dark" : "light";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        setTheme(next);
        return;
      }

      const r = e.currentTarget.getBoundingClientRect();
      setWipe({
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
        toLight: next === "light",
      });

      // swap theme once the wipe has covered the viewport
      window.setTimeout(() => setTheme(next), 380);
      window.setTimeout(() => setWipe(null), 1100);
    },
    [resolvedTheme, setTheme]
  );

  if (!mounted) return null;

  const isLight = resolvedTheme === "light";
  const radius = Math.hypot(window.innerWidth, window.innerHeight) * 1.1;

  return (
    <>
      <button
        onClick={handleToggle}
        aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
        className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 dark:bg-white/5 backdrop-blur-lg transition-colors hover:border-primary"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLight ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="h-4 w-4 text-primary" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="h-4 w-4 text-primary" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {wipe && (
              <motion.div
                className="theme-wipe"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
              >
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    left: wipe.x,
                    top: wipe.y,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: wipe.toLight
                      ? "radial-gradient(circle, #fde68a 0%, #fbbf24 45%, #f59e0b 100%)"
                      : "radial-gradient(circle, #134e4a 0%, #0b1a1c 55%, #05070a 100%)",
                  }}
                  initial={{ width: 0, height: 0 }}
                  animate={{ width: radius * 2, height: radius * 2 }}
                  transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default ThemeToggle;
