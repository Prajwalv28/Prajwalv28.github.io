import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Custom cursor: a small dot plus a lagging ring that swells over     */
/* interactive elements. Desktop-only, disabled for coarse pointers.   */
/* ------------------------------------------------------------------ */
export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      setHovering(!!t?.closest?.('a, button, [role="button"], input, [data-cursor="grab"]'));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[150] rounded-full bg-primary"
        style={{ x, y, width: 6, height: 6, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[150] rounded-full border border-primary"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? (hovering ? 1 : 0.5) : 0,
          width: hovering ? 46 : 26,
          height: hovering ? 46 : 26,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Thin scroll-progress rail pinned to the left edge.                  */
/* ------------------------------------------------------------------ */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  return (
    <div className="fixed left-0 top-0 z-[120] h-full w-px bg-border/60 hidden md:block">
      <motion.div
        className="w-full bg-primary origin-top"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Film grain + vignette overlay, sells the "cinematic" register and  */
/* keeps large flat dark areas from banding.                           */
/* ------------------------------------------------------------------ */
export const FilmOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[110]">
    <div
      className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 55%, hsl(var(--background)/0.55) 100%)",
      }}
    />
  </div>
);
