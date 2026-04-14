"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Sparkles } from "lucide-react";
import ThemeIcon from "../ThemeIcon";
import Magnetic from "../Magnetic";

export default function AuroraContact() {
  return (
    <section id="contact" className="py-24 px-6 lg:pl-96 bg-surface-dim relative overflow-hidden">
      {/* Background Decorative "Paper Cutout" */}
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-accent opacity-[0.02] -rotate-12 translate-y-1/2 translate-x-1/4 hidden lg:block" />
      
      <div className="container mx-auto max-w-6xl">
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
