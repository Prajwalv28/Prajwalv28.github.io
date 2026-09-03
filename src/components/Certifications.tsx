import { motion } from "framer-motion";
import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { WordReveal, FadeUp, Counter } from "./motion/Reveal";

/**
 * Add further credentials to `certifications` as you earn them. Each
 * supports an optional `url`, which renders a "Verify" link on hover , 
 * worth adding your Oracle credential ID link when you have it handy.
 */

interface Credential {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  placeholder?: boolean;
}

const certifications: Credential[] = [
  {
    title: "Oracle Cloud Infrastructure 2025 Foundations Associate",
    issuer: "Oracle",
    date: "2025",
  },
];

const academic: Credential[] = [
  {
    title: "MS, Data Science, 4.0/4.0 GPA",
    issuer: "The University of Texas at Arlington",
    date: "May 2025",
  },
  {
    title: "BE, Electronics & Communication Engineering",
    issuer: "M.S. Ramaiah Institute of Technology, Bengaluru",
    date: "2022",
  },
];

const STATS = [
  { to: 4.0, decimals: 1, suffix: "/4.0", label: "Graduate GPA" },
  { to: 95, suffix: "M+", label: "Lending records modeled" },
  { to: 2, prefix: "$", suffix: "B+", label: "Assets under stress-testing" },
  { to: 120, suffix: "+", label: "KPIs consolidated" },
];

const CredCard = ({ c, i }: { c: Credential; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-8% 0px" }}
    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
    className={`group relative overflow-hidden rounded-xl border p-6 backdrop-blur-lg transition-colors duration-300 ${
      c.placeholder
        ? "border-dashed border-border bg-transparent"
        : "border-border/60 bg-card/60 dark:bg-white/[0.03] hover:border-primary/50"
    }`}
  >
    <div className="flex items-start justify-between gap-4">
      <Award
        className={`h-5 w-5 ${c.placeholder ? "text-muted-foreground" : "text-primary"}`}
      />
      <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
    </div>
    <h4
      className={`mt-4 font-semibold leading-snug ${
        c.placeholder ? "text-muted-foreground" : ""
      }`}
    >
      {c.title}
    </h4>
    <p className="mt-1.5 text-sm text-muted-foreground">{c.issuer}</p>
    <div className="mt-4 flex items-center justify-between">
      <span className="hud-label">{c.date}</span>
      {c.url && (
        <a
          href={c.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100"
        >
          Verify <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  </motion.div>
);

const Certifications = () => {
  return (
    <section
      id="credentials"
      className="relative border-t border-border/60 py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeUp>
          <span className="eyebrow">Credentials</span>
        </FadeUp>
        <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <WordReveal text="Numbers that hold up under questions" />
        </h2>

        <div className="mt-16 grid gap-y-14 gap-x-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="border-t-2 border-primary pt-5"
            >
              <div className="hud-value text-4xl tabular-nums">
                <Counter
                  to={s.to}
                  decimals={s.decimals ?? 0}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <h3 className="hud-label text-foreground/70">Education</h3>
            </div>
            <div className="grid gap-4">
              {academic.map((c, i) => (
                <CredCard key={c.title} c={c} i={i} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <h3 className="hud-label text-foreground/70">Certifications</h3>
            </div>
            <div className="grid gap-4">
              {certifications.map((c, i) => (
                <CredCard key={c.title} c={c} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
