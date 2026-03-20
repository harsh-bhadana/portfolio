"use client";

import { motion } from "framer-motion";

interface Project {
    name: string;
    description: string;
    highlights: string[];
}

interface ExperienceItemProps {
    title: string;
    company: string;
    period: string;
    projects: Project[];
}

export default function ExperienceItem({
    title,
    company,
    period,
    projects,
}: ExperienceItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-[2.5rem] card-gradient mb-20 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="text-8xl font-black italic select-none">EXP</div>
            </div>

            {/* Company Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 relative z-10">
                <div>
                    <h3 className="text-3xl font-black text-white mb-2 leading-none">{title}</h3>
                    <p className="text-accent text-lg font-bold italic tracking-tight">{company}</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-foreground/40 mt-6 md:mt-0">
                    {period}
                </div>
            </div>

            {/* Projects List */}
            <div className="space-y-16">
                {projects.map((project, pIndex) => (
                    <div key={pIndex} className="relative pl-10">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent-secondary to-transparent rounded-full shadow-[0_0_15px_rgba(255,70,85,0.3)]" />
                        <div className="absolute -left-1.5 top-0 w-4 h-4 rounded-full bg-accent border-4 border-[#0f0f0f] shadow-[0_0_10px_rgba(255,70,85,0.5)]" />
                        
                        <h4 className="text-2xl font-black text-white mb-4 leading-tight">{project.name}</h4>
                        <p className="text-foreground/60 text-base mb-8 leading-relaxed max-w-3xl">
                            {project.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.highlights.map((highlight, hIndex) => (
                                <div key={hIndex} className="flex gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <span className="text-accent text-sm font-black">★</span>
                                    <p className="text-xs text-foreground/50 leading-relaxed font-medium">{highlight}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
