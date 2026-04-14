"use client";

import { motion } from "framer-motion";
import { ChevronRight, ExternalLink, Github, Key, Share2, Sparkles } from "lucide-react";
import ThemeIcon from "../ThemeIcon";
import { GithubProject } from "../../types/portfolio";

export default function EclipseProjects({
  projects,
  onInspectArchitecture
}: {
  projects: GithubProject[];
  onInspectArchitecture: (project: GithubProject) => void;
}) {
  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always scroll-mt-32">
      <div className="mb-20 text-center md:text-left">
        <span className="text-accent font-black tracking-widest uppercase text-xs mb-4 block">02 / Creation</span>
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">Latest <br /> <span className="animate-gradient">Works</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
            className="md:col-span-12 group p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-all relative overflow-hidden flex flex-col perspective-1000"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-all pointer-events-none">
              <ThemeIcon icon={project.icon} size={160} />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 h-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <h3 className="text-3xl md:text-6xl font-black group-hover:text-accent transition-colors leading-none tracking-tighter">{project.name}</h3>
                  {project.status && (
                    <span className="px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-[10px] font-black uppercase tracking-[0.2em] text-accent animate-pulse">
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="text-foreground/70 mb-10 text-lg md:text-xl leading-relaxed font-medium">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-[10px] font-black uppercase tracking-widest text-accent">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-6 mt-auto pt-10 border-t border-foreground/5 relative z-20">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-foreground/40 hover:text-accent transition-all hover:translate-y-[-2px]">
                    Repo <ThemeIcon icon={Github} size={20} />
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-foreground/60 hover:text-accent transition-all hover:translate-y-[-2px]">
                      Demo <ThemeIcon icon={ExternalLink} size={20} />
                    </a>
                  )}
                  {project.graph && (
                    <button 
                      onClick={() => onInspectArchitecture(project)}
                      className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-accent hover:text-white transition-all bg-accent/10 hover:bg-accent px-6 py-3 rounded-2xl border border-accent/20 shadow-lg shadow-accent/5 hover:shadow-accent/20"
                    >
                      Inspect Architecture <Share2 size={18} />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="bg-foreground/[0.03] p-8 md:p-10 rounded-[2rem] border border-foreground/5">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8 block">Architecture Highlights</span>
                  <ul className="space-y-6">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm md:text-base text-foreground/60 font-medium leading-normal">
                        <ThemeIcon icon={ChevronRight} size={14} className="text-accent mt-1 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.highlight && (
                  <div className="p-8 md:p-10 rounded-[2rem] bg-foreground/5 border border-foreground/10 relative overflow-hidden group/highlight">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover/highlight:rotate-12 transition-transform">
                      <Sparkles size={32} className="text-accent" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-4 block leading-none">Engineering Specimen</span>
                    <p className="text-base md:text-xl text-foreground/90 font-black leading-tight tracking-tight italic">
                      &quot;{project.highlight}&quot;
                    </p>
                  </div>
                )}

                {project.demoCredentials && (
                  <div className="p-8 md:p-10 rounded-[2rem] bg-accent/5 border border-accent/20 relative overflow-hidden group/creds">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover/creds:rotate-12 transition-transform">
                      <Key size={32} className="text-accent" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-8 block font-black leading-none">Access Protocols</span>
                    <div className="grid grid-cols-1 gap-4">
                      {project.demoCredentials.map((cred, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-foreground/[0.03] hover:bg-foreground/[0.08] transition-all border border-transparent hover:border-accent/20">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-accent/10 text-accent">
                               <cred.icon size={16} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">{cred.role}</span>
                          </div>
                          <div className="flex items-center gap-4 text-[11px] font-mono">
                            <span className="text-foreground/80 bg-foreground/5 px-2 py-1 rounded-md">{cred.email}</span>
                            <span className="text-foreground/80 bg-foreground/5 px-2 py-1 rounded-md">{cred.password}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
