"use client";

import { useScroll, useSpring, AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GitHubContribution from "./components/GitHubCalendar";
import CustomCursor from "./components/CustomCursor";
import FloatingDock from "./components/FloatingDock";
import ArchitectureGraph from "./components/ArchitectureGraph";

import AuroraHero from "./components/aurora/AuroraHero";
import AuroraBentoGrid from "./components/aurora/AuroraBentoGrid";
import AuroraExperience from "./components/aurora/AuroraExperience";
import AuroraSkills from "./components/aurora/AuroraSkills";
import AuroraContact from "./components/aurora/AuroraContact";

import EclipseHero from "./components/eclipse/EclipseHero";
import EclipseExperience from "./components/eclipse/EclipseExperience";
import EclipseProjects from "./components/eclipse/EclipseProjects";
import EclipseLabs from "./components/eclipse/EclipseLabs";
import EclipseSkills from "./components/eclipse/EclipseSkills";
import EclipseContact from "./components/eclipse/EclipseContact";

import { experiences, skills, githubProjects, featureLabs } from "./data/portfolio";

export default function Home() {
  const { theme } = useTheme();
  const [activeProjectGraph, setActiveProjectGraph] = useState<any>(null);

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
            <EclipseHero />
            <EclipseExperience experiences={experiences} />
            <EclipseProjects 
              projects={githubProjects} 
              onInspectArchitecture={(project) => setActiveProjectGraph(project)} 
            />
            <EclipseLabs labs={featureLabs} />
            <EclipseSkills skills={skills} />
            
            <section className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always">
              <GitHubContribution />
            </section>

            <EclipseContact />

            <section className="snap-start snap-always">
              <Footer />
            </section>
          </main>
        </>
      ) : (
        <>
          <main className="relative z-10 pt-20">
            <AuroraHero />
            <AuroraExperience experiences={experiences} />
            <AuroraBentoGrid 
              projects={githubProjects} 
              labs={featureLabs} 
              onInspectArchitecture={(project) => setActiveProjectGraph(project)}
            />
            <AuroraSkills skills={skills} />
            <section className="py-24 px-6 lg:pl-96 relative overflow-hidden">
               {/* Immersive Background Shape */}
               <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   animate={{ 
                     borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 60% 40% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"]
                   }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-accent" 
                 />
               </div>
               <div className="container mx-auto max-w-6xl relative z-10">
                  <div className="mb-12">
                    <span className="font-label text-xs uppercase font-black tracking-[0.4em] text-accent/60 mb-4 block">03 / Contributions</span>
                    <h2 className="font-headline font-black text-5xl md:text-8xl tracking-tighter leading-none mb-4 uppercase">
                      GitHub <span className="italic text-accent">Specimens.</span>
                    </h2>
                  </div>
                  <GitHubContribution />
               </div>
            </section>
            <AuroraContact />
            <Footer />
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
