"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "eclipse" | "aurora";
type FontVariant = "default" | "bangers" | "chewy" | "luckiest";

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
        randomizeFont();
      }
    }
  }, []);

  const randomizeFont = () => {
    const fonts: FontVariant[] = ["bangers", "chewy", "luckiest"];
    const random = fonts[Math.floor(Math.random() * fonts.length)];
    setFont(random);
    document.documentElement.setAttribute("data-font", random);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    if (newTheme === "aurora") {
      randomizeFont();
    } else {
      setFont("default");
      document.documentElement.removeAttribute("data-font");
    }
  };

  const toggleTheme = () => {
    const themes: Theme[] = ["eclipse", "aurora"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, font, setTheme, toggleTheme }}>
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
