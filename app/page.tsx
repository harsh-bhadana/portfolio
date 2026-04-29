import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GitHubContribution from "./components/GitHubCalendar";
import CustomCursor from "./components/CustomCursor";
import FloatingDock from "./components/FloatingDock";
import ScrollProgress from "./components/ScrollProgress";
import AnimatedBlobs from "./components/AnimatedBlobs";
import ThemeWrapper from "./components/ThemeWrapper";

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
import { getGitHubContributions } from "./actions/github";
import { Suspense } from "react";

export default function Home() {
  const githubPromise = getGitHubContributions("harsh-bhadana", 2026);

  return (
    <ThemeWrapper
      eclipseContent={(
        <>
          <FloatingDock />
          <ScrollProgress />
          <AnimatedBlobs />
          
          <EclipseHero />
          <EclipseExperience experiences={experiences} />
          <EclipseProjects projects={githubProjects} />
          <EclipseLabs labs={featureLabs} />
          <EclipseSkills skills={skills} />
          
          <section className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always">
            <Suspense fallback={<div className="h-96 w-full animate-pulse bg-foreground/5 rounded-3xl" />}>
               <GitHubContribution promise={githubPromise} />
            </Suspense>
          </section>

          <EclipseContact />

          <section className="snap-start snap-always">
            <Footer />
          </section>
        </>
      )}
      auroraContent={(
        <>
          <AuroraHero />
          <AuroraExperience experiences={experiences} />
          <AuroraBentoGrid 
            projects={githubProjects} 
            labs={featureLabs} 
          />
          <AuroraSkills skills={skills} />
          <section className="py-24 px-6 lg:pl-96 relative overflow-hidden">
             <div className="container mx-auto max-w-6xl relative z-10">
                <div className="mb-12">
                  <span className="font-label text-xs uppercase font-black tracking-[0.4em] text-accent/60 mb-4 block">03 / Contributions</span>
                  <h2 className="font-headline font-black text-5xl md:text-8xl tracking-tighter leading-none mb-4 uppercase">
                    GitHub <span className="italic text-accent">Specimens.</span>
                  </h2>
                </div>
                <Suspense fallback={<div className="h-96 w-full animate-pulse bg-foreground/5 rounded-3xl" />}>
                   <GitHubContribution promise={githubPromise} />
                </Suspense>
             </div>
          </section>
          <AuroraContact />
          <Footer />
        </>
      )}
    />
  );
}
