"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ThemeIcon from "../ThemeIcon";

interface SkillCategory {
  category: string;
  items: string[];
  icon: any;
}

interface AuroraSkillsProps {
  skills: SkillCategory[];
}

export default function AuroraSkills({ skills }: AuroraSkillsProps) {
  return (
    <section id="skills" className="py-24 px-6 lg:pl-48 bg-white relative overflow-hidden">
      {/* Decorative Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #c1242c 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-20 text-center lg:text-left">
          <span className="font-label text-xs uppercase font-black tracking-[0.4em] text-accent/60 mb-4 block">02 / Gear</span>
          <h2 className="font-headline font-black text-5xl md:text-8xl tracking-tighter leading-none mb-4 uppercase">
            The Tool <span className="italic text-accent">Belt.</span>
          </h2>
          <p className="font-body text-xl text-foreground/40 font-medium italic">A curated collection of digital precision instruments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-surface-dim p-10 rounded-[3rem] border-2 border-border relative group hover:border-accent/40 transition-all shadow-sm flex flex-col items-center lg:items-start"
            >
              {/* Category Icon Capsule */}
              <div className="w-20 h-20 rounded-[2rem] bg-white shadow-lg border border-border flex items-center justify-center text-accent mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <ThemeIcon icon={skill.icon} size={32} />
              </div>

              <h3 className="font-headline font-black text-3xl mb-12 uppercase tracking-tighter text-foreground group-hover:text-accent transition-colors">
                {skill.category}
              </h3>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {skill.items.map((item, i) => {
                  // Deterministic pseudo-random rotation for sticker look
                  const rotations = [-2, 3, -4, 2, -1, 4];
                  const rot = rotations[i % rotations.length];
                  
                  return (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1, rotate: 0, zIndex: 20 }}
                      className="px-6 py-3 bg-white border-2 border-border rounded-xl font-label text-[10px] font-black uppercase tracking-widest text-foreground/70 shadow-sm transition-all cursor-default"
                      style={{ rotate: `${rot}deg` }}
                    >
                      {item}
                      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-20 transition-opacity">
                         <Sparkles size={10} className="text-accent" />
                      </div>
                    </motion.span>
                  );
                })}
              </div>

              {/* Decorative Index Tag */}
              <div className="absolute top-8 right-8 font-mono text-[10px] font-black text-accent/10 select-none">
                SC_{index.toString().padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
