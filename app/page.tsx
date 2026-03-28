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
} from "lucide-react";
import Navbar from "./components/Navbar";
import ExperienceItem from "./components/ExperienceItem";
import Footer from "./components/Footer";
import GitHubContribution from "./components/GitHubCalendar";
import TextReveal from "./components/TextReveal";
import Magnetic from "./components/Magnetic";
import CustomCursor from "./components/CustomCursor";
import FloatingDock from "./components/FloatingDock";
import { useScroll, useSpring } from "framer-motion";

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
  },
  {
    name: "NextJS Labs",
    icon: ({ size, className }: { size?: number, className?: string }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="64" cy="64" r="64" fill="currentColor" fillOpacity="0.1" />
        <path
          d="M90.5 97.5L42.5 35.5H35.5V92.5H41V44.5L84 100.5C86.5 99.5 88.5 98.5 90.5 97.5Z"
          fill="currentColor"
        />
        <path d="M85.5 35.5H91V92.5H85.5V35.5Z" fill="currentColor" />
      </svg>
    ),
    description: "A collection of experiments and demonstrations exploring modern Next.js 16 and React 19 capabilities. Isolates unique edge-cases like Partial Prerendering (PPR), component-level caching with the use cache directive, and Next.js 16 Proxy intercepts.",
    features: [
      "Next.js 16 Proxy: Centralized JWT rotation, geo-fencing, and request fingerprinting.",
      "PPR Dashboard: Partial Prerendering with streaming dynamic data into static shells.",
      "\"use cache\" Specimen: Exploring granular component-level caching and cacheLife profiles.",
      "Zero-JS Data Table: High-performance server-filtered rendering with 0kb client-side JavaScript.",
      "Interactive UI Lab: Native CSS View Transitions API for seamless layout morphing."
    ],
    highlight: "Exploring the bleeding edge of Next.js 16 and React 19 with 0kb client-side JavaScript experiments.",
    tech: ["NEXT.JS 16", "REACT 19", "SERVER ACTIONS", "PPR", "USE CACHE", "PROXY"],
    github: "https://github.com/harsh-bhadana/next-labs"
  }
];

export default function Home() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-black tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
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
              Senior <span className="text-white italic">Frontend Developer</span> crafting high-performance, secure, and user-centric digital experiences.
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
                  className="px-8 md:px-10 py-4 md:py-5 rounded-2xl border-2 border-white/10 font-bold hover:bg-white/5 transition-all text-foreground/80 text-center flex items-center justify-center"
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

        {/* Skills & Projects Bento Grid */}
        <section className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

            {/* Header Card */}
            <div id="skills" className="md:col-span-8 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] card-gradient flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={120} className="md:size-[160px]" />
              </div>
              <span className="text-accent font-black tracking-widest uppercase text-[10px] mb-4 block">02 / Skills</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">Tech <span className="animate-gradient">Stack</span></h2>
              <p className="text-foreground/40 text-xs font-medium leading-relaxed max-w-[200px]">
                My toolbelt for building high-performance digital products.
              </p>
            </div>

            {/* Individual Skill Categories */}
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: index * 0.1
                    }
                  }
                }}
                className="md:col-span-4 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-accent/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-black mb-6 uppercase tracking-wider">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <motion.span 
                      key={i} 
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                      }}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-foreground/40"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Project Cards (Bento Style) */}
            <div id="projects" className="md:col-span-12 mt-12">
              <div>
                <span className="text-accent font-black tracking-widest uppercase text-xs mb-4 block">03 / Creation</span>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter">Latest <span className="animate-gradient">Works</span></h2>
              </div>
            </div>

            {githubProjects.map((project: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className={`group p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all relative overflow-hidden flex flex-col perspective-1000 ${index === 0 ? "md:col-span-12" : "md:col-span-12"
                  }`}
              >
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all pointer-events-none">
                  <project.icon size={128} />
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 h-full">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                      <h3 className="text-3xl md:text-5xl font-black group-hover:text-accent transition-colors leading-none tracking-tighter">{project.name}</h3>
                      {project.status && (
                        <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-[10px] font-black uppercase tracking-widest text-accent animate-pulse">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <p className="text-foreground/70 mb-8 text-sm md:text-base leading-relaxed font-medium">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t: string, i: number) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-[9px] font-black uppercase tracking-widest text-accent">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-6 mt-auto">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors"
                      >
                        Source <Github size={16} />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-accent transition-colors"
                        >
                          Live <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-8">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-4 block">Key Features</span>
                      <ul className="space-y-3">
                        {project.features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-foreground/50 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.highlight && (
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group/highlight">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/highlight:rotate-12 transition-transform">
                          <Sparkles size={24} className="text-accent" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-2 block">Technical Highlight</span>
                        <p className="text-xs md:text-sm text-foreground/70 font-bold leading-relaxed">
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
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"
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
