"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Cpu,
  Database,
  Globe,
  Layers,
  ExternalLink,
  Camera,
  Sparkles,
  LayoutDashboard,
  Zap,
  Paintbrush,
  ArrowUpRight,
  Key,
  Shield,
  User,
  Users,
  Share2,
} from "lucide-react";
import ThemeIcon from "./components/ThemeIcon";
import Navbar from "./components/Navbar";
import ExperienceItem from "./components/ExperienceItem";
import Footer from "./components/Footer";
import GitHubContribution from "./components/GitHubCalendar";
import TextReveal from "./components/TextReveal";
import Magnetic from "./components/Magnetic";
import CustomCursor from "./components/CustomCursor";
import FloatingDock from "./components/FloatingDock";
import ArchitectureGraph from "./components/ArchitectureGraph";
import AuroraHero from "./components/aurora/AuroraHero";
import AuroraBentoGrid from "./components/aurora/AuroraBentoGrid";
import AuroraExperience from "./components/aurora/AuroraExperience";
import AuroraSkills from "./components/aurora/AuroraSkills";
import AuroraContact from "./components/aurora/AuroraContact";
import AuroraFooter from "./components/aurora/AuroraFooter";
import { useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./context/ThemeContext";

const experiences = [
  {
    title: "Frontend Developer (Senior Associate – Technology)",
    company: "TCZ Digital Pvt. Ltd.",
    period: "Dec 2021 – Present",
    projects: [
      {
        name: "Royal Enfield (Internal Dashboard)",
        description: "Built a high-performance frontend architecture from scratch for internal operations.",
        highlights: [
          "Developed a real-time bidding system for bikes with seamless Firebase integration.",
          "Secured API payloads using hash validation and implemented Content Security Policy (CSP).",
          "Created reusable UI components and optimized app responsiveness."
        ]
      },
      {
        name: "Royal Enfield (Ride Sure)",
        description: "Integrated the Ride Sure platform with the main Royal Enfield ecosystem.",
        highlights: [
          "Enabled shared authentication and service booking flows.",
          "Integrated Google Analytics to monitor user engagement in real-time.",
          "Optimized deployment readiness and streamlined backend communication."
        ]
      },
      {
        name: "Somani (Shipment Tracking Dashboard)",
        description: "Designed and developed visual data insights for shipment logistics.",
        highlights: [
          "Created interactive data visualization components using React and Redux.",
          "Collaborated with backend teams to optimize API response times.",
          "Ensured data consistency across complex shipment tracking modules."
        ]
      }
    ]
  }
];

const skills = [
  { category: "Frontend", items: ["Next.js (App Router)", "React", "Redux Toolkit", "Tailwind CSS", "JavaScript (ES6+)"], icon: Globe },
  { category: "Tools & Backend", items: ["Firebase", "Git & GitHub", "REST APIs", "Content Security Policy"], icon: Database },
  { category: "Deployment", items: ["Vercel", "Firebase Hosting"], icon: Layers }
];

const githubProjects = [
  {
    name: "Event Logix",
    icon: LayoutDashboard,
    description: "A premium, role-based event orchestration ecosystem designed to bridge the gap between high-scale coordination, specialized staffing, and attendee engagement.",
    features: [
      "Triple-Role Adaptive Experience (Admin / Staff / Attendee)",
      "Real-time Logic-Driven Analytics with Recharts Integrated Engine",
      "Automated Background Workflows via Vercel Cron Jobs"
    ],
    highlight: "Engineered a robust 'Defensive Data Layer' with null-safety guards across Server Actions, achieving 100% stability against asynchronous data-drifting.",
    status: "In Progress",
    tech: ["NEXT.JS 16", "MONGODB", "TYPESCRIPT", "FRAMER MOTION"],
    github: "https://github.com/harsh-bhadana/event-logix",
    demo: "https://event-logix.vercel.app",
    demoCredentials: [
      { role: "Admin", email: "admin@example.com", password: "password123", icon: Shield },
      { role: "Staff", email: "staff@example.com", password: "password123", icon: Users },
      { role: "User", email: "user@example.com", password: "password123", icon: User }
    ],
    graph: {
      nodes: [
        { id: "ui", label: "Client UI", type: "client", desc: "React 19 + Framer Motion + Recharts" },
        { id: "security", label: "Security Layer", type: "server", desc: "Jose + Bcrypt JWT Encryption" },
        { id: "actions", label: "Server Actions", type: "server", desc: "Secure 'Defensive Layer' with Zod Validation" },
        { id: "db", label: "MongoDB", type: "db", desc: "High-scale Event & User Metadata" },
        { id: "worker", label: "Vercel Cron", type: "service", desc: "Automated Ticket & Event Lifecycle Sync" }
      ],
      edges: [
        { from: "ui", to: "security", label: "AUTH" },
        { from: "security", to: "actions", label: "AUTHORIZE" },
        { from: "actions", to: "db", label: "QUERY/MUTATE" },
        { from: "worker", to: "actions", label: "TRIGGER" }
      ]
    }
  },
  {
    name: "Clicks",
    icon: Camera,
    description: "A high-performance, dark-themed photography gallery featuring infinite scroll and a premium lightbox experience. Built with a content-first philosophy.",
    features: [
      "Infinite scroll with optimized image loading",
      "Premium lightbox gallery with custom transitions",
      "Integration with Vercel Blob for cloud storage"
    ],
    highlight: "Optimized LCP by 40% through intelligent image priority and lazy-loading strategies.",
    tech: ["Next.js 15", "Tailwind CSS", "Framer Motion", "Vercel Blob"],
    github: "https://github.com/harsh-bhadana/clicks",
    demo: "https://clicks-nine.vercel.app",
    graph: {
      nodes: [
        { id: "ui", label: "Gallery UI", type: "client", desc: "Infinite Scroll + Motion Transitions" },
        { id: "optimization", label: "Priority Engine", type: "server", desc: "LCP Optimization & Lazy Loading Logic" },
        { id: "storage", label: "Vercel Blob", type: "db", desc: "Native SDK Global Asset Distribution" }
      ],
      edges: [
        { from: "ui", to: "optimization", label: "RENDER" },
        { from: "optimization", to: "storage", label: "STREAM" }
      ]
    }
  }
];

const featureLabs = [
  {
    category: "The Rendering Lab",
    icon: Cpu,
    tagline: "Breaking the core of Next.js data fetching.",
    items: [
      { name: "Zero-JS Data Table", path: "app/the-rendering/zero-js-table/page.tsx", badge: "0KB CLIENT JS", desc: "High-performance grid using Server Components and asynchronous searchParams for fetching and filtering." },
      { name: "PPR Dashboard", path: "app/the-rendering/ppr-dashboard/page.tsx", badge: "EXPERIMENTAL PPR", desc: "Utilizing Partial Prerendering to serve static shells instantly while streaming dynamic user data into Suspense holes." },
      { name: "The use cache Specimen", path: "app/the-rendering/use-cache-specimen/page.tsx", badge: "V16.0.0", desc: "Exploring component-level caching with the new \"use cache\" directive and granular cacheLife profiles." },
      { name: "Specimen 03: The proxy.ts Interceptor", path: "app/the-rendering/proxy-specimen/page.tsx", badge: "SECURITY HOOK", desc: "Centralized layer for JWT rotation, geo-fencing, and request fingerprinting using the Next.js Proxy layer." },
      { name: "Infinite Scroll Native", path: "app/the-rendering/infinite-scroll/page.tsx", badge: "SERVER ACTIONS", desc: "Server-side infinite scrolling implemented with Server Actions and useActionState without external libraries." }
    ]
  },
  {
    category: "The Performance Lab",
    icon: Zap,
    tagline: "Pushing responsiveness to 60fps limits.",
    items: [
      { name: "Specimen 06: The Memo-Free UI", path: "app/performance-lab/memo-free/page.tsx", badge: "REACT COMPILER", desc: "A high-density dashboard proving 60fps performance via the React Compiler Babel plugin without useMemo or useCallback." },
      { name: "Search-as-you-go", path: "app/performance-lab/search-as-you-go/page.tsx", badge: "CONCURRENT REACT", desc: "Maintaining a snappy UI during heavy 10,000+ item filtering using useDeferredValue with initialValue support." },
      { name: "Optimistic \"Like\" Button", path: "app/performance-lab/optimistic-like/page.tsx", badge: "NO LATENCY", desc: "Leveraging useOptimistic to create instantaneous feedback loops for database mutations." }
    ]
  },
  {
    category: "Interactive & UI Lab",
    icon: Paintbrush,
    tagline: "Bridging the gap to native experience.",
    items: [
      { name: "View Transition Gallery", path: "app/interactive-ui-lab/view-transitions/page.tsx", badge: "NATIVE API", desc: "Seamless layout morphing across Next.js routing using the native CSS View Transitions API." }
    ]
  }
];

export default function Home() {
  const { theme } = useTheme();
  const [activeLabIndex, setActiveLabIndex] = useState(0);
  const [activeProjectGraph, setActiveProjectGraph] = useState<any>(null);
  const scrollThrottleRef = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeLabIndex]);
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
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-accent/15 bg-blob animate-float"
            />
            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
                rotate: [0, -45, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full bg-accent-secondary/15 bg-blob"
            />
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, 150, 0],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-accent-tertiary/15 bg-blob"
            />
          </div>

          <main className="max-w-5xl mx-auto px-6 relative z-10">
            {/* Hero Section */}
            <section id="about" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always scroll-mt-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-accent text-[10px] font-black tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  Available for new projects
                </div>

                <h1 className="text-5xl md:text-[10rem] font-black tracking-tighter mb-10 leading-[1.1] md:leading-[1.0] flex flex-wrap gap-x-4 md:gap-x-8 items-baseline mix-blend-difference py-4">
                  <TextReveal text="Harsh" wordByWord={false} className="text-6xl sm:text-7xl md:text-[10rem]" />
                  <TextReveal
                    text="Bhadana"
                    wordByWord={false}
                    delay={0.5}
                    className="text-6xl sm:text-7xl md:text-[10rem] text-gradient pb-2"
                  />
                </h1>

                <p className="max-w-xl text-xl md:text-2xl text-foreground/70 font-medium leading-relaxed mb-12">
                  Senior <span className="text-accent italic">Frontend Developer</span> crafting high-performance, secure, and user-centric digital experiences.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6">
                  <Magnetic strength={0.2}>
                    <a
                      href="#experience"
                      className="group px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-white text-black font-bold hover:bg-accent hover:text-white transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      View Experience
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a
                      href="#contact"
                      className="px-8 md:px-10 py-4 md:py-5 rounded-2xl border-2 border-foreground/10 font-bold hover:bg-foreground/5 transition-all text-foreground/80 text-center flex items-center justify-center"
                    >
                      Get in Touch
                    </a>
                  </Magnetic>
                </div>
              </motion.div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always scroll-mt-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
                <div>
                  <span className="text-accent font-black tracking-widest uppercase text-xs mb-4 block">01 / History</span>
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">Professional <br className="md:hidden" /> <span className="animate-gradient">Journey</span></h2>
                </div>
              </div>

              <div>
                {experiences.map((exp, index) => (
                  <ExperienceItem key={index} {...exp} />
                ))}
              </div>
            </section>

            {/* Latest Works Section */}
            <section id="projects" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always scroll-mt-32">
              <div className="mb-20">
                <span className="text-accent font-black tracking-widest uppercase text-xs mb-4 block">02 / Creation</span>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">Latest <br /> <span className="animate-gradient">Works</span></h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {githubProjects.map((project: any, index: number) => (
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
                          {project.tech.map((t: string, i: number) => (
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
                              onClick={() => setActiveProjectGraph(project)}
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
                            {project.features.map((feature: string, i: number) => (
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
                              {project.demoCredentials.map((cred: any, i: number) => (
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

            {/* Feature Lab / Deep Dive */}
            <section id="labs" className="min-h-screen flex flex-col justify-center py-24 snap-start snap-always max-w-6xl mx-auto overflow-hidden scroll-mt-32">
              <div className="mb-12">
                <span className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4 block">03 / Lab Phase</span>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6 italic">Specimen <span className="animate-gradient not-italic">Exploration</span></h2>
                <p className="text-foreground/50 text-xl font-medium leading-relaxed max-w-2xl">
                  Exploring the architectural frontier of <span className="text-foreground font-black">Next.js 16</span> and <span className="text-foreground font-black">React 19</span> through isolated research specimens.
                </p>
              </div>

              <div className="rounded-[2.5rem] md:rounded-[3rem] bg-black/40 border border-foreground/10 overflow-hidden shadow-2xl relative group h-auto md:h-[700px] flex flex-col">
                <div className="flex items-center justify-between px-8 py-5 border-b border-foreground/5 bg-foreground/[0.03] shrink-0">
                  <div className="flex items-center gap-6">
                    <div className="flex gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden items-stretch">
                  <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-foreground/5 bg-foreground/[0.01] p-4 md:p-6 flex lg:flex-col gap-4 lg:gap-8 overflow-x-auto lg:overflow-y-auto custom-scrollbar shrink-0">
                    {featureLabs.map((lab, i) => {
                      const isActive = activeLabIndex === i;
                      return (
                        <div key={i} className="space-y-4 shrink-0 lg:shrink">
                          <button 
                            onClick={() => setActiveLabIndex(i)}
                            className={`flex items-center gap-3 md:gap-4 w-full text-left transition-all group py-2 ${isActive ? "text-accent" : "text-foreground/30 hover:text-foreground/60"}`}
                          >
                            <ThemeIcon icon={lab.icon} size={20} />
                            <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] whitespace-nowrap">{lab.category}</span>
                            {isActive && (
                              <motion.div layoutId="active-lab-dot" className="hidden lg:block w-2 h-2 rounded-full bg-accent ml-auto" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div 
                    ref={scrollContainerRef}
                    className="lg:col-span-8 p-6 md:p-12 overflow-y-auto lg:h-full custom-scrollbar bg-foreground/[0.005]"
                    onWheel={(e) => {
                      const now = Date.now();
                      if (now - scrollThrottleRef.current < 1000) return;

                      const el = e.currentTarget;
                      if (e.deltaY > 0) {
                        if (el.scrollHeight - el.scrollTop - el.clientHeight < 5) {
                          if (activeLabIndex < featureLabs.length - 1) {
                            scrollThrottleRef.current = now;
                            setActiveLabIndex(prev => prev + 1);
                          }
                        }
                      } else if (e.deltaY < 0) {
                        if (el.scrollTop < 5) {
                          if (activeLabIndex > 0) {
                            scrollThrottleRef.current = now;
                            setActiveLabIndex(prev => prev - 1);
                          }
                        }
                      }
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={activeLabIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-10"
                      >
                        <div className="border-l-4 border-accent pl-8 py-2">
                          <h3 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">{featureLabs[activeLabIndex].category}</h3>
                          <p className="text-foreground/40 font-medium text-lg leading-none">{featureLabs[activeLabIndex].tagline}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {featureLabs[activeLabIndex].items.map((item, j) => (
                            <motion.div 
                              key={j}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: j * 0.1 }}
                              whileHover={{ y: -5 }}
                              className="p-8 rounded-[2rem] bg-foreground/5 border border-foreground/10 hover:border-accent/40 transition-all group/card relative overflow-hidden flex flex-col"
                            >
                              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                 <ArrowUpRight size={24} className="text-accent" />
                              </div>
                              <div className="flex items-center gap-3 mb-6 flex-wrap">
                                 <span className="text-[10px] font-black tracking-widest uppercase bg-accent/20 px-3 py-1.5 rounded-md text-accent">{item.badge}</span>
                                 <span className="text-[10px] font-mono font-bold text-foreground/30 italic">{item.path.split('/').pop()}</span>
                              </div>
                              <h4 className="text-xl md:text-2xl font-black mb-4 group-hover/card:text-white transition-colors tracking-tight leading-tight">{item.name}</h4>
                              <p className="text-foreground/50 text-sm font-bold leading-relaxed mb-8 italic">{item.desc}</p>
                              <div className="text-[10px] font-mono text-foreground/30 flex items-center gap-3 font-bold cursor-default mt-auto">
                                 <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                 specimens/{item.path}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="p-4 border-t border-foreground/5 bg-foreground/[0.02] flex items-center justify-between text-[9px] font-mono font-bold text-foreground/20 tracking-widest px-10 backdrop-blur-3xl shrink-0">
                  <div className="flex items-center gap-6">
                    <span className="text-accent animate-pulse uppercase">active_sector: {featureLabs[activeLabIndex].category.split(' ').pop()}</span>
                    <span>STATUS: 200 OK</span>
                    <span className="hidden md:inline">COMPILER: REACT_FORGET_V19</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/40 italic">
                    &quot;use cache&quot;; <Sparkles size={10} className="text-accent" />
                  </div>
                </div>
              </div>
              
              <Magnetic strength={0.2}>
                <a href="https://github.com/harsh-bhadana/next-labs" target="_blank" rel="noopener noreferrer" className="group mt-12 mx-auto px-10 py-5 rounded-full bg-foreground text-background font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-6 hover:bg-accent hover:text-white transition-all transform hover:scale-[1.02] border-2 border-transparent hover:border-white/20">
                  Inspect Extended Laboratory
                  <ThemeIcon icon={Github} size={20} className="group-hover:rotate-[360deg] transition-transform duration-700" />
                </a>
              </Magnetic>
            </section>

            {/* Tech Stack Section */}
            <section id="skills" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always scroll-mt-32">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(180px,auto)]">
                <div className="md:col-span-12 mb-10">
                  <span className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4 block">04 / Proficiencies</span>
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter">The Tool <span className="animate-gradient italic">Belt</span></h2>
                </div>

                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: index * 0.1
                        }
                      }
                    }}
                    className="md:col-span-4 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-foreground/5 border border-foreground/10 hover:border-accent/40 transition-all group flex flex-col"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-10 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                      <ThemeIcon icon={skill.icon as React.ElementType} size={24} />
                    </div>
                    <h3 className="text-2xl font-black mb-8 uppercase tracking-widest leading-none">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {skill.items.map((item, i) => (
                        <motion.span 
                          key={i} 
                          variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 }
                          }}
                          className="px-4 py-2 rounded-xl bg-foreground/5 border border-foreground/10 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 hover:text-accent transition-colors"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* GitHub Contributions Section */}
            <section className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always">
              <GitHubContribution />
            </section>

            {/* Contact Section */}
            <section id="contact" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always scroll-mt-32">
              <div className="p-10 md:p-32 rounded-[2.5rem] md:rounded-[4rem] bg-accent text-white relative overflow-hidden group">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-foreground/10 blur-3xl"
                />

                <div className="relative z-10 text-center flex flex-col items-center">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase mb-12 opacity-60">Get in touch</span>
                  <h2 className="text-5xl md:text-9xl font-black tracking-tighter mb-16 leading-[1.0] md:leading-[0.8] mix-blend-overlay uppercase">
                    LET&apos;S GO <br /> BEYOND
                  </h2>
                  <div className="flex flex-wrap justify-center gap-8">
                    <a
                      href="mailto:harshbhadana40@gmail.com"
                      className="px-10 py-5 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <ThemeIcon icon={Mail} size={20} /> Email Me
                    </a>
                    <div className="flex items-center gap-4">
                      <Magnetic strength={0.3}>
                        <a href="https://www.linkedin.com/in/harsh-bhadana-2a1793231/" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border-2 border-white/20 hover:bg-white/10 transition-all flex items-center justify-center">
                          <ThemeIcon icon={Linkedin} size={24} />
                        </a>
                      </Magnetic>
                      <Magnetic strength={0.3}>
                        <a href="https://github.com/harsh-bhadana" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border-2 border-white/20 hover:bg-white/10 transition-all flex items-center justify-center">
                          <ThemeIcon icon={Github} size={24} />
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </div>
            </section>

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
            <section className="py-24 px-6 lg:pl-96 bg-surface-dim relative overflow-hidden">
               {/* Immersive Background Shape */}
               <div className="absolute inset-0 -z-10 pointer-events-none">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 0.05, scale: 1 }}
                   transition={{ duration: 2 }}
                   className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-accent rounded-full" 
                 />
               </div>
               <div className="container mx-auto max-w-6xl">
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
            <AuroraFooter />
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

