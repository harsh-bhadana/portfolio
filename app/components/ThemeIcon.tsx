"use client";

import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";

import { 
  AnimatedDashboard, 
  AnimatedCPU, 
  AnimatedDatabase, 
  AnimatedLayers, 
  AnimatedCamera, 
  AnimatedZap, 
  AnimatedPaintbrush, 
  AnimatedGlobe,
  AnimatedGithub,
  AnimatedMail,
  AnimatedLinkedin,
  AnimatedExternalLink
} from "./AnimatedTechnicalIcons";

interface ThemeIconProps {
  icon: React.ElementType;
  size?: number;
  className?: string;
  delay?: number;
}

// Vivid neon palette for dark backgrounds
const DARK_BG_COLORS = ["#ff2a5f", "#00e5ff", "#ffaa00"];
// High-contrast palette for light/bright backgrounds (e.g. accent contact section)
const LIGHT_BG_COLORS = ["#1a0b2e", "#003344", "#3d2000"];

/** Parse rgb/rgba string into [r, g, b] */
function parseRgb(str: string): [number, number, number] | null {
  const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return null;
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
}

/** Relative luminance (0 = black, 1 = white) */
function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** Walk up DOM tree and return the first non-transparent bg luminance */
function getBgLuminance(el: HTMLElement): number {
  let node: HTMLElement | null = el.parentElement;
  while (node && node !== document.body) {
    const bg = getComputedStyle(node).backgroundColor;
    const rgb = parseRgb(bg);
    if (rgb) {
      const [r, g, b] = rgb;
      // Ignore fully/near-fully transparent
      if (r + g + b > 0) return luminance(r, g, b);
    }
    node = node.parentElement;
  }
  // Default: treat as dark background
  return 0.05;
}

export default function ThemeIcon({ icon: Icon, size = 24, className = "", delay = 0 }: ThemeIconProps) {
  const { theme } = useTheme();
  const [iconColor, setIconColor] = useState(DARK_BG_COLORS[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (theme !== "aurora" || !ref.current) return;
    const lum = getBgLuminance(ref.current);
    // Luminance > 0.2 = visually bright/light background → use dark contrasting colors
    const palette = lum > 0.2 ? LIGHT_BG_COLORS : DARK_BG_COLORS;
    setIconColor(palette[Math.floor(Math.random() * palette.length)]);
  }, [theme]);

  if (theme === "aurora") {
    const iconName = (Icon as any)?.displayName || (Icon as any)?.name || "";
    const nameLower = iconName.toLowerCase();

    let CustomAnimComp = null;
    if (nameLower.includes("dashboard")) CustomAnimComp = AnimatedDashboard;
    else if (nameLower.includes("cpu")) CustomAnimComp = AnimatedCPU;
    else if (nameLower.includes("database")) CustomAnimComp = AnimatedDatabase;
    else if (nameLower.includes("layers")) CustomAnimComp = AnimatedLayers;
    else if (nameLower.includes("camera")) CustomAnimComp = AnimatedCamera;
    else if (nameLower.includes("zap")) CustomAnimComp = AnimatedZap;
    else if (nameLower.includes("paintbrush")) CustomAnimComp = AnimatedPaintbrush;
    else if (nameLower.includes("globe")) CustomAnimComp = AnimatedGlobe;
    else if (nameLower.includes("github")) CustomAnimComp = AnimatedGithub;
    else if (nameLower.includes("mail")) CustomAnimComp = AnimatedMail;
    else if (nameLower.includes("linkedin")) CustomAnimComp = AnimatedLinkedin;
    else if (nameLower.includes("external") || nameLower.includes("upright")) CustomAnimComp = AnimatedExternalLink;

    return (
      <div
        ref={ref}
        className={`relative flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay }}
          className="absolute inset-0 rounded-full blur-[10px] opacity-60 mix-blend-screen pointer-events-none"
          style={{ background: `radial-gradient(circle, ${iconColor} 0%, transparent 70%)` }}
        />

        <div className="relative z-10 flex items-center justify-center" style={{ filter: `drop-shadow(0 0 6px ${iconColor})` }}>
          {CustomAnimComp ? (
            <CustomAnimComp size={Math.max(size * 1.2, 24)} color={iconColor} />
          ) : (
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
               <Icon size={size} color={iconColor} strokeWidth={2.5} />
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return <Icon size={size} className={className} />;
}
