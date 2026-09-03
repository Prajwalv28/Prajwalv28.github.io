import { useMemo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { WordReveal, FadeUp } from "./motion/Reveal";

/**
 * An interactive artifact rather than a claim: a synthetic credit-default
 * score distribution the visitor can threshold themselves, watching the
 * confusion matrix, precision/recall and the operating point on the ROC
 * curve move in real time. This is the tradeoff conversation every risk
 * modelling interview eventually reaches, made playable.
 *
 * The distributions are synthetic and deterministic (seeded), chosen to
 * sit near the AUC of the production model, not exported from it.
 */

const N = 2400;
const DEFAULT_RATE = 0.19;

// Deterministic pseudo-random so the chart is stable across renders
function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
// Box–Muller from the seeded stream
function gauss(i: number, mean: number, sd: number) {
  const u1 = Math.max(seeded(i * 2 + 1), 1e-6);
  const u2 = seeded(i * 2 + 2);
  return mean + sd * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

interface Borrower {
  score: number;
  defaulted: boolean;
}

function useDataset(): Borrower[] {
  return useMemo(() => {
    const rows: Borrower[] = [];
    for (let i = 0; i < N; i++) {
      const defaulted = seeded(i * 7.13) < DEFAULT_RATE;
      // separable-but-overlapping score distributions
      const raw = defaulted ? gauss(i, 0.63, 0.17) : gauss(i, 0.33, 0.16);
      rows.push({ score: Math.min(Math.max(raw, 0), 1), defaulted });
    }
    return rows;
  }, []);
}

const HIST_BINS = 46;

const ThresholdLab = () => {
  const data = useDataset();
  const [threshold, setThreshold] = useState(0.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* ---- confusion matrix at the current threshold ---- */
  const stats = useMemo(() => {
    let tp = 0, fp = 0, tn = 0, fn = 0;
    for (const r of data) {
      const flagged = r.score >= threshold;
      if (r.defaulted && flagged) tp++;
      else if (!r.defaulted && flagged) fp++;
      else if (!r.defaulted && !flagged) tn++;
      else fn++;
    }
    const precision = tp + fp === 0 ? 0 : tp / (tp + fp);
    const recall = tp + fn === 0 ? 0 : tp / (tp + fn);
    const f1 = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
    const fpr = fp + tn === 0 ? 0 : fp / (fp + tn);
    // caught vs missed default exposure, at a nominal $18k average balance
    const missedExposure = (fn * 18000) / 1_000_000;
    const reviewLoad = ((tp + fp) / data.length) * 100;
    return { tp, fp, tn, fn, precision, recall, f1, fpr, missedExposure, reviewLoad };
  }, [data, threshold]);

  /* ---- histogram bins ---- */
  const bins = useMemo(() => {
    const pos = new Array(HIST_BINS).fill(0);
    const neg = new Array(HIST_BINS).fill(0);
    for (const r of data) {
      const b = Math.min(Math.floor(r.score * HIST_BINS), HIST_BINS - 1);
      if (r.defaulted) pos[b]++;
      else neg[b]++;
    }
    return { pos, neg, max: Math.max(...pos, ...neg) };
  }, [data]);

  /* ---- draw the score distribution ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const render = () => {
      const r = wrap.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const w = r.width;
      const h = r.height;
      const pad = 8;
      const iw = w - pad * 2;
      const ih = h - pad * 2;
      ctx.clearRect(0, 0, w, h);

      const bw = iw / HIST_BINS;

      for (let i = 0; i < HIST_BINS; i++) {
        const center = (i + 0.5) / HIST_BINS;
        const flagged = center >= threshold;

        // non-defaulters
        const nh = (bins.neg[i] / bins.max) * ih * 0.92;
        ctx.fillStyle = flagged
          ? "rgba(244, 63, 94, 0.55)"   // false positives
          : "rgba(148, 163, 184, 0.34)"; // true negatives
        ctx.fillRect(pad + i * bw, pad + ih - nh, bw * 0.86, nh);

        // defaulters, stacked above
        const ph = (bins.pos[i] / bins.max) * ih * 0.92;
        ctx.fillStyle = flagged
          ? "rgba(45, 212, 191, 0.92)"  // true positives
          : "rgba(251, 191, 36, 0.75)"; // missed defaults
        ctx.fillRect(pad + i * bw, pad + ih - nh - ph, bw * 0.86, ph);
      }

      // threshold line
      const tx = pad + threshold * iw;
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(tx, pad);
      ctx.lineTo(tx, pad + ih);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    render();
    const ro = new ResizeObserver(render);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [bins, threshold]);

  const metricCards = [
    { label: "Precision", value: stats.precision, hint: "of flagged, truly default" },
    { label: "Recall", value: stats.recall, hint: "of defaults, caught" },
    { label: "F1", value: stats.f1, hint: "harmonic balance" },
  ];

  return (
    <section
      id="lab"
      className="relative border-t border-border/60 py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeUp>
          <span className="eyebrow">Interactive</span>
        </FadeUp>
        <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <WordReveal text="Move the threshold. Watch the tradeoff." />
        </h2>
        <FadeUp delay={0.12}>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Every credit model ships with one unavoidable decision: how
            aggressively to flag. Drag the line and see what it costs. This is
            the conversation that actually happens in model review.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
            {/* ---- distribution + slider ---- */}
            <div className="rounded-2xl border border-border/60 bg-card/60 dark:bg-white/[0.03] p-5 backdrop-blur-lg sm:p-7">
              <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                {[
                  { c: "rgba(45,212,191,0.92)", l: "Caught defaults" },
                  { c: "rgba(251,191,36,0.75)", l: "Missed defaults" },
                  { c: "rgba(244,63,94,0.55)", l: "False alarms" },
                  { c: "rgba(148,163,184,0.34)", l: "Correctly cleared" },
                ].map((k) => (
                  <span key={k.l} className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{ background: k.c }}
                    />
                    <span className="hud-label">{k.l}</span>
                  </span>
                ))}
              </div>

              <div ref={wrapRef} className="relative h-56 w-full sm:h-64">
                <canvas ref={canvasRef} className="block h-full w-full" />
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-baseline justify-between">
                  <label htmlFor="thr" className="hud-label">
                    Decision threshold
                  </label>
                  <span className="hud-value text-lg tabular-nums">
                    {threshold.toFixed(2)}
                  </span>
                </div>
                <input
                  id="thr"
                  type="range"
                  min={0.05}
                  max={0.95}
                  step={0.01}
                  value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="mt-2 flex justify-between">
                  <span className="hud-label">flag more · catch more</span>
                  <span className="hud-label">flag less · fewer alarms</span>
                </div>
              </div>
            </div>

            {/* ---- live metrics ---- */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                {metricCards.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-border/60 bg-card/60 dark:bg-white/[0.03] p-4 backdrop-blur-lg"
                  >
                    <div className="hud-value text-2xl tabular-nums">
                      {m.value.toFixed(3)}
                    </div>
                    <div className="hud-label mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* confusion matrix */}
              <div className="rounded-xl border border-border/60 bg-card/60 dark:bg-white/[0.03] p-5 backdrop-blur-lg">
                <div className="hud-label mb-3">Confusion matrix</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { l: "True positive", v: stats.tp, tone: "text-primary" },
                    { l: "False positive", v: stats.fp, tone: "text-loss" },
                    { l: "False negative", v: stats.fn, tone: "text-loss" },
                    { l: "True negative", v: stats.tn, tone: "text-muted-foreground" },
                  ].map((c) => (
                    <motion.div
                      key={c.l}
                      layout
                      className="rounded-lg border border-border/40 px-3 py-2.5"
                    >
                      <div className={`font-mono text-lg tabular-nums ${c.tone}`}>
                        {c.v}
                      </div>
                      <div className="hud-label mt-0.5">{c.l}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* business translation */}
              <div className="rounded-xl border border-primary/40 bg-primary/[0.06] p-5 backdrop-blur-lg">
                <div className="hud-label mb-3 text-primary">
                  What it costs the business
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="hud-value text-2xl tabular-nums">
                      ${stats.missedExposure.toFixed(1)}M
                    </div>
                    <div className="hud-label mt-1">Unflagged default exposure</div>
                  </div>
                  <div className="text-right">
                    <div className="hud-value text-2xl tabular-nums">
                      {stats.reviewLoad.toFixed(0)}%
                    </div>
                    <div className="hud-label mt-1">Book sent to review</div>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Synthetic, seeded data at a comparable separation to the
                production model, not exported from it. Exposure assumes an
                $18k average balance.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default ThresholdLab;
