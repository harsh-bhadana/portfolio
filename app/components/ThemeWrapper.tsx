"use client";

import { useTheme } from "../context/ThemeContext";
import { useScroll, useSpring, motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode } from "react";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import FloatingDock from "./FloatingDock";
import ArchitectureGraph from "./ArchitectureGraph";

import { ProjectGraphProvider, useProjectGraph } from "../context/ProjectGraphContext";

interface ThemeWrapperProps {
  eclipseContent: ReactNode;
  auroraContent: ReactNode;
}

export default function ThemeWrapper({ eclipseContent, auroraContent }: ThemeWrapperProps) {
  return (
    <ProjectGraphProvider>
      <ThemeWrapperInner eclipseContent={eclipseContent} auroraContent={auroraContent} />
    </ProjectGraphProvider>
  );
}

function ThemeWrapperInner({ eclipseContent, auroraContent }: ThemeWrapperProps) {
  const { theme } = useTheme();
  const { activeProjectGraph, setActiveProjectGraph } = useProjectGraph();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={`bg-background text-foreground selection:bg-accent/30 relative h-screen overflow-y-auto snap-y snap-proximity custom-scrollbar scroll-smooth scroll-pt-32 md:scroll-pt-0 ${theme === 'aurora' ? 'font-body' : ''}`}>
      <CustomCursor />
      <div className="paper-grain" />

      <Navbar />

      {theme === "eclipse" ? (
        <>
          <FloatingDock />
          
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
            style={{ scaleX }}
          />

          <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden mix-blend-overlay">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: [0, 45, 0],
                borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/15 bg-blob animate-float"
            />
            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
                rotate: [0, -45, 0],
                borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 60% 40% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-accent-secondary/15 bg-blob"
            />
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, 150, 0],
                borderRadius: ["50% 50% 20% 80% / 25% 80% 20% 75%", "80% 20% 50% 50% / 75% 20% 80% 25%", "50% 50% 20% 80% / 25% 80% 20% 75%"]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-accent-tertiary/15 bg-blob"
            />
          </div>

          <main className="max-w-5xl mx-auto px-6 relative z-10">
            {eclipseContent}
          </main>
        </>
      ) : (
        <>
          <main className="relative z-10 pt-20">
            {auroraContent}
          </main>
        </>
      )}

      <AnimatePresence>
        {activeProjectGraph && (
          <ArchitectureGraph 
            project={activeProjectGraph} 
            onClose={() => setActiveProjectGraph(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
