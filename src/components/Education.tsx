import { GraduationCap, MapPin, Calendar } from "lucide-react";

const education = [
  {
    degree: "Master of Science in Data Science",
    school: "The University of Texas at Arlington",
    location: "Arlington, TX",
    period: "Aug 2023 to May 2025",
    gpa: "4.0/4.0",
    coursework: ["Big Data & Cloud Computing", "Probability & Statistics", "AI & Neural Networks", "Project Management"],
  },
  {
    degree: "Bachelor of Engineering, Electronics & Communication",
    school: "M.S. Ramaiah Institute of Technology",
    location: "Bengaluru, India",
    period: "Aug 2018 to Jun 2022",
    gpa: null,
    coursework: ["Digital Signal Processing", "Data Structures & Algorithms", "Engineering Mathematics", "Machine Learning"],
  },
];

const Education = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border/60">
      <div className="container mx-auto px-6">
        <div className="eyebrow mb-5">Education</div>
        <h2 className="font-display display-italic text-3xl md:text-4xl mb-14">
          Where the foundations came from
        </h2>

        <div className="max-w-3xl space-y-10">
          {education.map((edu, index) => (
            <div key={edu.school} className="flex gap-6">
              <span className="index-num pt-1">{String(index).padStart(2, "0")}</span>
              <div className="flex-1 border-b border-border/60 pb-10">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>{edu.school}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1.5">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{edu.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{edu.period}</span>
                    </div>
                  </div>
                  {edu.gpa && <div className="hud-value text-2xl">{edu.gpa}</div>}
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {edu.coursework.map((course) => (
                    <span key={course} className="text-xs font-mono px-3 py-1 rounded-full border border-border/60 text-muted-foreground">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
