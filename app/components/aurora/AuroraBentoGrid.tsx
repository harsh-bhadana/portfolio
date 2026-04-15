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
  url?: string;
  purpose: string;
  tech_used: string[];
  included_in: string;
  is_experimental: boolean;
  summary: string;
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

          {/* Labs Header Card - High-Density Archive Style */}
          <div id="labs" className="md:col-span-12 mt-32 mb-16 scroll-mt-32 relative">
             <div className="flex items-center gap-6 mb-8 group">
                <div className="h-px bg-foreground/10 flex-1 group-hover:bg-accent/30 transition-colors" />
                <h2 className="font-headline font-black text-2xl md:text-4xl tracking-[0.2em] uppercase text-foreground/20 selection:bg-accent/10 whitespace-nowrap">
                  Experimental <span className="text-accent/40 italic">Specimen</span> Archive
                </h2>
                <div className="h-px bg-foreground/10 flex-1 group-hover:bg-accent/30 transition-colors" />
             </div>
             
             <div className="flex flex-wrap gap-4 justify-center opacity-40">
                {labs.map((lb, i) => (
                   <span key={i} className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {lb.category.replace(' Lab', '')}
                   </span>
                ))}
             </div>
          </div>

          {/* Labs Items Loop - Redesigned Bento Mosaic */}
          <div className="md:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {labs.map((lab, lIndex) => {
              // Staggered grid spans for exactly 4 items to create a high-end mosaic
              const spans = [
                "lg:col-span-7", 
                "lg:col-span-5", 
                "lg:col-span-5", 
                "lg:col-span-7"
              ];
              const spanClass = spans[lIndex % spans.length] || "lg:col-span-6";
              
              return (
                <motion.div 
                  key={lIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: lIndex * 0.1 }}
                  className={`${spanClass} flex flex-col`}
                >
                  <div className="bg-white/40 backdrop-blur-md rounded-[3rem] border border-border/40 p-10 md:p-14 h-full relative group overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500">
                    {/* Interactive "Scanning" Border Animation */}
                    <motion.div 
                      className="absolute inset-0 border-2 border-accent opacity-0 group-hover:opacity-100 rounded-[3rem] pointer-events-none z-20"
                      initial={false}
                      animate={{ 
                        clipPath: ["inset(0 0 95% 0)", "inset(0 0 0 95%)", "inset(95% 0 0 0)", "inset(0 95% 0 0)", "inset(0 0 95% 0)"]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                       <ThemeIcon icon={lab.icon} size={200} />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                              <ThemeIcon icon={lab.icon} size={32} />
                           </div>
                           <div>
                              <h4 className="font-headline font-black text-2xl md:text-3xl uppercase tracking-tight leading-none group-hover:text-accent transition-colors">{lab.category}</h4>
                              <p className="font-body text-xs font-black text-accent uppercase tracking-[0.2em] mt-2 opacity-60">Archive Sector: {lIndex + 1}</p>
                           </div>
                        </div>
                        
                        <div className="px-6 py-2 rounded-full bg-surface-dim border border-border/50 font-label text-[10px] font-black uppercase tracking-widest text-foreground/40 italic">
                          {lab.tagline}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                        {lab.items.map((item, iIndex) => (
                          <a 
                            key={iIndex} 
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/item relative p-6 rounded-[2rem] bg-surface-dim/30 border border-border/30 hover:bg-white hover:border-accent hover:shadow-xl transition-all block overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover/item:opacity-100 transition-opacity">
                               <ArrowUpRight size={16} className="text-accent" />
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                               <span className="font-label text-[8px] font-black uppercase tracking-widest text-accent bg-accent/5 px-2 py-1 rounded-md">
                                  {item.badge}
                               </span>
                               {item.is_experimental && (
                                 <span className="flex items-center gap-1.5 font-label text-[8px] font-black uppercase tracking-widest text-red-500 bg-red-500/5 px-2 py-1 rounded-md">
                                    <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                                    Exp
                                 </span>
                               )}
                            </div>
                            
                            <h5 className="font-headline font-black text-sm uppercase tracking-tight mb-2 group-hover/item:text-accent transition-colors">{item.name}</h5>
                            <p className="font-body text-[11px] text-foreground/50 leading-relaxed line-clamp-2">{item.summary}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>


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
