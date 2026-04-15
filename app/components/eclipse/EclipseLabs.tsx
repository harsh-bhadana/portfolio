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
      <div className="mb-12">
        <span className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4 block">03 / Lab Phase</span>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6 italic">Specimen <span className="animate-gradient not-italic">Exploration</span></h2>
        <p className="text-foreground/50 text-xl font-medium leading-relaxed max-w-2xl">
          Exploring the architectural frontier of <span className="text-foreground font-black">Next.js 16</span> and <span className="text-foreground font-black">React 19</span> through isolated research specimens.
        </p>
      </div>

      <div className="rounded-[2.5rem] md:rounded-[3rem] bg-black/40 border border-foreground/10 overflow-hidden shadow-2xl relative group h-auto md:h-[700px] flex flex-col">
        <div className="flex items-center justify-between px-8 py-5 border-b border-foreground/5 bg-foreground/[0.03] shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden items-stretch">
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-foreground/5 bg-foreground/[0.01] p-4 md:p-6 flex lg:flex-col gap-4 lg:gap-8 overflow-x-auto lg:overflow-y-auto custom-scrollbar shrink-0">
            {labs.map((lab, i) => {
              const isActive = activeLabIndex === i;
              return (
                <div key={i} className="space-y-4 shrink-0 lg:shrink">
                  <button 
                    onClick={() => setActiveLabIndex(i)}
                    className={`flex items-center gap-3 md:gap-4 w-full text-left transition-all group py-2 ${isActive ? "text-accent" : "text-foreground/30 hover:text-foreground/60"}`}
                  >
                    <ThemeIcon icon={lab.icon} size={20} />
                    <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] whitespace-nowrap">{lab.category}</span>
                    {isActive && (
                      <motion.div layoutId="active-lab-dot" className="hidden lg:block w-2 h-2 rounded-full bg-accent ml-auto" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div 
            ref={scrollContainerRef}
            className="lg:col-span-8 p-6 md:p-12 overflow-y-auto lg:h-full custom-scrollbar bg-foreground/[0.005]"
            onWheel={(e) => {
              const now = Date.now();
              if (now - scrollThrottleRef.current < 1000) return;

              const el = e.currentTarget;
              if (e.deltaY > 0) {
                if (el.scrollHeight - el.scrollTop - el.clientHeight < 5) {
                  if (activeLabIndex < labs.length - 1) {
                    scrollThrottleRef.current = now;
                    setActiveLabIndex(prev => prev + 1);
                  }
                }
              } else if (e.deltaY < 0) {
                if (el.scrollTop < 5) {
                  if (activeLabIndex > 0) {
                    scrollThrottleRef.current = now;
                    setActiveLabIndex(prev => prev - 1);
                  }
                }
              }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeLabIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-10"
              >
                <div className="border-l-4 border-accent pl-8 py-2">
                  <h3 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">{labs[activeLabIndex].category}</h3>
                  <p className="text-foreground/40 font-medium text-lg leading-none">{labs[activeLabIndex].tagline}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {labs[activeLabIndex].items.map((item, j) => (
                    <motion.a 
                      key={j}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: j * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="p-8 rounded-[2rem] bg-foreground/5 border border-foreground/10 hover:border-accent/40 transition-all group/card relative overflow-hidden flex flex-col cursor-pointer"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover/card:opacity-100 transition-opacity">
                         <ArrowUpRight size={24} className="text-accent" />
                      </div>
                      <div className="flex items-center gap-3 mb-6 flex-wrap">
                         <span className="text-[10px] font-black tracking-widest uppercase bg-accent/20 px-3 py-1.5 rounded-md text-accent">{item.badge}</span>
                         <span className="text-[10px] font-mono font-bold text-foreground/30 italic">{item.path.split('/').pop()}</span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-black mb-4 group-hover/card:text-white transition-colors tracking-tight leading-tight">{item.name}</h4>
                      <p className="text-foreground/50 text-sm font-bold leading-relaxed mb-8 italic">{item.desc}</p>
                      <div className="text-[10px] font-mono text-foreground/30 flex items-center gap-3 font-bold cursor-default mt-auto">
                         <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                         specimens/{item.path}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="p-4 border-t border-foreground/5 bg-foreground/[0.02] flex items-center justify-between text-[9px] font-mono font-bold text-foreground/20 tracking-widest px-10 backdrop-blur-3xl shrink-0">
          <div className="flex items-center gap-6">
            <span className="text-accent animate-pulse uppercase">active_sector: {labs[activeLabIndex].category.split(' ').pop()}</span>
            <span>STATUS: 200 OK</span>
            <span className="hidden md:inline">COMPILER: REACT_FORGET_V19</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/40 italic">
            &quot;use cache&quot;; <Sparkles size={10} className="text-accent" />
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
