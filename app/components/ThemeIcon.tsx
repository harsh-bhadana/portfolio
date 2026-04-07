"use client";

import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import UseAnimations from "react-useanimations";
import githubAnim from "react-useanimations/lib/github";
import mailAnim from "react-useanimations/lib/mail";
import linkedinAnim from "react-useanimations/lib/linkedin";
import arrowUpAnim from "react-useanimations/lib/arrowUp";

import { 
  AnimatedDashboard, 
  AnimatedCPU, 
  AnimatedDatabase, 
  AnimatedLayers, 
  AnimatedCamera, 
  AnimatedZap, 
  AnimatedPaintbrush, 
  AnimatedGlobe 
} from "./AnimatedTechnicalIcons";

interface ThemeIconProps {
  icon: React.ElementType;
  size?: number;
  className?: string;
  delay?: number;
}

export default function ThemeIcon({ icon: Icon, size = 24, className = "", delay = 0 }: ThemeIconProps) {
  const { theme } = useTheme();

  if (theme === "aurora") {
    const randomColor1 = ["#ff2a5f", "#00e5ff", "#ffaa00"][Math.floor(Math.random() * 3)];
    
    const iconName = (Icon as any)?.displayName || (Icon as any)?.name || "";
    const nameLower = iconName.toLowerCase();
    
    // Prioritize Bespoke Full-Motion Technical SVG Icons
    let CustomAnimComp = null;
    if (nameLower.includes("dashboard")) CustomAnimComp = AnimatedDashboard;
    else if (nameLower.includes("cpu")) CustomAnimComp = AnimatedCPU;
    else if (nameLower.includes("database")) CustomAnimComp = AnimatedDatabase;
    else if (nameLower.includes("layers")) CustomAnimComp = AnimatedLayers;
    else if (nameLower.includes("camera")) CustomAnimComp = AnimatedCamera;
    else if (nameLower.includes("zap")) CustomAnimComp = AnimatedZap;
    else if (nameLower.includes("paintbrush")) CustomAnimComp = AnimatedPaintbrush;
    else if (nameLower.includes("globe")) CustomAnimComp = AnimatedGlobe;

    // Fallback to react-useanimations for generic generic standard stuff
    let lottieAnim = null;
    if (!CustomAnimComp) {
      if (nameLower.includes("github")) lottieAnim = githubAnim;
      else if (nameLower.includes("mail")) lottieAnim = mailAnim;
      else if (nameLower.includes("linkedin")) lottieAnim = linkedinAnim;
      else if (nameLower.includes("external") || nameLower.includes("upright")) lottieAnim = arrowUpAnim;
    }

    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay }}
          className="absolute inset-0 rounded-full blur-[10px] opacity-60 mix-blend-screen pointer-events-none"
          style={{ background: `radial-gradient(circle, ${randomColor1} 0%, transparent 70%)` }}
        />
        
        <div className="relative z-10 flex items-center justify-center" style={{ color: randomColor1, filter: `drop-shadow(0 0 6px ${randomColor1})` }}>
          {CustomAnimComp ? (
            <CustomAnimComp size={Math.max(size * 1.2, 24)} color={randomColor1} />
          ) : lottieAnim ? (
            <UseAnimations
              animation={lottieAnim}
              size={Math.max(size * 1.2, 24)}
              strokeColor={randomColor1}
              pathCss={`stroke: ${randomColor1}; fill: ${randomColor1};`}
            />
          ) : (
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
               <Icon size={size} color={randomColor1} strokeWidth={2.5} />
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return <Icon size={size} className={className} />;
}
