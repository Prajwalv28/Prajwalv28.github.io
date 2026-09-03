import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { WordReveal, FadeUp } from "./motion/Reveal";

const experiences = [
  {
    title: "Data Scientist, AI/ML",
    company: "JPMorgan Chase",
    location: "United States",
    period: "Jan 2025 to Present",
    current: true,
    achievements: [
      "Redesigned credit risk feature engineering and retrained XGBoost models against 95M+ lending records, improving default prediction AUC from 0.79 to 0.91.",
      "Implemented a RAG platform indexing SEC filings, earnings reports, and market disclosures via vector search, cutting analyst research time from 2.5 hours to under 50 minutes.",
      "Built Monte Carlo simulation and scenario-modeling frameworks to replace legacy stress testing, covering $2B+ in monitored assets.",
      "Recalibrated anomaly detection using MLflow drift monitoring, cutting false positive screening alerts from 18% to 11%.",
      "Automated forecasting model deployment across AWS with Databricks and CI/CD, cutting rollout cycles from 3 days to 4 hours.",
      "Consolidated KPI reporting across Finance, Risk, and Portfolio Management into a Power BI dashboard covering 120+ indicators.",
    ],
    metrics: { AUC: "0.79→0.91", Research: "3×", Assets: "$2B+" },
  },
  {
    title: "Data Scientist",
    company: "Mphasis",
    location: "India",
    period: "Jun 2020 to Jul 2023",
    current: false,
    achievements: [
      "Built revenue-forecasting solutions combining regression and time series analysis, improving forecast accuracy from 74% to 89%.",
      "Migrated fragmented batch ETL workflows to Apache Spark, cutting processing runtime for 40M+ monthly records from 11 hours to under 3.",
      "Developed customer-segmentation clustering models, lifting qualified lead conversion from 12% to 19%.",
      "Built financial document processing with LangChain, LlamaIndex, and GCP Vertex AI, cutting compliance research by 340+ analyst hours annually.",
      "Introduced automated ML deployment standards (GitHub Actions + MLflow), improving release success from 82% to 97%.",
      "Engineered automated Tableau/SQL reporting for 60+ stakeholders, cutting reporting latency from weekly to near real time.",
    ],
    metrics: { Forecast: "74%→89%", ETL: "11h→3h", Releases: "82%→97%" },
  },
];

const Experience = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border/60">
      <div className="container mx-auto px-6">
        <FadeUp>
          <span className="eyebrow">Experience</span>
        </FadeUp>
        <h2 className="mt-5 mb-16 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <WordReveal text="The roles behind the résumé" />
        </h2>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10"
            >
              <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2">
                <span className="index-num">{String(index).padStart(2, "0")}</span>
                {exp.current && (
                  <span className="hud-label text-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    current
                  </span>
                )}
              </div>

              <div className="border-b border-border/60 pb-14">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-2xl font-semibold">{exp.title}</h3>
                    <div className="text-lg text-muted-foreground mt-1">{exp.company}</div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{exp.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{exp.period}</span>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    {Object.entries(exp.metrics).map(([k, v]) => (
                      <div key={k} className="text-right">
                        <div className="hud-value text-lg">{v}</div>
                        <div className="hud-label mt-1">{k}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {exp.achievements.map((a, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-3 text-foreground/85 leading-relaxed"
                    >
                      <span className="text-primary mt-1.5 flex-shrink-0">→</span>
                      {a}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
