"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface MorphTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per letter
  cycleDelay?: number; // ms between font cycles
}

const FONTS = [
  "font-body",     // Normal (Manrope)
  "font-dancing",  // Dancing Script
];

const MorphLetter = ({ char, fontClass, isActive }: { char: string; fontClass: string; isActive: boolean }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (char === " ") return;

    const interval = setInterval(() => {
      setRotation((Math.random() - 0.5) * 2);
    }, 2000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [char]);

  if (char === " ") return <span className="inline-block w-[0.25em]">&nbsp;</span>;

  return (
    <motion.span
      animate={{
        rotate: isActive ? [0, -3, 3, 0] : rotation,
        scale: isActive ? [1, 1.15, 1] : 1,
      }}
      transition={{
        duration: isActive ? 0.4 : 1,
        ease: "easeInOut"
      }}
      className={`inline-block transition-all duration-700 min-w-[0.55em] text-center font-medium ${fontClass}`}
    >
      {char}
    </motion.span>
  );
};

export default function MorphText({
  text,
  className = "",
  speed = 120, // Slightly faster
  cycleDelay = 1000 // Shorter pause for more continuous feel
}: MorphTextProps) {
  const characters = text.split("");
  const [targetFontIndex, setTargetFontIndex] = useState(1);
  const [activeCharIndex, setActiveCharIndex] = useState(-1);
  const [charFonts, setCharFonts] = useState<string[]>(Array(text.length).fill(FONTS[0]));

  // Track cycle count to trigger the next wave
  const [cycleTrigger, setCycleTrigger] = useState(0);

  useEffect(() => {
    let mounted = true;

    const runWave = async () => {
      // 1. Shift fonts sequentially
      for (let i = 0; i < text.length; i++) {
        if (!mounted) return;

        setActiveCharIndex(i);

        // Update font for this character
        setCharFonts(prev => {
          const next = [...prev];
          next[i] = FONTS[targetFontIndex];
          return next;
        });

        await new Promise(resolve => setTimeout(resolve, speed));
      }

      if (!mounted) return;
      setActiveCharIndex(-1);

      // 2. Wait for the delay before next font cycle
      await new Promise(resolve => setTimeout(resolve, cycleDelay));

      if (!mounted) return;

      // 3. Increment font index and trigger next loop
      setTargetFontIndex(prev => (prev + 1) % FONTS.length);
      setCycleTrigger(prev => prev + 1);
    };

    runWave();

    return () => {
      mounted = false;
    };
  }, [cycleTrigger, text.length, speed, cycleDelay, targetFontIndex]);

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {characters.map((char, index) => (
        <MorphLetter
          key={`${char}-${index}`}
          char={char}
          fontClass={charFonts[index]}
          isActive={activeCharIndex === index}
        />
      ))}
    </span>
  );
}
