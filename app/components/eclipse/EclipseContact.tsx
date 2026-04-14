"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import ThemeIcon from "../ThemeIcon";
import Magnetic from "../Magnetic";

export default function EclipseContact() {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always scroll-mt-32">
      <div className="p-10 md:p-32 rounded-[2.5rem] md:rounded-[4rem] bg-accent text-white relative overflow-hidden group">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            borderRadius: ["35% 65% 65% 35% / 40% 45% 55% 60%", "65% 35% 35% 65% / 60% 55% 45% 40%", "35% 65% 65% 35% / 40% 45% 55% 60%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-foreground/10 blur-3xl"
        />

        <div className="relative z-10 text-center flex flex-col items-center">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase mb-12 opacity-60">Get in touch</span>
          <h2 className="text-5xl md:text-9xl font-black tracking-tighter mb-16 leading-[1.0] md:leading-[0.8] mix-blend-overlay uppercase">
            LET&apos;S GO <br /> BEYOND
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="mailto:harshbhadana40@gmail.com"
              className="px-10 py-5 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-all flex items-center gap-2"
            >
              <ThemeIcon icon={Mail} size={20} /> Email Me
            </a>
            <div className="flex items-center gap-4">
              <Magnetic strength={0.3}>
                <a href="https://www.linkedin.com/in/harsh-bhadana-2a1793231/" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border-2 border-white/20 hover:bg-white/10 transition-all flex items-center justify-center">
                  <ThemeIcon icon={Linkedin} size={24} />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a href="https://github.com/harsh-bhadana" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border-2 border-white/20 hover:bg-white/10 transition-all flex items-center justify-center">
                  <ThemeIcon icon={Github} size={24} />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
