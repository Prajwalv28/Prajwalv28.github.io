import { motion } from "framer-motion";
import { WordReveal, FadeUp } from "./motion/Reveal";

const SKILL_GROUPS = [
  {
    title: "Modeling & ML",
    skills: ["XGBoost", "LightGBM", "PyTorch", "Deep Learning / CNN", "Predictive Modeling", "A/B Testing"],
  },
  {
    title: "Generative AI & NLP",
    skills: ["LangChain", "LlamaIndex", "Hugging Face", "RAG Pipelines", "Vector Search", "Prompt Engineering"],
  },
  {
    title: "Data & MLOps",
    skills: ["Snowflake", "Databricks", "Apache Spark", "Airflow", "Kafka", "MLflow", "Docker", "AWS"],
  },
  {
    title: "Risk & Governance",
    skills: ["Model Risk Management", "Model Validation", "Stress Testing", "Regulatory Reporting"],
  },
  {
    title: "Languages & Tools",
    skills: ["Python", "SQL", "C++", "PySpark", "Git"],
  },
];

const SkillsVisualization = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border/60">
      <div className="container mx-auto px-6">
        <FadeUp>
          <span className="eyebrow">Toolkit</span>
        </FadeUp>
        <h2 className="mt-5 mb-14 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <WordReveal text="What's actually in the stack" />
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="index-num">{String(i).padStart(2, "0")}</span>
                <h3 className="hud-label text-foreground/70">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: j * 0.03 }}
                    className="cursor-default text-sm font-mono px-3 py-1.5 rounded-md border border-border/60 text-foreground/85 hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsVisualization;
