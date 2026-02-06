"use client";

import { motion } from "framer-motion";

interface ExperienceItemProps {
    title: string;
    company: string;
    period: string;
    description: string;
    highlights: string[];
}

export default function ExperienceItem({
    title,
    company,
    period,
    description,
    highlights,
}: ExperienceItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl card-gradient mb-12"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-white">{title}</h3>
                    <p className="text-accent font-medium mt-1">{company}</p>
                </div>
                <p className="text-foreground/50 text-sm mt-2 md:mt-0">{period}</p>
            </div>

            <p className="text-foreground/70 leading-relaxed mb-6">{description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-3">
                        <span className="text-accent mt-1">•</span>
                        <p className="text-sm text-foreground/60">{highlight}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
