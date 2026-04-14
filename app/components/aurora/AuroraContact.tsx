"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Sparkles } from "lucide-react";
import ThemeIcon from "../ThemeIcon";
import Magnetic from "../Magnetic";

export default function AuroraContact() {
  return (
    <section id="contact" className="py-24 px-6 lg:pr-96 relative overflow-hidden">
      {/* Immersive Background Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute -bottom-40 -left-20 w-[800px] h-[800px] bg-accent/20 rounded-full blur-3xl" 
        />
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-0 left-0 w-[40%] h-[60%] bg-accent-tertiary" 
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
        <motion.div 
          animate={{ 
            rotate: [0, 90, 0],
            borderRadius: ["35% 65% 65% 35% / 40% 45% 55% 60%", "65% 35% 35% 65% / 60% 55% 45% 40%", "35% 65% 65% 35% / 40% 45% 55% 60%"] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-20 w-[800px] h-[800px] bg-accent/20 blur-3xl opacity-50" 
        />
        <motion.div 
          animate={{ 
            rotate: [0, -90, 0],
            borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 60% 40% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 border border-accent/10 opacity-40 mix-blend-overlay" 
        />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="bg-white p-12 md:p-24 rounded-[3rem] border-2 border-border shadow-2xl relative overflow-hidden group">
          {/* Subtle Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="font-label text-xs font-black tracking-[0.6em] uppercase text-accent/60 mb-12 flex items-center gap-4">
              <Sparkles size={14} />
              Open for Specimens
              <Sparkles size={14} />
            </span>
            
            <h2 className="font-headline font-black text-6xl md:text-[10rem] tracking-tighter mb-16 leading-[0.85] uppercase text-foreground">
              Let&apos;s build <br /> <span className="text-accent underline decoration-accent/10 underline-offset-8">Beyond.</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-10">
              <Magnetic strength={0.2}>
                <a
                  href="mailto:harshbhadana40@gmail.com"
                  className="px-12 py-6 rounded-2xl bg-accent text-white font-headline font-black text-xl hover:scale-105 transition-all flex items-center gap-4 shadow-[0_20px_40px_-10px_rgba(193,36,44,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(193,36,44,0.4)]"
                >
                  <Mail size={24} />
                  Email Curator
                  <ArrowUpRight size={20} className="opacity-50" />
                </a>
              </Magnetic>

              <div className="flex items-center gap-6">
                <Magnetic strength={0.3}>
                  <a href="https://www.linkedin.com/in/harsh-bhadana-2a1793231/" target="_blank" rel="noopener noreferrer" 
                     className="w-20 h-20 rounded-2xl border-2 border-border bg-white flex items-center justify-center text-foreground/40 hover:text-accent hover:border-accent/40 transition-all shadow-sm">
                    <ThemeIcon icon={Linkedin} size={28} />
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <a href="https://github.com/harsh-bhadana" target="_blank" rel="noopener noreferrer" 
                     className="w-20 h-20 rounded-2xl border-2 border-border bg-white flex items-center justify-center text-foreground/40 hover:text-accent hover:border-accent/40 transition-all shadow-sm">
                    <ThemeIcon icon={Github} size={28} />
                  </a>
                </Magnetic>
              </div>
            </div>

            <div className="mt-20 pt-16 border-t border-border w-full">
              <p className="font-body text-foreground/30 text-sm font-bold uppercase tracking-widest italic flex items-center justify-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Status: Available for Research & Development 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
