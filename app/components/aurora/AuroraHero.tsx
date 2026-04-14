"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import ThemeIcon from "../ThemeIcon";
import MorphText from "./MorphText";

export default function AuroraHero() {
  return (
    <section id="about" className="relative min-h-[90vh] flex items-center pt-24 pb-40 overflow-hidden">
      {/* Collage Geometry Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Large Primary Triangle */}
        <motion.div 
          initial={{ opacity: 0, rotate: -20, x: -100 }}
          animate={{ opacity: 0.1, rotate: -12, x: -50 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-20 -left-20 w-[70%] h-[90%] bg-accent rounded-none" 
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
        {/* Tertiary Semi-Circle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, x: 100 }}
          animate={{ opacity: 0.1, scale: 1, x: 50 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
          className="absolute top-[10%] -right-40 w-[600px] h-[600px] bg-accent-tertiary rounded-full" 
        />
        {/* Secondary Overlapping Shape */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0.08, y: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
          className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-accent-secondary rounded-full" 
        />
      </div>

      <div className="container mx-auto px-6 lg:pl-96 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border-2 border-accent text-accent font-label text-[10px] font-black tracking-[0.2em] uppercase mb-10 shadow-[0_8px_0_#c1242c10] rotate-[-1deg]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              Available for Research & Dev
            </div>

            <h1 className="font-headline font-black text-6xl md:text-9xl tracking-tighter leading-[0.9] mb-10 text-foreground relative z-50">
              <span className="block italic opacity-90 underline decoration-accent/20 relative z-50">
                <MorphText text="HARSH" />
              </span>
              <span className="relative z-50 inline-block px-8 py-3 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.1)] rounded-2xl text-accent transform -rotate-3 my-4 border border-border/50">
                <MorphText text="BHADANA" />
              </span>
            </h1>
            
            <p className="font-body text-xl md:text-2xl text-foreground/70 max-w-xl mb-14 leading-relaxed font-medium italic">
              Senior <span className="text-accent">Frontend Developer</span> crafting high-performance, secure, and user-centric digital experiences.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <a 
                href="#projects" 
                className="group relative inline-flex items-center gap-4 bg-accent px-10 py-6 rounded-full text-white font-label font-black text-lg uppercase tracking-widest shadow-[0_20px_50px_rgba(193,36,44,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                Start Exploring
                <ThemeIcon icon={ArrowRight} size={20} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Collage Items */}
        <div className="hidden xl:block absolute top-0 right-10 w-1/3 h-full pointer-events-none">
          <div className="relative w-full h-full">
            <motion.div 
              initial={{ rotate: 15, y: 40, opacity: 0 }}
              animate={{ rotate: 6, y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute top-20 right-0 w-64 h-80 bg-white rounded-2xl shadow-2xl p-4 border border-border/50"
            >
              <div className="w-full h-full bg-surface-container rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-2 w-2/3 bg-foreground/10 rounded-full mb-2" />
                  <div className="h-2 w-1/2 bg-foreground/5 rounded-full" />
                </div>
              </div>
            </motion.div>

            <motion.a 
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute top-[440px] right-4 bg-white px-8 py-5 rounded-2xl shadow-xl font-label text-sm uppercase font-black tracking-widest text-accent border-2 border-accent/10 hover:border-accent hover:scale-105 active:scale-95 transition-all flex items-center gap-3 pointer-events-auto rotate-[-3deg] z-40"
            >
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
                <ThemeIcon icon={Mail} size={14} />
              </div>
              Contact me
            </motion.a>

            <motion.div 
              initial={{ rotate: -20, y: 60, opacity: 0 }}
              animate={{ rotate: -12, y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute top-72 -left-20 w-56 h-72 bg-white rounded-2xl shadow-2xl p-4 z-20 border border-border/50"
            >
              <div className="w-full h-full bg-surface-container rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-tertiary/10 to-accent/5" />
                <div className="absolute top-4 left-4 right-4">
                  <div className="h-2 w-3/4 bg-accent/20 rounded-full" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
              className="absolute top-1/2 right-12 bg-accent-tertiary px-5 py-2.5 rounded-xl font-label text-xs uppercase font-black rotate-[15deg] shadow-lg z-30 text-white"
            >
              Texture Vol. 01
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
