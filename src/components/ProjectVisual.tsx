import { useEffect, useRef } from "react";

/**
 * Each project gets a bespoke, coded visual instead of a stock photo , 
 * every one is a real artifact from that project's domain (an ROC curve,
 * a retrieval graph, a covariance heatmap). They animate on a rAF loop
 * and only run while on screen.
 */

export type VisualKind =
  | "frontier"
  | "roc"
  | "retrieval"
  | "anomaly"
  | "forecast"
  | "pipeline"
  | "spectrum"
  | "scatter"
  | "treemap"
  | "network";

const TEAL = "45, 212, 191";
const MINT = "94, 234, 212";
const AMBER = "251, 191, 36";
const ROSE = "244, 63, 94";

function draw(
  kind: VisualKind,
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number
) {
  ctx.clearRect(0, 0, w, h);
  const pad = 14;
  const iw = w - pad * 2;
  const ih = h - pad * 2;

  // faint grid, shared across all variants
  ctx.strokeStyle = "rgba(255,255,255,0.045)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad + (ih / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(pad + iw, y);
    ctx.stroke();
    const x = pad + (iw / 4) * i;
    ctx.beginPath();
    ctx.moveTo(x, pad);
    ctx.lineTo(x, pad + ih);
    ctx.stroke();
  }

  switch (kind) {
    /* ---- Efficient frontier: cloud of portfolios + frontier hull ---- */
    case "frontier": {
      for (let i = 0; i < 190; i++) {
        const seed = i * 0.618;
        const rx = (Math.sin(seed * 12.9898) * 43758.5453) % 1;
        const ry = (Math.sin(seed * 78.233) * 43758.5453) % 1;
        const px = Math.abs(rx);
        const py = Math.abs(ry);
        const x = pad + px * iw;
        const maxY = Math.sqrt(px) * ih * 0.86;
        const y = pad + ih - py * maxY;
        const tw = Math.sin(t * 0.0012 + i) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(${TEAL}, ${0.1 + tw * 0.16})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = `rgba(${MINT}, 0.9)`;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(${MINT}, 0.6)`;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const p = i / 60;
        const x = pad + p * iw;
        const y = pad + ih - Math.sqrt(p) * ih * 0.86;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      const mp = (Math.sin(t * 0.0009) * 0.5 + 0.5) * 0.9 + 0.05;
      const mx = pad + mp * iw;
      const my = pad + ih - Math.sqrt(mp) * ih * 0.86;
      ctx.fillStyle = `rgba(${AMBER}, 1)`;
      ctx.beginPath();
      ctx.arc(mx, my, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    /* ---- ROC curve drawing itself, with AUC fill ---- */
    case "roc": {
      const prog = Math.min((t % 5200) / 3400, 1);
      ctx.strokeStyle = "rgba(255,255,255,0.16)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pad, pad + ih);
      ctx.lineTo(pad + iw, pad);
      ctx.stroke();
      ctx.setLineDash([]);

      const rocY = (p: number) => Math.pow(p, 0.26);
      ctx.beginPath();
      ctx.moveTo(pad, pad + ih);
      for (let i = 0; i <= 60; i++) {
        const p = (i / 60) * prog;
        ctx.lineTo(pad + p * iw, pad + ih - rocY(p) * ih);
      }
      ctx.lineTo(pad + prog * iw, pad + ih);
      ctx.closePath();
      ctx.fillStyle = `rgba(${TEAL}, 0.13)`;
      ctx.fill();

      ctx.strokeStyle = `rgba(${MINT}, 0.95)`;
      ctx.lineWidth = 2.2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${MINT}, 0.55)`;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const p = (i / 60) * prog;
        const x = pad + p * iw;
        const y = pad + ih - rocY(p) * ih;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      break;
    }

    /* ---- RAG retrieval: query node pulses, docs light up by rank ---- */
    case "retrieval": {
      const cx = pad + iw * 0.16;
      const cy = pad + ih / 2;
      const docs = 9;
      for (let i = 0; i < docs; i++) {
        const a = (i / (docs - 1) - 0.5) * 1.5;
        const dx = pad + iw * 0.82;
        const dy = cy + a * ih * 0.82;
        const phase = (t * 0.0011 + i * 0.42) % 2;
        const active = phase < 0.85;
        const strength = active ? 1 - phase / 0.85 : 0;
        ctx.strokeStyle = `rgba(${TEAL}, ${0.08 + strength * 0.55})`;
        ctx.lineWidth = 0.8 + strength * 1.6;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx + iw * 0.3, cy, dx - iw * 0.3, dy, dx, dy);
        ctx.stroke();
        ctx.fillStyle = `rgba(${strength > 0.5 ? AMBER : TEAL}, ${0.25 + strength * 0.7})`;
        ctx.beginPath();
        ctx.arc(dx, dy, 2.5 + strength * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      const pulse = Math.sin(t * 0.004) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(${MINT}, 1)`;
      ctx.shadowBlur = 14;
      ctx.shadowColor = `rgba(${MINT}, 0.8)`;
      ctx.beginPath();
      ctx.arc(cx, cy, 5 + pulse * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      break;
    }

    /* ---- Anomaly detection: stream with outliers flagged ---- */
    case "anomaly": {
      const n = 76;
      ctx.strokeStyle = `rgba(${TEAL}, 0.55)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const pts: [number, number, boolean][] = [];
      for (let i = 0; i < n; i++) {
        const p = i / (n - 1);
        const x = pad + p * iw;
        const base =
          Math.sin(p * 9 + t * 0.0008) * 0.16 + Math.sin(p * 23 + t * 0.0013) * 0.07;
        const spikeSeed = Math.sin(i * 91.7 + Math.floor(t / 2600) * 13.1);
        const isOutlier = spikeSeed > 0.93;
        const val = base + (isOutlier ? 0.34 : 0);
        const y = pad + ih / 2 - val * ih;
        pts.push([x, y, isOutlier]);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      // threshold band
      ctx.fillStyle = "rgba(255,255,255,0.035)";
      ctx.fillRect(pad, pad + ih / 2 - 0.24 * ih, iw, 0.48 * ih);
      pts.forEach(([x, y, out]) => {
        if (!out) return;
        ctx.fillStyle = `rgba(${ROSE}, 0.95)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${ROSE}, 0.7)`;
        ctx.beginPath();
        ctx.arc(x, y, 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      break;
    }

    /* ---- Forecast: actuals + predicted with confidence cone ---- */
    case "forecast": {
      const split = 0.58;
      const f = (p: number) =>
        Math.sin(p * 6.2) * 0.14 + p * 0.3 + Math.sin(p * 15) * 0.045;
      // cone
      ctx.beginPath();
      for (let i = 0; i <= 40; i++) {
        const p = split + (i / 40) * (1 - split);
        const spread = ((p - split) / (1 - split)) * 0.14;
        ctx.lineTo(pad + p * iw, pad + ih * 0.72 - (f(p) + spread) * ih);
      }
      for (let i = 40; i >= 0; i--) {
        const p = split + (i / 40) * (1 - split);
        const spread = ((p - split) / (1 - split)) * 0.14;
        ctx.lineTo(pad + p * iw, pad + ih * 0.72 - (f(p) - spread) * ih);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${AMBER}, 0.14)`;
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(${MINT}, 0.9)`;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const p = (i / 60) * split;
        const x = pad + p * iw;
        const y = pad + ih * 0.72 - f(p) * ih;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      ctx.strokeStyle = `rgba(${AMBER}, 0.9)`;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      for (let i = 0; i <= 40; i++) {
        const p = split + (i / 40) * (1 - split);
        const x = pad + p * iw;
        const y = pad + ih * 0.72 - f(p) * ih;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
      break;
    }

    /* ---- ETL pipeline: packets flowing through stages ---- */
    case "pipeline": {
      const stages = 4;
      const gap = iw / stages;
      for (let s = 0; s < stages; s++) {
        const x = pad + gap * s + gap / 2;
        const y = pad + ih / 2;
        ctx.strokeStyle = `rgba(${TEAL}, 0.42)`;
        ctx.lineWidth = 1.4;
        ctx.strokeRect(x - 17, y - 15, 34, 30);
        if (s < stages - 1) {
          ctx.beginPath();
          ctx.moveTo(x + 17, y);
          ctx.lineTo(x + gap - 17, y);
          ctx.stroke();
        }
      }
      for (let i = 0; i < 14; i++) {
        const prog = ((t * 0.00016 + i / 14) % 1);
        const x = pad + prog * iw;
        const wob = Math.sin(prog * 22 + i) * 5;
        ctx.fillStyle = `rgba(${i % 4 === 0 ? AMBER : MINT}, 0.85)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${MINT}, 0.6)`;
        ctx.beginPath();
        ctx.arc(x, pad + ih / 2 + wob, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      break;
    }

    /* ---- Audio spectrum for the music recommender ---- */
    case "spectrum": {
      const bars = 34;
      const bw = iw / bars;
      for (let i = 0; i < bars; i++) {
        const p = i / bars;
        const amp =
          (Math.sin(t * 0.0025 + i * 0.5) * 0.5 + 0.5) *
          (Math.sin(p * Math.PI) * 0.75 + 0.25);
        const bh = amp * ih * 0.9;
        const grad = ctx.createLinearGradient(0, pad + ih - bh, 0, pad + ih);
        grad.addColorStop(0, `rgba(${AMBER}, 0.95)`);
        grad.addColorStop(1, `rgba(${TEAL}, 0.35)`);
        ctx.fillStyle = grad;
        ctx.fillRect(pad + i * bw + bw * 0.18, pad + ih - bh, bw * 0.64, bh);
      }
      break;
    }

    /* ---- Geo temporal scatter with density ---- */
    case "scatter": {
      for (let i = 0; i < 260; i++) {
        const sx = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1);
        const sy = Math.abs((Math.sin(i * 78.233) * 43758.5453) % 1);
        const cluster = Math.exp(-(Math.pow(sx - 0.42, 2) + Math.pow(sy - 0.5, 2)) * 7);
        const x = pad + sx * iw;
        const y = pad + sy * ih;
        const tw = Math.sin(t * 0.0016 + i * 0.3) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(${cluster > 0.55 ? AMBER : TEAL}, ${0.12 + cluster * 0.5 * tw})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.1 + cluster * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    /* ---- Streaming catalogue browse grid ----
       Rows of poster tiles drifting at different speeds, like a browse
       carousel, with a scanning highlight sweeping the shelf and tiles
       flaring as it passes. Original artwork; deliberately avoids any
       real streaming brand's logo or intro sequence, which are
       trademarked. ---- */
    case "treemap": {
      const ROWS = 3;
      const rowH = ih / ROWS;
      const tileW = 26;
      const tileH = rowH * 0.66;
      const scanX = pad + ((t * 0.00022) % 1) * iw;

      for (let r = 0; r < ROWS; r++) {
        const dir = r % 2 === 0 ? 1 : -1;
        const speed = 0.012 + r * 0.005;
        const offset = (t * speed * dir) % (tileW + 8);
        const y = pad + r * rowH + (rowH - tileH) / 2;
        const count = Math.ceil(iw / (tileW + 8)) + 2;

        for (let i = -1; i < count; i++) {
          const x = pad + i * (tileW + 8) + offset;
          if (x + tileW < pad || x > pad + iw) continue;

          // deterministic per-tile identity
          const seed = Math.abs(Math.sin((i + r * 31) * 12.9898) % 1);
          const nearScan = 1 - Math.min(Math.abs(x + tileW / 2 - scanX) / 90, 1);
          const heat = seed * 0.5 + nearScan * 0.85;

          const base = seed > 0.72 ? AMBER : seed > 0.4 ? TEAL : MINT;
          ctx.fillStyle = `rgba(${base}, ${0.1 + heat * 0.5})`;

          // rounded tile
          const rad = 3;
          ctx.beginPath();
          ctx.moveTo(x + rad, y);
          ctx.lineTo(x + tileW - rad, y);
          ctx.quadraticCurveTo(x + tileW, y, x + tileW, y + rad);
          ctx.lineTo(x + tileW, y + tileH - rad);
          ctx.quadraticCurveTo(x + tileW, y + tileH, x + tileW - rad, y + tileH);
          ctx.lineTo(x + rad, y + tileH);
          ctx.quadraticCurveTo(x, y + tileH, x, y + tileH - rad);
          ctx.lineTo(x, y + rad);
          ctx.quadraticCurveTo(x, y, x + rad, y);
          ctx.closePath();
          ctx.fill();

          if (nearScan > 0.45) {
            ctx.strokeStyle = `rgba(${MINT}, ${nearScan * 0.9})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            // little rating bar on the flared tile
            const bw2 = (tileW - 8) * seed;
            ctx.fillStyle = `rgba(${AMBER}, ${nearScan})`;
            ctx.fillRect(x + 4, y + tileH - 5, bw2, 2);
          }
        }
      }

      // scanning beam
      const g = ctx.createLinearGradient(scanX - 40, 0, scanX + 40, 0);
      g.addColorStop(0, `rgba(${MINT}, 0)`);
      g.addColorStop(0.5, `rgba(${MINT}, 0.16)`);
      g.addColorStop(1, `rgba(${MINT}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(scanX - 40, pad, 80, ih);
      ctx.strokeStyle = `rgba(${MINT}, 0.55)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(scanX, pad);
      ctx.lineTo(scanX, pad + ih);
      ctx.stroke();
      break;
    }

    /* ---- Railway track in perspective ----
       Converging rails toward a vanishing point, sleepers streaming
       past to imply speed, a signal light cycling, and a train marker
       running the line. ---- */
    case "network": {
      const vpX = pad + iw * 0.5;
      const vpY = pad + ih * 0.2;
      const baseY = pad + ih;
      const gaugeAtBase = iw * 0.42;

      // ground wash
      const groundGrad = ctx.createLinearGradient(0, vpY, 0, baseY);
      groundGrad.addColorStop(0, `rgba(${TEAL}, 0.05)`);
      groundGrad.addColorStop(1, `rgba(${TEAL}, 0.14)`);
      ctx.fillStyle = groundGrad;
      ctx.beginPath();
      ctx.moveTo(vpX, vpY);
      ctx.lineTo(vpX - gaugeAtBase, baseY);
      ctx.lineTo(vpX + gaugeAtBase, baseY);
      ctx.closePath();
      ctx.fill();

      // sleepers streaming toward the viewer
      const SLEEPERS = 26;
      const scroll = (t * 0.00042) % 1;
      for (let i = 0; i < SLEEPERS; i++) {
        const u = (i / SLEEPERS + scroll) % 1;
        // ease so spacing compresses toward the horizon
        const d = Math.pow(u, 2.4);
        const y = vpY + d * (baseY - vpY);
        const halfGauge = d * gaugeAtBase;
        const alpha = 0.08 + d * 0.5;
        ctx.strokeStyle = `rgba(${MINT}, ${alpha})`;
        ctx.lineWidth = 0.6 + d * 3;
        ctx.beginPath();
        ctx.moveTo(vpX - halfGauge * 1.16, y);
        ctx.lineTo(vpX + halfGauge * 1.16, y);
        ctx.stroke();
      }

      // the two rails
      [-1, 1].forEach((side) => {
        const grad = ctx.createLinearGradient(0, vpY, 0, baseY);
        grad.addColorStop(0, `rgba(${MINT}, 0.15)`);
        grad.addColorStop(1, `rgba(${MINT}, 0.95)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${MINT}, 0.45)`;
        ctx.beginPath();
        ctx.moveTo(vpX + side * gaugeAtBase, baseY);
        ctx.lineTo(vpX + side * 1.5, vpY);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // train marker running the line
      const trainU = ((t * 0.00019) % 1);
      const td = Math.pow(trainU, 2.4);
      const ty = vpY + td * (baseY - vpY);
      const tHalf = td * gaugeAtBase;
      ctx.fillStyle = `rgba(${AMBER}, ${0.35 + td * 0.6})`;
      ctx.shadowBlur = 14;
      ctx.shadowColor = `rgba(${AMBER}, 0.7)`;
      const carW = tHalf * 1.5;
      const carH = 4 + td * 16;
      ctx.fillRect(vpX - carW / 2, ty - carH, carW, carH);
      ctx.shadowBlur = 0;

      // headlight glow ahead of the train
      const hg = ctx.createRadialGradient(vpX, ty, 0, vpX, ty, 30 + td * 50);
      hg.addColorStop(0, `rgba(${AMBER}, ${0.22 * (0.3 + td)})`);
      hg.addColorStop(1, `rgba(${AMBER}, 0)`);
      ctx.fillStyle = hg;
      ctx.fillRect(pad, pad, iw, ih);

      // trackside signal cycling green / amber / red
      const phase = Math.floor((t * 0.0006) % 3);
      const sigColors = [MINT, AMBER, ROSE];
      const sx = vpX + gaugeAtBase * 0.72;
      const sy = baseY - ih * 0.34;
      ctx.strokeStyle = `rgba(${TEAL}, 0.5)`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx, sy + ih * 0.22);
      ctx.stroke();
      for (let l = 0; l < 3; l++) {
        const on = l === phase;
        ctx.fillStyle = `rgba(${sigColors[l]}, ${on ? 1 : 0.14})`;
        if (on) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${sigColors[l]}, 0.8)`;
        }
        ctx.beginPath();
        ctx.arc(sx, sy + l * 8, 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      break;
    }
  }
}

const ProjectVisual = ({
  kind,
  className = "",
}: {
  kind: VisualKind;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      canvas.width = Math.max(r.width * dpr, 1);
      canvas.height = Math.max(r.height * dpr, 1);
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    const loop = (time: number) => {
      const r = wrap.getBoundingClientRect();
      if (visible) draw(kind, ctx, r.width, r.height, time);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      const r = wrap.getBoundingClientRect();
      draw(kind, ctx, r.width, r.height, 1800);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [kind]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default ProjectVisual;
