"use client";

import { useTheme } from "../context/ThemeContext";
import Magnetic from "./Magnetic";

export default function Logo() {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  return (
    <Magnetic strength={0.3}>
      <a 
        href="/" 
        className={`px-3 md:px-4 text-lg md:text-xl font-black tracking-tighter hover:scale-110 transition-transform flex-shrink-0 ${
          isAurora ? "text-accent" : "text-foreground"
        }`}
      >
        HB<span className={`${isAurora ? "text-foreground" : "text-accent"}`}>.</span>
      </a>
    </Magnetic>
  );
}
