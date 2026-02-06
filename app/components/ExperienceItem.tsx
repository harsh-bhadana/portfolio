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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl card-gradient mb-16 relative overflow-hidden"
        >
            {/* Company Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-white/5">
                <div>
                    <h3 className="text-2xl font-bold text-white">{title}</h3>
                    <p className="text-accent font-medium">{company}</p>
                </div>
                <p className="text-foreground/50 text-sm font-mono mt-4 md:mt-0">{period}</p>
            </div>

            {/* Projects List */}
            <div className="space-y-12">
                {projects.map((project, pIndex) => (
                    <div key={pIndex} className="relative pl-6 border-l-2 border-accent/20">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-4 border-background" />
                        <h4 className="text-xl font-bold text-white mb-2">{project.name}</h4>
                        <p className="text-foreground/70 text-sm mb-4 leading-relaxed max-w-2xl">
                            {project.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                            {project.highlights.map((highlight, hIndex) => (
                                <div key={hIndex} className="flex gap-2">
                                    <span className="text-accent text-xs mt-1">▹</span>
                                    <p className="text-xs text-foreground/50 leading-relaxed">{highlight}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
