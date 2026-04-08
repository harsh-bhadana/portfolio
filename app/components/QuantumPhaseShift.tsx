"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuantumPhaseShift() {
  const [isPhasing, setIsPhasing] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id && id !== activeSection) {
            // Trigger phase shift if we've moved to a new section
            if (activeSection !== "") {
              triggerPhase();
            }
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [activeSection]);

  const triggerPhase = () => {
    setIsPhasing(true);
    setTimeout(() => setIsPhasing(false), 800);
  };

  // Expose trigger to window for CommandCenter jumps
  useEffect(() => {
     (window as any).triggerQuantumPhase = triggerPhase;
  }, []);

  return (
    <>
      {/* SVG Filter Definition */}
      <svg className="fixed h-0 w-0 pointer-events-none opacity-0">
        <defs>
          <filter id="quantum-displacement">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.1"
              numOctaves="1"
              result="warp"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01 0.1; 0.05 0.5; 0.01 0.1"
                dur="0.1s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale="30"
              in="SourceGraphic"
              in2="warp"
            />
          </filter>
        </defs>
      </svg>

      <AnimatePresence>
        {isPhasing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, times: [0, 0.1, 0.3, 0.8, 1] }}
            className="fixed inset-0 z-[80] pointer-events-none overflow-hidden mix-blend-screen"
          >
            {/* RGB Split Overlay Layer 1 */}
            <motion.div
              animate={{
                x: [-10, 10, -5, 5, 0],
                opacity: [0.3, 0.6, 0.3, 0.8, 0],
              }}
              transition={{ duration: 0.4, repeat: 1 }}
              className="absolute inset-0 bg-accent/20"
              style={{ filter: "url(#quantum-displacement) blur(2px)" }}
            />

            {/* RGB Split Overlay Layer 2 */}
            <motion.div
              animate={{
                x: [10, -10, 5, -5, 0],
                opacity: [0.2, 0.5, 0.2, 0.7, 0],
              }}
              transition={{ duration: 0.5, repeat: 1, delay: 0.1 }}
              className="absolute inset-0 bg-accent-secondary/20"
              style={{ filter: "url(#quantum-displacement) blur(2px)" }}
            />

            {/* Digital Noise / Scanlines */}
            <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
            
            {/* Rapid Grid Flash */}
            <motion.div
              animate={{ opacity: [0, 0.2, 0, 0.1, 0] }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for the Active Phase Shift on the Main Content */}
      <style jsx global>{`
        body {
          transition: filter 0.3s ease;
        }
        ${isPhasing ? `
          main {
            filter: url(#quantum-displacement);
            user-select: none;
            pointer-events: none;
          }
        ` : ""}
      `}</style>
    </>
  );
}
