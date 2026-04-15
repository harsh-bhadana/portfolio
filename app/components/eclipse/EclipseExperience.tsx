import ExperienceItem from "../ExperienceItem";
import { Experience } from "../../types/portfolio";

export default function EclipseExperience({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always scroll-mt-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div className="text-center md:text-left">
          <span className="text-accent font-black tracking-widest uppercase text-xs mb-4 block">01 / History</span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">Professional <br className="md:hidden" /> <span className="animate-gradient">Journey</span></h2>
        </div>
      </div>

      <div>
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} {...exp} />
        ))}
      </div>
    </section>
  );
}
