"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

interface DockItemProps {
  mouseY: MotionValue<number>;
  icon: React.ReactNode;
  label: string;
  href: string;
}

function DockItem({ mouseY, icon, label, href }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - (bounds.y + bounds.height / 2);
  });

  const sizeSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.8, 1]);

  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="relative block">
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md transition-colors hover:bg-white/20 hover:border-white/30"
      >
        <motion.div style={{ scale }} className="flex items-center justify-center text-white">
          {icon}
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: "-50%" }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: 10, y: "-50%" }}
            className="absolute top-1/2 right-[calc(100%+16px)] px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-[70]"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
}

const dockItems = [
  { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/harsh-bhadana-2a1793231/" },
  { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/harsh-bhadana" },
  { icon: <FileText size={20} />, label: "Resume", href: "/resume.pdf" },
  { icon: <Mail size={20} />, label: "Email", href: "mailto:harshbhadana40@gmail.com" },
];

export default function FloatingDock() {
  const mouseY = useMotionValue(Infinity);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[60] hidden md:block">
      <motion.div
        onMouseMove={(e) => mouseY.set(e.pageY)}
        onMouseLeave={() => mouseY.set(Infinity)}
        className="flex flex-col items-center gap-4 px-3 py-4 rounded-3xl bg-black/20 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        {dockItems.map((item, index) => (
          <DockItem key={index} mouseY={mouseY} {...item} />
        ))}
      </motion.div>
    </div>
  );
}
