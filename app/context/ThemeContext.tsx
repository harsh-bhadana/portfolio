"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Theme = "eclipse" | "aurora";
type FontVariant = "default" | "super-funky";

interface ThemeContextType {
  theme: Theme;
  font: FontVariant;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("eclipse");
  const [font, setFont] = useState<FontVariant>("default");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<Theme>("eclipse");

  useEffect(() => {
    let savedTheme = localStorage.getItem("theme") as any;
    
    // Migration from old white theme to aurora
    if (savedTheme === "solar") {
      savedTheme = "aurora";
      localStorage.setItem("theme", "aurora");
    }

    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      if (savedTheme === "aurora") {
        applyAuroraFont();
      }
    }
  }, []);

  const applyAuroraFont = () => {
    setFont("super-funky");
    document.documentElement.setAttribute("data-font", "super-funky");
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    if (newTheme === "aurora") {
      applyAuroraFont();
    } else {
      setFont("default");
      document.documentElement.removeAttribute("data-font");
    }
  };

  const toggleTheme = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const themes: Theme[] = ["eclipse", "aurora"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nTheme = themes[nextIndex];
    
    setTargetTheme(nTheme);

    setTimeout(() => {
      setTheme(nTheme);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1600);
    }, 600);
  };

  return (
    <ThemeContext.Provider value={{ theme, font, setTheme, toggleTheme }}>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center pointer-events-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-2xl md:text-5xl font-black tracking-[0.4em] text-center px-4"
            >
              {[...(targetTheme === "aurora" ? "UNLOCKING THE FUN SIDE" : "RESTORING NORMALCY").split("")].map((char, i) => {
                const isPrefix = i < 9;
                const fromFont = targetTheme === "aurora" ? "var(--font-geist-sans)" : "var(--font-super-funky)";
                const toFont = targetTheme === "aurora" ? "var(--font-super-funky)" : "var(--font-geist-sans)";
                const colorClass = isPrefix 
                  ? (targetTheme === "aurora" ? "text-[#ff2a5f]" : "text-white opacity-50")
                  : "text-white";
                return (
                  <motion.span
                    key={i}
                    initial={{ fontFamily: fromFont }}
                    animate={{ fontFamily: toFont }}
                    transition={{ delay: 0.8 + i * 0.04, duration: 0 }}
                    className={colorClass}
                    style={{ 
                      display: "inline-block", 
                      whiteSpace: "pre", 
                      verticalAlign: "middle" 
                    }}
                  >
                    {char}
                  </motion.span>
                )
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
