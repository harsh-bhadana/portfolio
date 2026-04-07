"use client";

import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

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

export default function ThemeIcon({ icon: Icon, size = 24, className = "", delay = 0 }: ThemeIconProps) {
  const { theme } = useTheme();

  if (theme === "aurora") {
    const randomColor1 = ["#ff2a5f", "#00e5ff", "#ffaa00"][Math.floor(Math.random() * 3)];
    
    const iconName = (Icon as any)?.displayName || (Icon as any)?.name || "";
    const nameLower = iconName.toLowerCase();
    
    // Prioritize Bespoke Full-Motion SVG Icons
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
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay }}
          className="absolute inset-0 rounded-full blur-[10px] opacity-60 mix-blend-screen pointer-events-none"
          style={{ background: `radial-gradient(circle, ${randomColor1} 0%, transparent 70%)` }}
        />
        
        <div className="relative z-10 flex items-center justify-center text-current" style={{ filter: `drop-shadow(0 0 6px ${randomColor1})` }}>
          {CustomAnimComp ? (
            <CustomAnimComp size={Math.max(size * 1.2, 24)} color="currentColor" />
          ) : (
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
               <Icon size={size} color="currentColor" strokeWidth={2.5} />
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return <Icon size={size} className={className} />;
}
