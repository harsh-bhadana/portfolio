"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { User, Briefcase, Layout, Beaker, Zap, Mail } from "lucide-react";
import Magnetic from "./Magnetic";
import PhaseToggle from "./PhaseToggle";
import { useTheme } from "../context/ThemeContext";
import Logo from "./Logo";
import { getGitHubEngagement } from "../actions/github";

const navLinks = [
  { name: "About", href: "#about", Icon: User },
  { name: "Experience", href: "#experience", Icon: Briefcase },
  { name: "Projects", href: "#projects", Icon: Layout },
  { name: "Labs", href: "#labs", Icon: Beaker },
  { name: "Skills", href: "#skills", Icon: Zap },
  { name: "GitHub", href: "https://github.com/harsh-bhadana", Icon: Layout },
  { name: "Contact", href: "#contact", Icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHoveringPanel, setIsHoveringPanel] = useState(false);
  const [githubStats, setGithubStats] = useState<{ engagement: number, latestRepo: string, totalYearly: number } | null>(null);
  const { theme } = useTheme();
  
  // Use a timeout to bridge the gap between nav and panel
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchGithub() {
      const stats = await getGitHubEngagement("harsh-bhadana");
      if (stats && !stats.error) {
        setGithubStats({
          engagement: stats.engagement,
          latestRepo: stats.latestRepo,
          totalYearly: stats.totalYearly || 0
        });
      }
    }
    fetchGithub();
  }, []);

  const handleMouseEnter = (linkId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredItem(linkId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringPanel) {
        setHoveredItem(null);
      }
    }, 150);
  };

  const handlePanelMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHoveringPanel(true);
  };

  const handlePanelMouseLeave = () => {
    setIsHoveringPanel(false);
    setHoveredItem(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["about", "experience", "projects", "labs", "skills", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [theme]);

  const isAurora = theme === "aurora";
  const showExtended = !!hoveredItem || isHoveringPanel;

  return (
    <div 
      className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-2 md:px-6"
      onMouseLeave={handleMouseLeave}
    >
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          delay: 0.6
        }}
        className={`rounded-2xl px-0.5 md:px-4 py-2 flex items-center gap-0 md:gap-2 transition-all duration-500 z-20 ${
          isAurora
            ? "bg-white border-2 border-accent shadow-xl"
            : `glass ${scrolled ? "shadow-2xl shadow-accent/10 border-foreground/20" : "border-foreground/10"}`
        } ${showExtended ? (isAurora ? "rounded-b-none border-b-0" : "rounded-b-none border-b-0") : ""}`}
      >
        <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4">
          <Logo />
          <div className="hidden md:block h-4 w-px bg-foreground/10 mx-1 md:mx-2" />
          <PhaseToggle />
        </div>

        {/* Desktop Links Container */}
        <div className="hidden md:flex items-center gap-1 ml-2 border-l border-foreground/5 pl-2">
          {navLinks.map((link) => {
            const linkId = link.href.replace("#", "");
            const isActive = activeSection === linkId;
            const isHovered = hoveredItem === linkId;

            return (
              <Magnetic key={link.name} strength={0.25}>
                <a
                  href={link.href}
                  onMouseEnter={() => handleMouseEnter(linkId)}
                  className={`relative px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group ${
                    isActive || isHovered
                      ? "text-white" 
                      : (isAurora ? "text-foreground/60 hover:text-accent" : "text-foreground/40 hover:text-foreground/70")
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {(isActive || isHovered) && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <link.Icon size={14} />
                      </motion.span>
                    )}
                    {link.name}
                  </span>

                  {(isActive || isHovered) && (
                    <motion.div
                      layoutId="nav-bg"
                      className={`absolute inset-0 rounded-xl z-0 ${
                        isAurora 
                          ? "bg-accent shadow-lg shadow-accent/20" 
                          : "bg-accent shadow-[0_0_20px_rgba(255,70,85,0.4)]"
                      }`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              </Magnetic>
            );
          })}
        </div>

        {/* Mobile Links (Icons Only) */}
        <div className="flex md:hidden items-center gap-0.5 ml-1 border-l border-foreground/5 pl-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            const Icon = link.Icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover="hover"
                initial="initial"
                className={`relative h-9 w-9 flex items-center justify-center transition-all duration-300 rounded-lg ${
                  isActive 
                    ? "text-white bg-accent shadow-lg" 
                    : (isAurora ? "text-foreground/60 hover:text-accent hover:bg-accent/5" : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5")
                }`}
              >
                <Icon size={16} />
                <motion.span
                  variants={{
                    initial: { opacity: 0, y: 10, scale: 0.8 },
                    hover: { opacity: 1, y: 0, scale: 1 }
                  }}
                  className="absolute -bottom-10 bg-white text-accent border border-accent/20 px-2 py-1 rounded text-[8px] font-black uppercase tracking-tighter whitespace-nowrap pointer-events-none shadow-xl z-[100]"
                >
                  {link.name}
                </motion.span>
              </motion.a>
            );
          })}
        </div>
      </motion.nav>

      {/* Extended Panel */}
      <AnimatePresence>
        {showExtended && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseEnter={handlePanelMouseEnter}
            onMouseLeave={handlePanelMouseLeave}
            className={`hidden md:block absolute top-[calc(100%-8px)] w-full max-w-[800px] rounded-b-3xl border-2 border-t-0 p-8 shadow-2xl z-10 ${
              isAurora
                ? "bg-white border-accent shadow-accent/10"
                : "glass border-foreground/10 shadow-black/40"
            }`}
          >
            <ExtendedContent activeItem={hoveredItem} theme={theme} githubStats={githubStats} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GitHubExtendedContent({ stats }: { stats: { engagement: number, latestRepo: string, totalYearly: number } | null }) {
  return (
    <div className="flex items-center justify-between gap-12">
       <div className="space-y-4">
          <h4 className="text-2xl font-black italic tracking-tighter uppercase leading-none">GitHub <span className="text-accent underline">Specimens.</span></h4>
          <p className="text-xs text-foreground/50 font-medium max-w-xs italic leading-relaxed">
            Dynamic engagement tracking and architectural laboratory specimens.
          </p>
          <div className="flex gap-4">
             <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">Avg Weekly</span>
                <span className="text-2xl font-black">{stats?.engagement || 12} <span className="text-[10px] text-foreground/20 font-mono">ENGS</span></span>
             </div>
             <div className="w-px h-10 bg-foreground/10 mx-2" />
             <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">Yearly Activity</span>
                <span className="text-2xl font-black">{stats?.totalYearly || 420} <span className="text-[10px] text-foreground/20 font-mono">PUSH</span></span>
             </div>
          </div>
       </div>
       <div className="w-64 p-6 rounded-3xl bg-foreground/[0.03] border border-foreground/5 relative overflow-hidden group">
          <span className="text-[9px] font-black uppercase text-foreground/40 mb-2 block tracking-widest">Most Updated</span>
          <h5 className="text-lg font-black uppercase tracking-tighter text-accent group-hover:scale-105 transition-transform origin-left">{stats?.latestRepo || "portfolio"}</h5>
          <span className="text-[8px] font-mono text-foreground/20 mt-4 block">Last push: 1h ago</span>
          <div className="absolute -bottom-4 -right-4 opacity-5 rotate-12">
             <Layout size={80} />
          </div>
       </div>
    </div>
  );
}

function ExtendedContent({ activeItem, theme, githubStats }: { activeItem: string | null, theme: string, githubStats: any }) {
  const isAurora = theme === 'aurora';
  
  switch (activeItem) {
    case 'labs':
      return (
        <div className="grid grid-cols-4 gap-6">
          {[
            { name: "Interactive", icon: Zap, color: "text-blue-500", desc: "UI Lab & Transitions" },
            { name: "Routing", icon: Layout, color: "text-purple-500", desc: "Advanced Navigation" },
            { name: "Performance", icon: Zap, color: "text-accent", desc: "60FPS Optimization" },
            { name: "Rendering", icon: Beaker, color: "text-green-500", desc: "Next.js 16 Patterns" }
          ].map((cat) => (
            <a key={cat.name} href="#labs" className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-foreground/5 transition-all text-center">
              <div className={`p-4 rounded-xl bg-foreground/5 group-hover:bg-accent group-hover:text-white transition-all shadow-sm ${cat.color}`}>
                <cat.icon size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest">{cat.name}</p>
                <p className="text-[9px] text-foreground/40 font-medium">{cat.desc}</p>
              </div>
            </a>
          ))}
        </div>
      );
    case 'experience':
      return (
        <div className="flex items-center justify-between gap-12">
          <div className="space-y-4 max-w-sm">
            <h4 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Professional <span className="text-accent underline">Journey.</span></h4>
            <div className="flex gap-3">
              <div className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-[10px] font-black uppercase tracking-widest text-accent">
                4+ Years XP
              </div>
              <div className="px-4 py-2 rounded-xl bg-foreground/5 border border-foreground/10 text-[10px] font-black uppercase tracking-widest text-foreground/40">
                3 Major Ecosystems
              </div>
            </div>
            <p className="text-xs text-foreground/50 font-medium leading-relaxed italic line-clamp-2">
              Architecting high-scale internal dashboards and fleet management systems for Royal Enfield & Somani.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div className="p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/5 flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase text-accent">Latest Build</span>
                <span className="text-[9px] font-medium text-foreground/60 leading-tight">Royal Enfield Bidding System</span>
             </div>
             <div className="p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/5 flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase text-accent">Security</span>
                <span className="text-[9px] font-medium text-foreground/60 leading-tight">Hash Val & CSP Specialist</span>
             </div>
          </div>
        </div>
      );
    case 'projects':
      return (
        <div className="flex gap-8">
           <div className="flex-1 p-6 rounded-3xl bg-accent/5 border border-accent/20 relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[9px] font-black uppercase tracking-widest text-accent mb-2 block">Featured Repo</span>
                <h5 className="text-xl font-black tracking-tighter uppercase mb-2">Event Logix</h5>
                <p className="text-[10px] text-foreground/50 font-medium line-clamp-2 italic mb-4">Role-based orchestration ecosystem with real-time analytics.</p>
                <a href="#projects" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-accent group-hover:translate-x-1 transition-transform">
                  View Detail <Layout size={12} />
                </a>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
                 <Layout size={100} />
              </div>
           </div>
           <div className="w-64 space-y-4">
              <div className="flex items-center justify-between border-b border-foreground/5 pb-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Clicks</span>
                 <span className="text-[9px] font-black text-accent italic">100% Stability</span>
              </div>
              <div className="flex items-center justify-between border-b border-foreground/5 pb-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Specimens</span>
                 <span className="text-[9px] font-black text-accent italic">Next.js 16+</span>
              </div>
              <p className="text-[9px] text-foreground/30 font-medium uppercase tracking-widest leading-relaxed pt-2">
                &quot;Null-safety guards integrated into cross-server actions&quot;
              </p>
           </div>
        </div>
      );
    case 'github':
      return (
        <GitHubExtendedContent stats={githubStats} />
      );
    case 'contact':
      return (
        <div className="flex items-center justify-center gap-12 py-4">
           {[
             { name: "GitHub", href: "https://github.com/harsh-bhadana", icon: Mail },
             { name: "LinkedIn", href: "https://linkedin.com/in/harsh-bhadana", icon: User },
             { name: "Email", href: "mailto:harshbhadana7@gmail.com", icon: Mail }
           ].map((link) => (
             <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-accent transition-colors group">
                <div className="p-3 rounded-lg bg-foreground/5 group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                   <link.icon size={16} />
                </div>
                {link.name}
             </a>
           ))}
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-between">
           <div className="space-y-4">
              <h4 className="text-2xl font-black italic tracking-tighter uppercase leading-none">HB<span className="text-accent">.</span> Portfolio</h4>
              <p className="text-xs text-foreground/50 font-medium max-w-sm italic leading-relaxed">
                Frontend Architect focused on building high-performance, secure, and visually stunning web applications.
              </p>
           </div>
           <div className="flex flex-col items-end gap-2 text-right">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent animate-pulse">[ STATUS: OPEN_TO_CHALLENGES ]</span>
              <span className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">BUILD_V2.0.4 - NEXT_16_READY</span>
           </div>
        </div>
      );
  }
}
