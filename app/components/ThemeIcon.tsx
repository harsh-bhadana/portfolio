"use client";

import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import UseAnimations from "react-useanimations";
import githubAnim from "react-useanimations/lib/github";
import mailAnim from "react-useanimations/lib/mail";
import linkedinAnim from "react-useanimations/lib/linkedin";
import activityAnim from "react-useanimations/lib/activity";
import exploreAnim from "react-useanimations/lib/explore";
import folderAnim from "react-useanimations/lib/folder";
import videoAnim from "react-useanimations/lib/video";
import editAnim from "react-useanimations/lib/edit";
import settingsAnim from "react-useanimations/lib/settings";
import arrowUpAnim from "react-useanimations/lib/arrowUp";

interface ThemeIconProps {
  icon: React.ElementType;
  size?: number;
  className?: string;
  delay?: number;
}

export default function ThemeIcon({ icon: Icon, size = 24, className = "", delay = 0 }: ThemeIconProps) {
  const { theme } = useTheme();

  if (theme === "aurora") {
    // Generate a random gradient configuration for the SVG drop shadow to make it extremely "colorful"
    const randomColor1 = ["#ff2a5f", "#00e5ff", "#ffaa00"][Math.floor(Math.random() * 3)];
    
    // Map the incoming Lucide icon to a "proper" Lottie-based animated icon based on name
    const iconName = (Icon as any)?.displayName || (Icon as any)?.name || "";
    const nameLower = iconName.toLowerCase();
    
    let anim = settingsAnim; // fallback
    if (nameLower.includes("github")) anim = githubAnim;
    else if (nameLower.includes("mail")) anim = mailAnim;
    else if (nameLower.includes("linkedin")) anim = linkedinAnim;
    else if (nameLower.includes("dashboard") || nameLower.includes("cpu") || nameLower.includes("zap")) anim = activityAnim;
    else if (nameLower.includes("globe")) anim = exploreAnim;
    else if (nameLower.includes("database") || nameLower.includes("layers")) anim = folderAnim;
    else if (nameLower.includes("camera")) anim = videoAnim;
    else if (nameLower.includes("paintbrush")) anim = editAnim;
    else if (nameLower.includes("external") || nameLower.includes("upright")) anim = arrowUpAnim;

    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        {/* Colorful Glow Effect Behind */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay }}
          className="absolute inset-0 rounded-full blur-[10px] opacity-60 mix-blend-screen pointer-events-none"
          style={{ background: `radial-gradient(circle, ${randomColor1} 0%, transparent 70%)` }}
        />
        
        {/* Proper Lottie-Animated Icon */}
        <div className="relative z-10 flex items-center justify-center" style={{ color: randomColor1, filter: `drop-shadow(0 0 6px ${randomColor1})` }}>
          <UseAnimations
            animation={anim}
            size={Math.max(size * 1.2, 24)} // Animated icons usually have some internal padding
            strokeColor={randomColor1}
            pathCss={`stroke: ${randomColor1}; fill: ${randomColor1};`}
          />
        </div>
      </div>
    );
  }

  // Default / Minimalistic Eclipse Icon
  return <Icon size={size} className={className} />;
}
