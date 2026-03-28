"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useState } from "react";

export default function PhaseToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 800);
  };

  const icons = {
    eclipse: <Moon size={18} />,
    solar: <Sun size={18} />,
    aether: <Sparkles size={18} />,
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="w-10 h-10 rounded-xl glass flex items-center justify-center text-foreground hover:text-accent transition-colors relative z-50 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="flex items-center justify-center"
          >
            {icons[theme]}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Phase Shift Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 40, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent pointer-events-none z-[100] blur-3xl"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
