"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Share2, Palette, Sparkles, Zap, Box, Layers, Code2 } from "lucide-react";
import ThemeIcon from "../ThemeIcon";

interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  status?: string;
  highlight?: string;
  graph?: any;
}

interface LabItem {
  name: string;
  path: string;
  badge: string;
  desc: string;
}

interface LabCategory {
  category: string;
  icon: any;
  tagline: string;
  items: LabItem[];
}

interface AuroraBentoGridProps {
  projects: Project[];
  labs: LabCategory[];
  onInspectArchitecture?: (project: Project) => void;
}

export default function AuroraBentoGrid({ projects, labs, onInspectArchitecture }: AuroraBentoGridProps) {
  return (
    <section id="projects" className="py-32 px-6 lg:pl-96 relative overflow-hidden">
      {/* Immersive Background Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <motion.div 
          animate={{ 
            rotate: [10, 30, 10],
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] -right-40 w-[800px] h-96 bg-accent-tertiary mix-blend-overlay" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
            borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 60% 40% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] -left-20 w-[500px] h-[500px] bg-accent blur-[80px] opacity-60" 
        />
        <motion.div 
          animate={{ 
            x: [0, 40, 0], y: [0, 20, 0], rotate: [0, -90, 0],
            borderRadius: ["35% 65% 65% 35% / 40% 45% 55% 60%", "65% 35% 35% 65% / 60% 55% 45% 40%", "35% 65% 65% 35% / 40% 45% 55% 60%"]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent-secondary opacity-40 shadow-2xl backdrop-blur-xl" 
        />
        <motion.div 
          animate={{ 
            rotate: [0, 180, 360], 
            scale: [1, 1.2, 1],
            borderRadius: ["50% 50% 20% 80% / 25% 80% 20% 75%", "80% 20% 50% 50% / 75% 20% 80% 25%", "50% 50% 20% 80% / 25% 80% 20% 75%"]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] right-[10%] w-60 h-48 bg-accent opacity-30 shadow-xl" 
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0], y: [0, -50, 0],
            borderRadius: ["73% 27% 26% 74% / 73% 46% 54% 27%", "27% 73% 74% 26% / 27% 54% 46% 73%", "73% 27% 26% 74% / 73% 46% 54% 27%"]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[30%] w-72 h-64 bg-accent-tertiary opacity-30 blur-sm shadow-md" 
        />
      </div>
      {/* Editorial Header */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center lg:items-end mb-24 gap-8 text-center lg:text-left">
          <div className="max-w-xl">
            <span className="font-label text-accent uppercase font-black tracking-[0.4em] text-xs mb-4 block">03 / Inventory</span>
            <h2 className="font-headline font-black text-4xl sm:text-6xl md:text-8xl text-foreground tracking-tighter leading-none">
              Selected <br /> <span className="italic underline decoration-accent/10">Architecture.</span>
            </h2>
          </div>
          <div className="p-6 bg-surface-dim rounded-2xl border border-border/50 max-w-xs md:rotate-2">
            <p className="font-body text-sm font-medium leading-relaxed italic text-foreground/50">
              A high-density archive of secure, efficient, and interactive specimens.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Project Loop */}
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            const spanClass = isFeatured ? "md:col-span-12 lg:col-span-8" : "md:col-span-6 lg:col-span-4";
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`${spanClass} bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-border/50 relative overflow-hidden group flex flex-col`}
              >
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 paper-grain opacity-[0.03] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="font-headline font-black text-3xl md:text-5xl mb-4 tracking-tighter group-hover:text-accent transition-colors leading-none">
                        {project.name}
                      </h3>
                      {project.status && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-lg text-accent font-label text-[10px] uppercase font-black tracking-widest animate-pulse">
                           {project.status}
                        </div>
                      )}
                    </div>
                    {isFeatured && (
                      <div className="w-16 h-16 rounded-2xl bg-surface-dim border border-border flex items-center justify-center text-accent/20">
                         <Github size={32} />
                      </div>
                    )}
                  </div>

                  <p className="font-body text-foreground/60 text-lg font-medium leading-relaxed mb-10 overflow-hidden line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-surface-dim border border-border/50 text-[9px] font-label font-black uppercase tracking-widest text-foreground/40">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-6 pt-8 border-t border-border mt-auto h-auto">
                    <a href={project.github} className="text-foreground/40 hover:text-accent transition-colors flex items-center gap-2 font-label text-xs uppercase font-black">
                      <Github size={18} /> Source
                    </a>
                    {project.demo && (
                      <a href={project.demo} className="text-foreground/40 hover:text-accent transition-colors flex items-center gap-2 font-label text-xs uppercase font-black">
                        <ExternalLink size={18} /> Demo
                      </a>
                    )}
                    {project.graph && onInspectArchitecture && (
                      <button 
                        onClick={() => onInspectArchitecture(project)}
                        className="text-accent hover:text-foreground transition-all flex items-center gap-2 font-label text-xs uppercase font-black"
                      >
                        <Share2 size={18} /> Inspect Engine
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Labs Header Card - Scrapbook Style */}
          <div id="labs" className="md:col-span-12 mt-20 mb-10 scroll-mt-32">
            <h2 className="font-headline font-black text-4xl md:text-6xl tracking-tighter uppercase italic opacity-20">The Research Specimen Archive</h2>
          </div>

          {/* Labs Items Loop */}
          {labs.map((lab, lIndex) => {
            const rotations = [-1, 2, -2, 1];
            const rot = rotations[lIndex % rotations.length];
            
            return (
              <div key={lIndex} className="md:col-span-6 lg:col-span-4 self-stretch">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                  className="bg-white p-10 rounded-none border-2 border-border shadow-md h-full flex flex-col relative group"
                  style={{ rotate: `${rot}deg` }}
                >
                  {/* Adhesive tape effect */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-accent/5 border border-accent/10 backdrop-blur-sm z-20 rotate-1 shadow-sm" />
                  
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center shadow-lg">
                        <ThemeIcon icon={lab.icon} size={24} />
                     </div>
                     <h4 className="font-headline font-black text-xl uppercase tracking-tight">{lab.category}</h4>
                  </div>

                  <p className="font-body text-sm font-bold text-foreground/40 mb-10 italic leading-relaxed">
                    {lab.tagline}
                  </p>

                  <div className="space-y-4">
                    {lab.items.map((item, iIndex) => (
                      <div key={iIndex} className="p-4 rounded-xl border border-border/50 bg-surface-dim hover:bg-white hover:border-accent transition-all group/item cursor-default">
                        <div className="flex justify-between items-start mb-2">
                           <span className="font-label text-[9px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                              {item.badge}
                           </span>
                           <ArrowUpRight size={14} className="text-foreground/20 group-hover/item:text-accent group-hover/item:translate-x-1 transition-all" />
                        </div>
                        <h5 className="font-headline font-black text-sm uppercase mb-1">{item.name}</h5>
                        <p className="font-body text-[11px] text-foreground/50 font-medium leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}

          {/* Fun Highlight Card */}
          <div className="md:col-span-12 lg:col-span-12 mt-12 bg-surface-dim p-12 rounded-[3.5rem] border-2 border-border border-dashed flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12">
               <Zap size={300} className="text-accent" />
            </div>
            <div className="text-center md:text-left relative z-10 flex-1">
              <h3 className="font-headline font-black text-4xl md:text-6xl mb-6 tracking-tighter uppercase leading-none">
                More than just <br /> <span className="text-accent italic">Pixels.</span>
              </h3>
              <p className="font-body text-foreground/50 text-xl font-medium max-w-lg mb-10">
                It&apos;s about architectural integrity, null-safety guards, and bridging the gap between design and high-scale production logic.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-border">
                  <Box size={20} className="text-accent" />
                  <span className="font-label text-xs font-black uppercase tracking-widest">Modular Core</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-border">
                  <Layers size={20} className="text-accent" />
                  <span className="font-label text-xs font-black uppercase tracking-widest">Defensive UI</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-border">
                  <Code2 size={20} className="text-accent" />
                  <span className="font-label text-xs font-black uppercase tracking-widest">60FPS Limit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
