"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, MapPin, Instagram } from "lucide-react";

export default function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-40 pb-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="pt-20 flex flex-col gap-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex md:flex-col items-center md:items-start justify-between md:justify-start w-full md:w-auto gap-8">
            <a href="/" className="text-4xl font-black tracking-tighter hover:scale-105 transition-transform origin-left inline-block order-1 md:order-none">
              HB<span className="text-accent">.</span>
            </a>
            <div className="flex gap-4 order-2 md:order-none">
              <a href="https://github.com/harsh-bhadana" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:border-accent/40 transition-all group shrink-0">
                <Github size={20} className="text-foreground/60 group-hover:text-foreground" />
              </a>
              <a href="https://www.linkedin.com/in/harsh-bhadana-2a1793231/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:border-accent/40 transition-all group shrink-0">
                <Linkedin size={20} className="text-foreground/60 group-hover:text-foreground" />
              </a>
              <a href="https://www.instagram.com/harshbhadana40/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:border-accent/40 transition-all group shrink-0">
                <Instagram size={20} className="text-foreground/60 group-hover:text-foreground" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 flex items-center gap-2">
                <MapPin size={12} className="text-accent" /> Location
              </span>
              <p className="text-sm font-bold text-foreground/60 line-clamp-1">Faridabad, IN</p>
            </div>


            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Status</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <p className="text-sm font-bold text-accent">Open to Work</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 pt-10 border-t border-foreground/5">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 leading-none">
              © 2026 Harsh Bhadana
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 leading-none">
              Built with <span className="animate-gradient px-1">Speed</span>
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 hover:text-accent transition-colors"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-4 rounded-full bg-foreground/5 border border-foreground/10 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all"
            >
              <ArrowUp size={20} className="group-hover:text-accent transition-colors" />
            </motion.div>
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
