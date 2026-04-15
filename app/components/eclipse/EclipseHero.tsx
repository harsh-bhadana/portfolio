"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import TextReveal from "../TextReveal";
import Magnetic from "../Magnetic";

export default function EclipseHero() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-accent text-[10px] font-black tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Available for new projects
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-[10rem] font-black tracking-tighter mb-10 leading-[1.1] md:leading-[1.0] flex flex-wrap gap-x-4 md:gap-x-8 items-center justify-center md:justify-start md:items-baseline mix-blend-difference py-4 text-center md:text-left">
          <TextReveal text="Harsh" wordByWord={false} className="text-5xl sm:text-7xl md:text-[10rem]" />
          <TextReveal
            text="Bhadana"
            wordByWord={false}
            delay={0.5}
            className="text-5xl sm:text-7xl md:text-[10rem] text-gradient pb-2"
          />
        </h1>

        <p className="max-w-xl text-xl md:text-2xl text-foreground/70 font-medium leading-relaxed mb-12 text-center md:text-left mx-auto md:mx-0">
          Senior <span className="text-accent italic">Frontend Developer</span> crafting high-performance, secure, and user-centric digital experiences.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 items-center justify-center md:justify-start">
          <Magnetic strength={0.2}>
            <a
              href="#experience"
              className="group px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-white text-black font-bold hover:bg-accent hover:text-white transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              View Experience
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href="#contact"
              className="px-8 md:px-10 py-4 md:py-5 rounded-2xl border-2 border-foreground/10 font-bold hover:bg-foreground/5 transition-all text-foreground/80 text-center flex items-center justify-center"
            >
              Get in Touch
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
