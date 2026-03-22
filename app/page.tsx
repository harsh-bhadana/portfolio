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
} from "lucide-react";
import Navbar from "./components/Navbar";
import ExperienceItem from "./components/ExperienceItem";
import Footer from "./components/Footer";

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
    name: "Clicks",
    icon: Camera,
    description: "A high-performance, dark-themed photography gallery featuring infinite scroll and a premium lightbox experience. Built with a content-first philosophy.",
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
    description: "A collection of experiments and demonstrations exploring modern Next.js and React 19 capabilities. Isolates unique edge-cases, performance optimization techniques, and new API specimens.",
    tech: ["Next.js 15", "React 19", "Server Actions", "PPR"],
    github: "https://github.com/harsh-bhadana/next-labs"
  }
];

export default function Home() {
  return (
    <div className="bg-background text-foreground selection:bg-accent/30 relative overflow-hidden">
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

      <main className="max-w-5xl mx-auto px-6 pt-32 relative z-10">
        {/* Hero Section */}
        <section id="about" className="py-20 md:py-40 snap-start">
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

            <h1 className="text-5xl md:text-[10rem] font-black tracking-tighter mb-10 leading-[0.9] md:leading-[0.8] mix-blend-difference">
              Harsh <br className="md:hidden" />
              <span className="text-gradient">Bhadana</span>
            </h1>

            <p className="max-w-xl text-xl md:text-2xl text-foreground/70 font-medium leading-relaxed mb-12">
              Senior <span className="text-white italic">Frontend Developer</span> crafting high-performance, secure, and user-centric digital experiences.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6">
              <a
                href="#experience"
                className="group px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-white text-black font-bold hover:bg-accent hover:text-white transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                View Experience
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 md:px-10 py-4 md:py-5 rounded-2xl border-2 border-white/10 font-bold hover:bg-white/5 transition-all text-foreground/80 text-center"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 md:py-40 snap-start">
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
        <section className="py-20 md:py-40 snap-start">
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
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-4 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-accent/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-black mb-6 uppercase tracking-wider">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-foreground/40">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Project Cards (Bento Style) */}
            <div id="projects" className="md:col-span-12">
              <div>
                <span className="text-accent font-black tracking-widest uppercase text-xs mb-4 block">03 / Creation</span>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter">Latest <span className="animate-gradient">Works</span></h2>
              </div>
            </div>

            {githubProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all relative overflow-hidden ${index === 0 ? "md:col-span-7" : "md:col-span-5"
                  }`}
              >
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all">
                  <project.icon size={128} />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-3xl md:text-4xl font-black mb-6 group-hover:text-accent transition-colors leading-none">{project.name}</h3>
                  <p className="text-foreground/50 mb-10 leading-relaxed font-medium">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-[9px] font-black uppercase tracking-widest text-accent">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-6">
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
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 snap-start">
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
                  <a href="https://www.linkedin.com/in/harsh-bhadana-2a1793231/" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border-2 border-white/20 hover:bg-white/10 transition-all">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://github.com/harsh-bhadana" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border-2 border-white/20 hover:bg-white/10 transition-all">
                    <Github size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
