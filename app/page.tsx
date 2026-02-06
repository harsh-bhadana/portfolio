"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Layers,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  ChevronRight,
  Database,
  Globe
} from "lucide-react";
import Navbar from "./components/Navbar";
import ExperienceItem from "./components/ExperienceItem";

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
  { category: "Frontend", items: ["Next.js (App Router)", "React", "Redux Toolkit", "Tailwind CSS", "JavaScript (ES6+)"], icon: <Globe className="w-5 h-5" /> },
  { category: "Tools & Backend", items: ["Firebase", "Git & GitHub", "REST APIs", "Content Security Policy"], icon: <Database className="w-5 h-5" /> },
  { category: "Deployment", items: ["Vercel", "Firebase Hosting"], icon: <Layers className="w-5 h-5" /> }
];

export default function Home() {
  return (
    <div className="bg-background text-foreground selection:bg-accent/30">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-32">
        {/* Hero Section */}
        <section id="hero" className="py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Available for new projects
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Harsh <span className="text-accent underline decoration-accent/20 underline-offset-8">Bhadana</span>
            </h1>

            <p className="max-w-2xl text-xl md:text-2xl text-foreground/60 font-medium leading-relaxed mb-10">
              Senior Frontend Developer crafting high-performance, secure, and user-centric digital experiences with <span className="text-white">Next.js</span> and <span className="text-white">Redux</span>.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#experience"
                className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-accent hover:text-white transition-all transform hover:scale-105"
              >
                View Experience
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full border border-border font-semibold hover:bg-white/5 transition-all"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Professional Exp.</h2>
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-accent font-mono">01</span>
          </div>

          <div>
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} {...exp} />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-accent font-mono">02</span>
            <div className="h-px flex-1 bg-border"></div>
            <h2 className="text-3xl font-bold tracking-tight">Tech Stack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-border bg-white/[0.02]"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-bold mb-4">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="text-foreground/50 text-sm flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40">
          <div className="p-12 md:p-20 rounded-[3rem] bg-accent text-white relative overflow-hidden text-center">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
                LET&apos;S BUILD SOMETHING <br /> EXTRAORDINARY
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="mailto:harshbhadana40@gmail.com"
                  className="px-10 py-5 rounded-full bg-white text-black font-bold flex items-center gap-3 hover:scale-105 transition-transform"
                >
                  <Mail className="w-5 h-5" />
                  Email Me
                </a>
                <div className="flex items-center gap-4">
                  <a href="#" className="p-4 rounded-full bg-black/20 hover:bg-black/40 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="p-4 rounded-full bg-black/20 hover:bg-black/40 transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-20 flex flex-col md:flex-row justify-between items-center text-foreground/40 text-sm gap-4">
            <p>© 2026 Harsh Bhadana. Built with Passion & Caffeine.</p>
            <div className="flex gap-8">
              <span>Faridabad, Haryana</span>
              <span>9999182025</span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
