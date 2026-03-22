"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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

export default function ExperienceItem({ title, company, period, projects }: ExperienceItemProps) {
    return (
        <div className="mb-20 last:mb-0 group">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl md:text-3xl font-black text-white mb-2 leading-tight md:leading-none">{title}</h3>
                        <p className="text-accent text-base md:text-lg font-bold italic tracking-tight">{company}</p>
                    </div>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-foreground/40 mt-6 md:mt-0">
                    {period}
                </div>
            </div>

            {/* Projects List */}
            <div className="space-y-12 pl-4 md:pl-18 border-l border-white/5 ml-6 md:ml-6">
                {projects.map((project, pIndex) => (
                    <div key={pIndex} className="relative">
                        <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-accent/20 border-2 border-accent" />
                        <h4 className="text-lg md:text-xl font-black text-white mb-4 uppercase tracking-wider">{project.name}</h4>
                        <p className="text-foreground/40 text-sm font-medium mb-8 max-w-2xl leading-relaxed italic border-l-2 border-accent/20 pl-4">
                            {project.description}
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.highlights.map((highlight, hIndex) => (
                                <li key={hIndex} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group/li hover:border-accent/20 transition-all">
                                    <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent opacity-40 group-hover/li:opacity-100 group-hover/li:scale-125 transition-all" />
                                    <span className="text-xs text-foreground/60 font-medium leading-relaxed group-hover/li:text-foreground/80 transition-colors">
                                        {highlight}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
