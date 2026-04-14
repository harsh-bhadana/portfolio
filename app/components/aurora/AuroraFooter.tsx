"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import ThemeIcon from "../ThemeIcon";

export default function AuroraFooter() {
  return (
    <footer className="bg-foreground text-background py-24 px-6 lg:pl-96 relative overflow-hidden">
      {/* Decorative large text overlay */}
      <div className="absolute top-0 right-0 text-[20rem] font-black opacity-5 leading-none translate-x-1/4 -translate-y-1/4 pointer-events-none select-none">
        MMPX
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="md:col-span-2">
          <div className="text-4xl font-headline font-black text-accent italic mb-8">HARSH.BHADANA</div>
          <p className="font-body text-background/60 max-w-sm leading-relaxed text-lg font-medium">
            Designed for the tactile visionary. Engineering the digital world to feel just as layered as the physical one.
          </p>
          
          <div className="flex gap-6 mt-10">
            <SocialLink icon={Github} href="https://github.com/harsh-bhadana" />
            <SocialLink icon={Linkedin} href="https://www.linkedin.com/in/harsh-bhadana-2a1793231/" />
            <SocialLink icon={Mail} href="mailto:harshbhadana40@gmail.com" />
          </div>
        </div>

        <div>
          <h4 className="font-label uppercase font-black text-accent mb-8 tracking-[0.2em] text-xs">Manifesto</h4>
          <ul className="space-y-4 font-label text-sm uppercase font-bold text-background/40">
            <li><a className="hover:text-white transition-colors" href="#">Our Process</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Curation Ethics</a></li>
            <li><a className="hover:text-white transition-colors" href="#">The Paper Lab</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-label uppercase font-black text-accent mb-8 tracking-[0.2em] text-xs">Network</h4>
          <ul className="space-y-4 font-label text-sm uppercase font-bold text-background/40">
            <li><a className="hover:text-white transition-colors" href="#">Engineering</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Substack</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Studio Visit</a></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-24 pt-10 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-6 text-background/30 px-4 relative z-10">
        <p className="font-label text-xs uppercase font-black tracking-widest">© 2024 PORTFOLIO EDITION 01</p>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
           <p className="font-label text-xs uppercase font-black tracking-widest">HAND-CUT WITH PRECISION</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href }: { icon: any; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-12 h-12 rounded-2xl border border-background/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 group"
    >
      <ThemeIcon icon={icon} size={20} className="text-background/50 group-hover:text-white" />
    </a>
  );
}
