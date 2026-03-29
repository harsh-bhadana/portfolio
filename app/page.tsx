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
  FileCode,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "./components/Navbar";
import ExperienceItem from "./components/ExperienceItem";
import Footer from "./components/Footer";
import GitHubContribution from "./components/GitHubCalendar";
import TextReveal from "./components/TextReveal";
import Magnetic from "./components/Magnetic";
import CustomCursor from "./components/CustomCursor";
import FloatingDock from "./components/FloatingDock";
import { useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
  { category: "Frontend", items: ["Next.js (App Router)", "React", "Redux Toolkit", "Tailwind CSS", "JavaScript (ES6+)"], icon: <Globe size={24} /> },
  { category: "Tools & Backend", items: ["Firebase", "Git & GitHub", "REST APIs", "Content Security Policy"], icon: <Database size={24} /> },
  { category: "Deployment", items: ["Vercel", "Firebase Hosting"], icon: <Layers size={24} /> }
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
    demo: "https://event-logix.vercel.app"
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
    demo: "https://clicks-nine.vercel.app"
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
  const [activeLabIndex, setActiveLabIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-background text-foreground selection:bg-accent/30 relative h-screen overflow-y-auto snap-y snap-proximity custom-scrollbar scroll-smooth">
      <CustomCursor />
      <FloatingDock />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX }}
      />
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-accent/20 bg-blob animate-float"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full bg-accent-secondary/20 bg-blob"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 150, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-accent-tertiary/20 bg-blob"
        />
      </div>

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <section id="about" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always">
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

            <h1 className="text-5xl md:text-[10rem] font-black tracking-tighter mb-10 leading-[1.1] md:leading-[1.0] flex flex-wrap gap-x-8 items-baseline mix-blend-difference py-4">
              <TextReveal text="Harsh" wordByWord={false} />
              <TextReveal
                text="Bhadana"
                wordByWord={false}
                delay={0.5}
                className="text-gradient pb-2"
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
        <section id="experience" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always">
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
        <section id="projects" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always">
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
                className="md:col-span-12 group p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-all relative overflow-hidden flex flex-col perspective-1000"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-all pointer-events-none">
                  <project.icon size={160} />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                      <h3 className="text-4xl md:text-6xl font-black group-hover:text-accent transition-colors leading-none tracking-tighter">{project.name}</h3>
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

                    <div className="flex gap-8 mt-auto">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors">
                        Repo <Github size={20} />
                      </a>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors">
                          Demo <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-10">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6 block">Architecture Highlights</span>
                      <ul className="space-y-4">
                        {project.features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-4 text-sm md:text-base text-foreground/50 font-medium leading-normal">
                            <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.highlight && (
                      <div className="p-8 rounded-3xl bg-foreground/5 border border-foreground/10 relative overflow-hidden group/highlight">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover/highlight:rotate-12 transition-transform">
                          <Sparkles size={32} className="text-accent" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-3 block">Technical Deep Dive</span>
                        <p className="text-sm md:text-lg text-foreground/80 font-black leading-tight">
                          {project.highlight}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feature Lab / Deep Dive (Condensed IDE Explorer Style) */}
        <section id="labs" className="min-h-screen flex flex-col justify-center py-24 snap-start snap-always max-w-6xl mx-auto overflow-hidden">
          <div className="mb-12">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4 block">03 / Lab Phase</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6 italic">Specimen <span className="animate-gradient not-italic">Exploration</span></h2>
            <p className="text-foreground/50 text-xl font-medium leading-relaxed max-w-2xl">
              Exploring the architectural frontier of <span className="text-foreground font-black">Next.js 16</span> and <span className="text-foreground font-black">React 19</span> through isolated research specimens.
            </p>
          </div>

          <div className="rounded-[3rem] bg-black/40 border border-foreground/10 overflow-hidden shadow-2xl relative group h-[700px] flex flex-col">
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
              {/* Sidebar Explorer */}
              <div className="lg:col-span-4 border-r border-foreground/5 bg-foreground/[0.01] p-6 space-y-8 overflow-y-auto custom-scrollbar">
                {featureLabs.map((lab, i) => {
                  const isActive = activeLabIndex === i;
                  return (
                    <div key={i} className="space-y-4">
                      <button 
                        onClick={() => setActiveLabIndex(i)}
                        className={`flex items-center gap-3 w-full text-left transition-all group ${isActive ? "text-accent" : "text-foreground/30 hover:text-foreground/60"}`}
                      >
                        <lab.icon size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">{lab.category}</span>
                        {isActive && (
                          <motion.div layoutId="active-lab-dot" className="w-1 h-1 rounded-full bg-accent ml-auto" />
                        )}
                      </button>
                      
                      {/* Sub-items (Only show indented list for files) */}
                      <div className={`space-y-2 border-l border-foreground/5 ml-2 pl-4 transition-all duration-500 overflow-hidden ${isActive ? "opacity-100 max-h-96" : "opacity-30 max-h-0 pointer-events-none"}`}>
                        {lab.items.map((item, j) => (
                          <div key={j} className="flex items-center gap-3 py-1">
                            <FileCode size={12} className="text-foreground/20" />
                            <span className="text-[10px] font-bold text-foreground/40">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Lab Content Area (Editor View) */}
              <div className="lg:col-span-8 p-10 lg:p-12 overflow-y-auto custom-scrollbar bg-foreground/[0.005]">
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
                          className="p-6 rounded-[2rem] bg-foreground/5 border border-foreground/10 hover:border-accent/40 transition-all group/card relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover/card:opacity-100 transition-opacity">
                             <ArrowUpRight size={20} className="text-accent" />
                          </div>
                          <div className="flex items-center gap-3 mb-4 flex-wrap">
                             <span className="text-[8px] font-black tracking-widest uppercase bg-accent/20 px-2.5 py-1 rounded-md text-accent">{item.badge}</span>
                             <span className="text-[8px] font-mono font-bold text-foreground/20 italic">{item.path.split('/').pop()}</span>
                          </div>
                          <h4 className="text-lg font-black mb-3 group-hover/card:text-white transition-colors tracking-tight leading-none">{item.name}</h4>
                          <p className="text-foreground/40 text-[10px] font-bold leading-relaxed mb-4 italic">{item.desc}</p>
                          <div className="text-[8px] font-mono text-foreground/20 flex items-center gap-2 font-bold cursor-default mt-auto">
                             <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                             specimens/{item.path}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Sticky "use cache" Footer Indicator */}
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
              <Github size={20} className="group-hover:rotate-[360deg] transition-transform duration-700" />
            </a>
          </Magnetic>
        </section>


        {/* Tech Stack Section */}
        <section id="skills" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(180px,auto)]">
            <div className="md:col-span-12 mb-10">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4 block">04 / Proficiencies</span>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter">The Tool <span className="animate-gradient italic">Belt</span></h2>
            </div>

            {/* Individual Skill Categories */}
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
                className="md:col-span-4 p-8 md:p-10 rounded-[2.5rem] bg-foreground/5 border border-foreground/10 hover:border-accent/40 transition-all group flex flex-col"
              >
                <div className="w-16 h-16 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-10 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  {skill.icon}
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
        <section id="contact" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always">
          <div className="p-16 md:p-32 rounded-[4rem] bg-accent text-white relative overflow-hidden group">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-foreground/10 blur-3xl"
            />

            <div className="relative z-10 text-center flex flex-col items-center">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase mb-12 opacity-60">Get in touch</span>
              <h2 className="text-5xl md:text-9xl font-black tracking-tighter mb-16 leading-[0.9] md:leading-[0.8] mix-blend-overlay">
                LET&apos;S GO <br /> BEYOND
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                <a
                  href="mailto:harshbhadana40@gmail.com"
                  className="px-10 py-5 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Mail size={20} /> Email Me
                </a>
                <div className="flex items-center gap-4">
                  <Magnetic strength={0.3}>
                    <a href="https://www.linkedin.com/in/harsh-bhadana-2a1793231/" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border-2 border-white/20 hover:bg-white/10 transition-all flex items-center justify-center">
                      <Linkedin size={24} />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.3}>
                    <a href="https://github.com/harsh-bhadana" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border-2 border-white/20 hover:bg-white/10 transition-all flex items-center justify-center">
                      <Github size={24} />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="snap-start snap-always">
          <Footer />
        </section>
      </main>
    </div>
  );
}
