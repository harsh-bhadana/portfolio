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
  }
];

const featureLab = {
  name: "NextJS Labs",
  description: "A technical laboratory exploring the bleeding edge of Next.js 16 and React 19.",
  details: [
    { title: "Next.js 16 Proxy", desc: "Centralized JWT rotation, geo-fencing, and request fingerprinting." },
    { title: "PPR Dashboard", desc: "Partial Prerendering streaming dynamic data into static shells." },
    { title: "use cache Specimen", desc: "Granular component-level caching and cacheLife profiles." },
    { title: "Zero-JS Data Table", desc: "High-performance server-filtered rendering with 0kb client JS." }
  ],
  tech: ["NEXT.JS 16", "REACT 19", "SERVER ACTIONS", "PPR", "USE CACHE", "PROXY"],
  githubLink: "https://github.com/harsh-bhadana/next-labs"
};

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

        {/* Feature Lab / Deep Dive (NextJS Labs) */}
        <section id="labs" className="min-h-screen flex flex-col justify-center py-20 snap-start snap-always">
          <div className="w-full max-w-6xl mx-auto">
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-foreground/10 pb-10">
              <div className="max-w-2xl">
                <span className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4 block">03 / Lab Phase</span>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6 italic">Deep <span className="animate-gradient not-italic">Dive</span></h2>
                <p className="text-foreground/50 text-xl font-medium leading-relaxed">
                  Exploring the architectural frontier of <span className="text-foreground font-black">Next.js 16</span> and <span className="text-foreground font-black">React 19</span>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Terminal Preview */}
              <div className="lg:col-span-7 rounded-[2.5rem] bg-black/40 border border-foreground/10 p-2 relative group overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-foreground/5 bg-foreground/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400 opacity-50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-50" />
                    <div className="w-3 h-3 rounded-full bg-green-400 opacity-50" />
                  </div>
                  <span className="text-[10px] font-mono text-foreground/30 ml-4 tracking-widest uppercase">nextlabs-specimen-v16.0.0</span>
                </div>
                <div className="p-8 font-mono text-[13px] md:text-base leading-relaxed overflow-hidden">
                  <div className="flex gap-4 mb-4">
                    <span className="text-green-400 shrink-0">$</span>
                    <span className="text-foreground/90 italic underline decoration-accent/40 decoration-2">inspect --architecture --ppr --use-cache</span>
                  </div>
                  <div className="space-y-6">
                    {featureLab.details.map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        className="flex gap-4 group/item"
                      >
                        <span className="text-accent/40 font-black shrink-0">0{i+1}:</span>
                        <div>
                          <p className="text-accent font-black uppercase text-xs mb-1 tracking-widest group-hover/item:text-white transition-colors cursor-default">{item.title}</p>
                          <p className="text-foreground/40 font-medium italic mb-2 leading-none">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Floating "use cache" directive simulation */}
                <div className="absolute bottom-8 right-8 px-6 py-3 rounded-xl bg-accent text-white font-mono text-[10px] font-black tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <Sparkles size={14} className="animate-pulse" />
                  &quot;use cache&quot;;
                </div>
              </div>

              {/* Lab Highlights */}
              <div className="lg:col-span-5 flex flex-col justify-between py-4">
                <div className="space-y-8">
                  <div className="p-8 rounded-[2rem] bg-foreground/5 border border-foreground/10 hover:border-accent/30 transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent mb-4 block underline">Research Focus</span>
                    <p className="text-foreground font-black text-2xl md:text-3xl tracking-tighter leading-none mb-6 italic">Zero-JS <span className="text-accent">Static shells</span> with hydration-free dynamics.</p>
                    <p className="text-foreground/40 text-sm italic font-medium">Achieving near-zero LCP through Partial Prerendering and granular component-level streaming.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {featureLab.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-[9px] font-black uppercase tracking-[0.2em] text-foreground/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Magnetic strength={0.2}>
                  <a href={featureLab.githubLink} target="_blank" rel="noopener noreferrer" className="group mt-12 px-10 py-6 rounded-3xl bg-foreground text-background font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:bg-accent hover:text-white transition-all transform hover:scale-[1.02]">
                    Inspect Lab Repository
                    <Github size={20} className="group-hover:rotate-12 transition-transform" />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
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

            {/* Stack Highlights Footer Card */}
            <div className="md:col-span-12 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] card-gradient flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group mt-10">
              <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={200} />
              </div>
              <div className="relative z-10 max-w-xl">
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-6 uppercase italic underline decoration-accent/40">Continuously <span className="not-italic">Evolving</span></h3>
                <p className="text-foreground/60 text-lg font-medium leading-relaxed">
                  Beyond languages and libraries, I focus on building <span className="text-foreground font-black">Architecture First</span> systems that are maintainable, performant, and future-proof.
                </p>
              </div>
              <div className="relative z-10 flex gap-4">
                 <div className="p-6 rounded-3xl bg-accent/20 border border-accent/40 text-center animate-float">
                   <p className="text-4xl font-black text-white italic">0%</p>
                   <p className="text-[9px] font-black uppercase tracking-widest text-accent mt-1">Lints Errors</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-foreground/10 border border-foreground/20 text-center animate-float" style={{ animationDelay: "1s" }}>
                   <p className="text-4xl font-black text-white italic">100</p>
                   <p className="text-[9px] font-black uppercase tracking-widest text-foreground/40 mt-1">Lighthouse</p>
                 </div>
              </div>
            </div>
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
