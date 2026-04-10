"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Code, 
  Terminal, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Zap, 
  Monitor,
  Layout,
  Server
} from "lucide-react";

const icons = [
  Code, Terminal, Cpu, Database, Globe, Layers, Zap, Monitor, Layout, Server
];

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [activeIcons, setActiveIcons] = useState<{ id: number; Icon: any; x: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate icons
    const newIcons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 80 + 10, // 10% to 90%
      delay: Math.random() * 1,
    }));
    setActiveIcons(newIcons);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Rising and Popping Icons */}
          {activeIcons.map((item) => (
            <motion.div
              key={item.id}
              initial={{ 
                y: "120vh", 
                x: `${item.x}vw`, 
                scale: 0.5, 
                opacity: 0 
              }}
              animate={{ 
                y: ["120vh", "50vh", "-20vh"],
                scale: [0.5, 1.5, 0.8],
                opacity: [0, 1, 1, 0],
                filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(2px)"]
              }}
              transition={{ 
                duration: 2.5, 
                delay: item.delay,
                ease: "easeOut"
              }}
              className="absolute text-accent/40"
            >
              <item.Icon size={32} />
              {/* Subtle Glow Trail */}
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}

          {/* Central Burst Icon */}
          <div className="relative z-20">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 1]
              }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-10 rounded-[3rem] bg-accent/5 border border-accent/20 backdrop-blur-3xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Code size={48} className="text-accent" />
              </motion.div>
              
              <div className="mt-6 flex flex-col items-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-[10px] font-black tracking-[0.6em] text-accent/60 uppercase"
                >
                  Compiling Portfolio
                </motion.span>
                <div className="mt-3 w-32 h-1 bg-accent/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
                    className="w-full h-full bg-accent"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Background Grid Pattern (Matching theme) */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,95,0.03)_0%,transparent_70%)] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
