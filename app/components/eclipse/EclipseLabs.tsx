"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import ThemeIcon from "../ThemeIcon";
import Magnetic from "../Magnetic";
import { FeatureLab } from "../../types/portfolio";
import { useRef, useState, useEffect } from "react";

export default function EclipseLabs({ labs }: { labs: FeatureLab[] }) {
  const [activeLabIndex, setActiveLabIndex] = useState(0);
  const scrollThrottleRef = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeLabIndex]);

  return (
    <section id="labs" className="min-h-screen flex flex-col justify-center py-24 snap-start snap-always max-w-6xl mx-auto overflow-hidden scroll-mt-32">
      <div className="mb-16 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4 block">03 / Lab Phase</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6 italic">Specimen <span className="animate-gradient not-italic">Exploration</span></h2>
            <p className="text-foreground/50 text-xl font-medium leading-relaxed max-w-2xl">
              Exploring the architectural frontier of <span className="text-foreground font-black">Next.js 16</span> and <span className="text-foreground font-black">React 19</span> through isolated research specimens.
            </p>
          </div>
          
          <div className="hidden lg:flex flex-col items-end text-right font-mono text-[10px] text-foreground/20 font-bold uppercase tracking-[0.3em]">
             <span>System_Mode: Research_Active</span>
             <span className="text-accent">Sector: {labs[activeLabIndex].category.split(' ').pop()}</span>
             <span>Freq: 2.4GHz_PPR_V1</span>
          </div>
        </div>
      </div>

      <div className="rounded-[2.5rem] md:rounded-[3.5rem] bg-black/60 border border-foreground/10 overflow-hidden shadow-2xl relative group flex flex-col border-b-4 border-b-accent/20">
        {/* Command Dock - Top Navigation */}
        <div className="flex flex-col md:flex-row items-center border-b border-foreground/5 bg-foreground/[0.03] backdrop-blur-3xl shrink-0 z-20">
           <div className="flex items-center gap-2 px-8 py-5 border-r border-foreground/5 shrink-0">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]/20 border border-[#ff5f56]/50 shadow-[0_0_10px_rgba(255,95,86,0.3)]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]/20 border border-[#ffbd2e]/50" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]/20 border border-[#27c93f]/50" />
           </div>

           <div className="flex-1 flex overflow-x-auto no-scrollbar scroll-smooth px-4">
              {labs.map((lab, i) => {
                const isActive = activeLabIndex === i;
                return (
                  <button 
                    key={i}
                    onClick={() => setActiveLabIndex(i)}
                    className={`flex items-center gap-3 px-8 py-5 transition-all relative shrink-0 group/btn ${isActive ? "text-accent" : "text-foreground/30 hover:text-foreground/60"}`}
                  >
                    <ThemeIcon icon={lab.icon} size={18} className={isActive ? "animate-pulse" : ""} />
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">{lab.category}</span>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="active-lab-link" 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]" 
                      />
                    )}
                  </button>
                );
              })}
           </div>

           <div className="hidden md:flex px-8 py-5 border-l border-foreground/5 font-mono text-[10px] text-accent/50 font-bold tracking-widest animate-pulse">
              [ ACCESS_GRANTED ]
           </div>
        </div>

        {/* Technical Viewport */}
        <div className="relative flex-1 min-h-[500px] md:min-h-[600px] bg-[url('/grid-dark.svg')] bg-[length:40px_40px] overflow-hidden">
          {/* Scanning Line Animation */}
          <motion.div 
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-accent/5 to-transparent z-10 pointer-events-none"
          />

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeLabIndex}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px) brightness(2)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(5px) grayscale(1)" }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="p-8 md:p-14 h-full overflow-y-auto custom-scrollbar relative z-20"
            >
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-foreground/5 pb-12">
                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">{labs[activeLabIndex].category}</h3>
                    <p className="text-foreground/40 font-medium text-xl leading-none italic">{labs[activeLabIndex].tagline}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="px-5 py-2 rounded-xl bg-foreground/5 border border-foreground/10 text-[10px] font-mono text-accent font-bold">
                       0x7FE_{activeLabIndex}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {labs[activeLabIndex].items.map((item, j) => (
                    <motion.a 
                      key={j}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: j * 0.1 }}
                      className="group/card relative rounded-[2.5rem] bg-foreground/[0.02] border border-foreground/5 hover:border-accent/40 hover:bg-foreground/[0.04] transition-all p-8 flex flex-col overflow-hidden"
                    >
                      {/* Interactive Data Fragment Background */}
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/card:opacity-20 transition-opacity">
                         <span className="font-mono text-[40px] font-black">{j + 1}</span>
                      </div>

                      <div className="flex items-center gap-3 mb-8 flex-wrap">
                         <span className="text-[10px] font-black tracking-widest uppercase bg-accent/10 px-3 py-1.5 rounded-lg text-accent border border-accent/20">
                            {item.badge}
                         </span>
                         {item.is_experimental && (
                           <span className="text-[10px] font-black tracking-widest uppercase bg-red-500/10 px-3 py-1.5 rounded-lg text-red-500 flex items-center gap-1.5 border border-red-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                              Experimental
                           </span>
                         )}
                         <span className="text-[10px] font-mono font-bold text-foreground/20 italic ml-auto group-hover/card:text-accent/40 transition-colors">
                            CORE::{item.included_in.replace(' ', '_').toUpperCase()}
                         </span>
                      </div>
                      
                      <h4 className="text-2xl md:text-3xl font-black mb-3 group-hover/card:text-white transition-colors tracking-tight leading-tight uppercase group-hover/card:translate-x-1 transition-transform">
                        {item.name}
                      </h4>
                      <p className="text-accent font-black text-[11px] uppercase tracking-[0.2em] mb-6 opacity-60">
                        {item.purpose}
                      </p>
                      
                      <p className="text-foreground/50 text-base font-medium leading-relaxed mb-8 italic">
                        {item.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-10">
                        {item.tech_used.map((tech, k) => (
                          <span key={k} className="text-[9px] font-black uppercase tracking-widest border border-foreground/10 px-2 py-1 rounded-md bg-foreground/[0.02] text-foreground/30 group-hover/card:border-accent/30 group-hover/card:text-accent transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="text-[10px] font-mono text-foreground/20 font-bold uppercase tracking-widest flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-accent/30" />
                           view_specimen
                        </div>
                        <ArrowUpRight size={20} className="text-foreground/10 group-hover/card:text-accent group-hover/card:scale-110 transition-all" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-5 border-t border-foreground/5 bg-foreground/[0.03] flex items-center justify-between text-[10px] font-mono font-bold text-foreground/40 tracking-widest px-10 backdrop-blur-3xl shrink-0">
          <div className="flex items-center gap-8">
            <span className="text-accent flex items-center gap-2">
               <span className="inline-block w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
               SYSTEM_LIVE: OK
            </span>
            <span className="hidden md:inline">ARCHITECTURE: NEXT_PPR_V16</span>
            <span className="hidden lg:inline text-foreground/20">MEM: 0x00FF821_{activeLabIndex}</span>
          </div>
          <div className="flex items-center gap-3 text-foreground/40 italic">
            &quot;use cache&quot; directive active <Sparkles size={12} className="text-accent animate-pulse" />
          </div>
        </div>
      </div>

      
      <Magnetic strength={0.2}>
        <a href="https://github.com/harsh-bhadana/next-labs" target="_blank" rel="noopener noreferrer" className="group mt-12 mx-auto px-10 py-5 rounded-full bg-foreground text-background font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-6 hover:bg-accent hover:text-white transition-all transform hover:scale-[1.02] border-2 border-transparent hover:border-white/20">
          Inspect Extended Laboratory
          <ThemeIcon icon={Github} size={20} className="group-hover:rotate-[360deg] transition-transform duration-700" />
        </a>
      </Magnetic>
    </section>
  );
}
