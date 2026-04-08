"use client";

import { motion } from "framer-motion";
import { Hammer, RefreshCcw, Home, AlertCircle } from "lucide-react";
import Link from "next/link";
import ThemeIcon from "./components/ThemeIcon";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Shattered Glass Effect Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute border border-white/10 bg-white/5 backdrop-blur-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              clipPath: `polygon(${Math.random() * 100}% 0%, 100% ${Math.random() * 100}%, ${Math.random() * 100}% 100%, 0% ${Math.random() * 100}%)`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-12">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block"
        >
          <div className="relative p-8 rounded-[3rem] bg-accent/5 border border-accent/20 backdrop-blur-2xl">
            <div className="absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center bg-black border border-accent/20 rounded-2xl">
              <AlertCircle className="text-accent animate-pulse" size={24} />
            </div>
            <motion.h1 
              animate={{ 
                textShadow: ["0 0 0px #ff2a5f", "0 0 20px #ff2a5f", "0 0 0px #ff2a5f"],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-8xl md:text-9xl font-black tracking-tighter"
            >
              404
            </motion.h1>
            <div className="mt-4 flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent/60 mb-2">System Alert</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white/90">Specimen Lost in Void</h2>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            CRITICAL ERROR: The requested neural coordinate leads to an uninitialized memory sector. Interface connection terminated.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs flex items-center gap-4 rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Home className="relative z-10" size={18} />
                <span className="relative z-10 group-hover:text-white transition-colors">Re-establish Uplink</span>
              </motion.button>
            </Link>

            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 border border-white/10 hover:border-accent/40 text-white/60 hover:text-accent font-black uppercase tracking-widest text-xs flex items-center gap-4 rounded-2xl transition-all"
            >
              <RefreshCcw size={18} className="animate-spin-slow" />
              Recalibrate Sensors
            </button>
          </div>
        </motion.div>

        <div className="pt-20">
          <div className="flex items-center justify-center gap-2 overflow-hidden px-10">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: [2, 10, 2],
                  opacity: [0.1, 0.4, 0.1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: Math.random() * 2 + 1,
                  delay: Math.random() * 2
                }}
                className="w-1 bg-accent/50 rounded-full"
              />
            ))}
          </div>
          <span className="text-[9px] font-mono text-white/10 uppercase tracking-[0.4em] mt-4 block">Neural Signal Monitor // No Input Detected</span>
        </div>
      </div>

      {/* Static Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50"></div>
    </div>
  );
}
