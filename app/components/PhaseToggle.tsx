"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useState, useRef } from "react";

export default function PhaseToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const icons = {
    eclipse: <Moon size={18} />,
    solar: <Sun size={18} />,
    aether: <Sparkles size={18} />,
  };

  return (
    <div className="relative">
      <motion.button
        ref={buttonRef}
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

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 150, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            style={{ 
              left: coords.x, 
              top: coords.y,
              position: 'fixed',
              transform: 'translate(-50%, -50%)',
              willChange: "transform, opacity"
            }}
            className="w-4 h-4 rounded-full bg-accent pointer-events-none z-[100] blur-[60px]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
