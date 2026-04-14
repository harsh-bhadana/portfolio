"use client";

import { motion } from "framer-motion";
import ThemeIcon from "../ThemeIcon";
import { Skill } from "../../types/portfolio";

export default function EclipseSkills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always scroll-mt-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(180px,auto)]">
        <div className="md:col-span-12 mb-10">
          <span className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4 block">04 / Proficiencies</span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter">The Tool <span className="animate-gradient italic">Belt</span></h2>
        </div>

        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: index * 0.1
                }
              }
            }}
            className="md:col-span-4 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-foreground/5 border border-foreground/10 hover:border-accent/40 transition-all group flex flex-col"
          >
            <div className="w-16 h-16 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-10 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
              <ThemeIcon icon={skill.icon as React.ElementType} size={24} />
            </div>
            <h3 className="text-2xl font-black mb-8 uppercase tracking-widest leading-none">{skill.category}</h3>
            <div className="flex flex-wrap gap-2 mt-auto">
              {skill.items.map((item, i) => (
                <motion.span 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  className="px-4 py-2 rounded-xl bg-foreground/5 border border-foreground/10 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 hover:text-accent transition-colors"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
