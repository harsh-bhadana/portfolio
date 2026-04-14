"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, Building2, ChevronRight } from "lucide-react";
import ThemeIcon from "../ThemeIcon";

interface Project {
  name: string;
  description: string;
  highlights: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  projects: Project[];
}

interface AuroraExperienceProps {
  experiences: Experience[];
}

export default function AuroraExperience({ experiences }: AuroraExperienceProps) {
  return (
    <section id="experience" className="py-24 px-6 lg:pr-96 relative overflow-hidden">
      {/* Immersive Background Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <motion.div 
          initial={{ opacity: 0, rotate: -15 }}
          whileInView={{ opacity: 1, rotate: -5 }}
          transition={{ duration: 2 }}
          className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-accent rounded-none" 
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
        <motion.div 
          animate={{ 
            scale: [0.8, 1, 0.8],
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 -right-20 w-96 h-96 bg-accent-secondary opacity-30" 
        />
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            borderRadius: ["73% 27% 26% 74% / 73% 46% 54% 27%", "27% 73% 74% 26% / 27% 54% 46% 73%", "73% 27% 26% 74% / 73% 46% 54% 27%"]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent-tertiary opacity-30 blur-2xl" 
        />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-20">
          <span className="font-label text-xs uppercase font-black tracking-[0.4em] text-accent/60 mb-4 block">01 / Archeology</span>
          <h2 className="font-headline font-black text-4xl sm:text-5xl md:text-8xl tracking-tighter leading-none mb-8">
            Professional <br /> <span className="italic underline decoration-accent/20">Exhibitions.</span>
          </h2>
        </div>

        <div className="space-y-32">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Timeline Ribbon */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/10 md:-left-12">
                <div className="sticky top-1/2 w-4 h-4 rounded-full bg-accent -left-1.5 shadow-lg border-4 border-white" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left side: Role & Company */}
                <div className="lg:col-span-4">
                  <div className="sticky top-32">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-border mb-6 rotate-[-1deg]">
                      <Calendar size={14} className="text-accent" />
                      <span className="font-label text-[10px] font-black uppercase tracking-widest">{exp.period}</span>
                    </div>
                    
                    <h3 className="font-headline font-black text-3xl md:text-4xl leading-tight mb-4 text-accent">
                      {exp.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-foreground/60 font-body font-bold text-lg italic">
                      <Building2 size={18} />
                      {exp.company}
                    </div>

                    <div className="mt-8 p-6 bg-accent/5 rounded-2xl border border-accent/10 border-dashed">
                      <p className="font-body text-sm font-medium leading-relaxed italic text-foreground/50">
                        Synthesizing complex requirements into pixel-perfect react specimens.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right side: Projects Tape */}
                <div className="lg:col-span-8 space-y-12">
                  {exp.projects.map((project, pIndex) => (
                    <div key={pIndex} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] border border-border relative group">
                      {/* Paper Tape Corner */}
                      <div className="absolute -top-3 left-10 w-24 h-8 bg-accent/10 border border-accent/20 rotate-[-2deg] z-20 backdrop-blur-sm shadow-sm" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                          <h4 className="font-headline font-black text-2xl md:text-3xl tracking-tight uppercase">
                            {project.name}
                          </h4>
                          <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                             <Sparkles size={20} />
                          </div>
                        </div>

                        <p className="font-body text-lg font-medium text-foreground/70 mb-10 leading-relaxed max-w-2xl italic pl-6 border-l-2 border-accent/30">
                          {project.description}
                        </p>

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                          {project.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="flex gap-4 p-5 rounded-2xl bg-surface-dim group/item hover:bg-accent/5 transition-colors border border-transparent hover:border-accent/10">
                              <ThemeIcon icon={ChevronRight} size={14} className="text-accent mt-1 shrink-0 group-hover/item:translate-x-1 transition-transform" />
                              <span className="font-label text-xs font-bold leading-relaxed text-foreground/60 group-hover/item:text-foreground transition-colors uppercase tracking-tight">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
