import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Play, Plus } from "lucide-react";
import ProjectVisual, { VisualKind } from "./ProjectVisual";
import { WordReveal, FadeUp } from "./motion/Reveal";

interface Project {
  id: string;
  title: string;
  oneLiner: string;
  description: string;
  visual: VisualKind;
  tech: string[];
  metrics: { label: string; value: string }[];
  context: string;
  demo?: string;
  code?: string;
  details?: string;
}

const projects: Project[] = [
  {
    id: "portfolio-engine",
    title: "Multi Asset Portfolio Optimization Engine",
    oneLiner: "A PyTorch covariance engine rebalancing 500+ tickers in under two seconds.",
    description:
      "Queried 6M+ tick level market records in Snowflake to compute covariance matrices across multi asset portfolios, with containerized ingestion pipelines on Airflow and Docker processing high frequency market feeds.",
    visual: "frontier",
    tech: ["Python", "PyTorch", "Snowflake", "Airflow", "Docker"],
    metrics: [
      { label: "Sharpe Ratio", value: "1.15 → 1.82" },
      { label: "Rebalance Latency", value: "45s → 1.8s" },
      { label: "Tickers", value: "500+" },
    ],
    context: "Personal project",
  },
  {
    id: "credit risk",
    title: "Credit Risk Default Prediction",
    oneLiner: "XGBoost models retrained across 95M+ lending records.",
    description:
      "Redesigned credit risk feature engineering workflows and retrained XGBoost models against retail and commercial portfolios, lifting discriminatory power substantially.",
    visual: "roc",
    tech: ["Python", "XGBoost", "Feature Engineering", "Model Validation"],
    metrics: [
      { label: "AUC", value: "0.79 → 0.91" },
      { label: "Records", value: "95M+" },
    ],
    context: "JPMorgan Chase",
  },
  {
    id: "rag-platform",
    title: "RAG Platform for Market Intelligence",
    oneLiner: "Analyst research time cut from 2.5 hours to under 50 minutes.",
    description:
      "Indexed SEC filings, earnings reports, and market disclosures in Amazon S3 using vector search and document embeddings, giving analysts conversational access to the full corpus.",
    visual: "retrieval",
    tech: ["LangChain", "Vector Search", "Embeddings", "AWS S3"],
    metrics: [
      { label: "Research Time", value: "2.5h → 50m" },
      { label: "Speedup", value: "3×" },
    ],
    context: "JPMorgan Chase",
  },
  {
    id: "anomaly",
    title: "Transaction Anomaly Detection",
    oneLiner: "False-positive screening alerts reduced from 18% to 11%.",
    description:
      "Recalibrated anomaly detection models using MLflow drift monitoring to catch model degradation early across enterprise payment processing channels.",
    visual: "anomaly",
    tech: ["Python", "MLflow", "Anomaly Detection", "Drift Monitoring"],
    metrics: [
      { label: "False Positives", value: "18% → 11%" },
      { label: "Monitored Assets", value: "$2B+" },
    ],
    context: "JPMorgan Chase",
  },
  {
    id: "fina",
    title: "Fina, AI Credit Risk & Advisory System",
    oneLiner: "Conversational credit assessment with explainable ML.",
    description:
      "Combines retrieval augmented generation with explainable machine learning, surfacing SHAP visualizations so every risk prediction can be interrogated rather than trusted blindly.",
    visual: "forecast",
    tech: ["Python", "RAG", "SHAP", "Streamlit"],
    metrics: [
      { label: "Top-risk flagging", value: "+2%" },
      { label: "Evaluation time", value: "−15%" },
    ],
    context: "Personal project",
    demo: "https://finarag.streamlit.app",
    code: "https://github.com/Prajwalv28/Fina-RAG-Assistant",
  },
  {
    id: "etl",
    title: "Enterprise ETL Modernization",
    oneLiner: "40M+ monthly records, 11 hours down to under 3.",
    description:
      "Migrated fragmented batch ETL workflows onto Apache Spark across enterprise warehouse ecosystems, alongside automated deployment standards that lifted release success from 82% to 97%.",
    visual: "pipeline",
    tech: ["Apache Spark", "PySpark", "GitHub Actions", "MLflow"],
    metrics: [
      { label: "Runtime", value: "11h → 3h" },
      { label: "Release Success", value: "82% → 97%" },
    ],
    context: "Mphasis",
  },
  {
    id: "vibesync",
    title: "VibeSync, AI Music Recommendation",
    oneLiner: "Personalized playlists from listening patterns and mood signals.",
    description:
      "Analyzes preferences, mood patterns, and social listening habits to generate playlists that track how someone actually listens rather than what they last clicked.",
    visual: "spectrum",
    tech: ["Python", "Deep Learning", "Spotify API", "NLP"],
    metrics: [
      { label: "User satisfaction", value: "90%+" },
      { label: "Avg. rec. time", value: "2s" },
    ],
    context: "Personal project",
    demo: "https://vibesyncai.streamlit.app",
    code: "https://github.com/Prajwalv28/VibeSync",
  },
  {
    id: "nyc-taxi",
    title: "NYC Taxi Trip Duration Prediction",
    oneLiner: "Custom neural nets over spatial and temporal ride data.",
    description:
      "Compared multiple architectures and feature engineering strategies to minimize prediction error for ride-hailing and logistics scheduling.",
    visual: "scatter",
    tech: ["Python", "Neural Networks", "Feature Engineering"],
    metrics: [
      { label: "Test RMSLE", value: "0.5637" },
      { label: "Architectures", value: "3" },
    ],
    context: "Personal project",
    code: "https://github.com/Prajwalv28/My_projects/tree/main/NYC%20TAXI%20TRIP%20DURATION",
  },
  {
    id: "netflix",
    title: "Netflix Content Analysis Dashboard",
    oneLiner: "An interactive read on Netflix's global catalogue.",
    description:
      "Genre, rating, release-year, and geographic distribution trends surfaced in Tableau for business and marketing strategy.",
    visual: "treemap",
    tech: ["Tableau", "Data Visualization", "Geospatial Analysis"],
    metrics: [
      { label: "Content growth", value: "19% YoY" },
      { label: "Genre diversity", value: "0.74" },
    ],
    context: "Personal project",
    details:
      "https://public.tableau.com/app/profile/prajwal.venkat1754/viz/NetflixAnalysis_17562755529400/Netflix",
  },
  {
    id: "railflow",
    title: "RailFlow Reservation Analytics",
    oneLiner: "Desktop reservation system with live ticketing analytics.",
    description:
      "End-to-end Tkinter and SQLite application handling booking, passenger and train management, and ticket-status analytics through custom SQL.",
    visual: "network",
    tech: ["Python", "Tkinter", "SQLite", "SQL"],
    metrics: [
      { label: "DB schemas", value: "4+" },
      { label: "Automated queries", value: "7+" },
    ],
    context: "Personal project",
    code: "https://github.com/Prajwalv28/My_projects/tree/main/RailFlow",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <FadeUp delay={Math.min(index * 0.04, 0.2)}>
      <div className="border-b border-border/60">
        <button
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-center gap-5 py-7 text-left sm:gap-8"
        >
          <span className="index-num w-8 shrink-0 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                {project.title}
              </h3>
              <span className="hud-label shrink-0">{project.context}</span>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
              {project.oneLiner}
            </p>
          </div>

          {/* peek thumbnail on desktop */}
          <div className="hidden h-16 w-28 shrink-0 overflow-hidden rounded-lg border border-border/60 opacity-60 transition-opacity duration-300 group-hover:opacity-100 lg:block">
            <ProjectVisual kind={project.visual} className="h-full w-full" />
          </div>

          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
          >
            <Plus className="h-5 w-5" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="grid gap-8 pb-10 lg:grid-cols-[1.15fr_1fr] lg:pl-13">
                <div className="lg:pl-[3.25rem]">
                  <p className="max-w-xl leading-relaxed text-foreground/80">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border/60 px-3 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-8">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="hud-value text-xl">{m.value}</div>
                        <div className="hud-label mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {(project.demo || project.code || project.details) && (
                    <div className="mt-7 flex flex-wrap gap-3">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          <Play className="h-3.5 w-3.5" /> Live demo
                        </a>
                      )}
                      {project.code && (
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                        >
                          <Github className="h-3.5 w-3.5" /> Code
                        </a>
                      )}
                      {project.details && (
                        <a
                          href={project.details}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" /> Details
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/60 bg-card/70 dark:bg-card/30 backdrop-blur-sm">
                  <ProjectVisual kind={project.visual} className="h-full w-full" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3">
                    <span className="hud-label">{project.visual}</span>
                    <span className="hud-label">live</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  );
};

const ProjectShowcase = () => {
  return (
    <section id="projects" className="relative border-t border-border/60 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeUp>
          <span className="eyebrow">Selected work</span>
        </FadeUp>
        <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <WordReveal text="Where the models actually ship" />
        </h2>
        <FadeUp delay={0.15}>
          <p className="mt-5 max-w-lg text-muted-foreground">
            {projects.length} projects. Production systems at JPMorgan Chase and
            Mphasis, plus the things built on weekends. Every visual below is
            rendered live, not a screenshot.
          </p>
        </FadeUp>

        <div className="mt-16">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
