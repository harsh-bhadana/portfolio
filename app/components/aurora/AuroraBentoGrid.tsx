"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Share2, Palette, Sparkles, Zap } from "lucide-react";
import ThemeIcon from "../ThemeIcon";

interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  status?: string;
  highlight?: string;
}

interface AuroraBentoGridProps {
  projects: Project[];
}

export default function AuroraBentoGrid({ projects }: AuroraBentoGridProps) {
  return (
    <section id="projects" className="container mx-auto px-6 lg:pl-96 py-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <span className="font-label text-accent uppercase font-black tracking-widest text-xs mb-3 block">Selected Works</span>
          <h2 className="font-headline font-black text-5xl md:text-7xl text-foreground tracking-tighter">THE GALLERY</h2>
        </div>
        <div className="h-px bg-border flex-grow mx-8 mb-5 hidden md:block" />
        <button className="font-label uppercase font-black text-sm flex items-center gap-2 hover:text-accent transition-colors">
          View All <ThemeIcon icon={ArrowUpRight} size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Featured Project */}
        {projects[0] && (
          <motion.div 
            whileHover={{ y: -8 }}
            className="md:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-border/50 relative overflow-hidden group"
          >
            <div className="aspect-video mb-8 overflow-hidden rounded-2xl bg-surface-container relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center text-accent/20">
                <Github size={120} />
              </div>
            </div>
            
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-headline font-black text-3xl md:text-5xl mb-4 tracking-tighter group-hover:text-accent transition-colors">{projects[0].name}</h3>
                <p className="font-body text-foreground/60 text-lg md:text-xl max-w-xl font-medium leading-relaxed">{projects[0].description}</p>
                
                <div className="flex flex-wrap gap-3 mt-8">
                  {projects[0].tech.map((t, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-accent/5 border border-accent/10 text-[10px] font-label font-black uppercase tracking-widest text-accent">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-primary-container text-on-primary-container px-5 py-2.5 rounded-full font-label text-[10px] uppercase font-black tracking-widest animate-pulse h-fit whitespace-nowrap">
                New Entry
              </div>
            </div>

            <div className="flex gap-6 mt-12 pt-8 border-t border-border">
              <a href={projects[0].github} className="text-foreground/40 hover:text-accent transition-colors flex items-center gap-2 font-label text-xs uppercase font-black">
                <Github size={18} /> Source
              </a>
              {projects[0].demo && (
                <a href={projects[0].demo} className="text-foreground/40 hover:text-accent transition-colors flex items-center gap-2 font-label text-xs uppercase font-black">
                  <ExternalLink size={18} /> Preview
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* Highlight Card */}
        <div className="md:col-span-4 bg-accent-tertiary rounded-3xl p-10 shadow-inner flex flex-col justify-between text-white md:rotate-2">
          <div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <ThemeIcon icon={Palette} size={32} className="text-white" />
            </div>
            <h3 className="font-headline font-black text-3xl mb-4 tracking-tight">COLOR <br /> THEORY</h3>
            <p className="font-body font-bold text-white/90 leading-relaxed text-lg">
              Defining moods through primary paper palettes and tactile layering.
            </p>
          </div>
          <button className="mt-12 font-label text-xs uppercase font-black border-b-2 border-white w-fit py-1 hover:pb-2 transition-all">
            Open Manifesto
          </button>
        </div>

        {/* Smaller Project cards or Lab Specimens */}
        <div className="md:col-span-4 bg-accent-secondary rounded-[2rem] p-10 shadow-lg h-96 flex flex-col justify-end text-white relative overflow-hidden group md:-rotate-1">
          <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:scale-110 transition-transform">
             <ThemeIcon icon={Zap} size={100} />
          </div>
          <h3 className="font-headline font-black text-4xl leading-tight relative z-10">PERFORMANCE <br /> SPECIMENS</h3>
        </div>

        <div className="md:col-span-4 bg-surface-container-highest rounded-3xl p-10 shadow-inner h-96 relative overflow-hidden border border-border/50 group">
          <div className="absolute inset-0 paper-grain opacity-20" />
          <div className="relative z-10 flex flex-col justify-center h-full text-center">
            <span className="font-label text-[10px] uppercase font-black text-accent mb-4 tracking-[0.3em]">Micro-Lab</span>
            <h3 className="font-headline font-black text-3xl tracking-tighter mb-4">THE DETAIL VIEW</h3>
            <p className="font-body text-foreground/50 font-medium">Exploring granular component states.</p>
          </div>
        </div>

        <div className="md:col-span-4 bg-white rounded-tr-[5rem] rounded-bl-[5rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-border/50 md:rotate-1">
          <div className="flex flex-col gap-6 h-full">
            <div className="flex gap-2">
              <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-label font-black uppercase tracking-widest">Brand</span>
              <span className="bg-accent-tertiary/10 text-accent-tertiary px-4 py-1.5 rounded-full text-[9px] font-label font-black uppercase tracking-widest">UI</span>
            </div>
            <h3 className="font-headline font-black text-3xl tracking-tighter">PROCESS LOGS</h3>
            <p className="font-body text-foreground/60 font-medium text-lg leading-relaxed">Daily snapshots of the creative grind and engineering discoveries.</p>
            <div className="mt-auto">
               <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-accent/40 group-hover:text-accent transition-colors">
                  <ArrowUpRight size={24} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
