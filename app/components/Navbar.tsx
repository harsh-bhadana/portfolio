"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User, Briefcase, Layout, Beaker, Zap, Mail } from "lucide-react";
import Magnetic from "./Magnetic";
import PhaseToggle from "./PhaseToggle";

const navLinks = [
  { name: "About", href: "#about", Icon: User },
  { name: "Experience", href: "#experience", Icon: Briefcase },
  { name: "Projects", href: "#projects", Icon: Layout },
  { name: "Labs", href: "#labs", Icon: Beaker },
  { name: "Skills", href: "#skills", Icon: Zap },
  { name: "Contact", href: "#contact", Icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
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
    };
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-6">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
                transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          delay: 0.6
        }}
        className={`glass rounded-2xl px-1 md:px-4 py-2 flex items-center gap-0.5 md:gap-2 transition-all duration-500 ${
          scrolled ? "shadow-2xl shadow-accent/10 border-foreground/20" : "border-foreground/10"
        }`}
      >
        <Magnetic strength={0.3}>
          <a href="/" className="px-3 md:px-4 text-lg md:text-xl font-black tracking-tighter hover:scale-110 transition-transform md:mr-4 flex-shrink-0">
            HB<span className="text-accent">.</span>
          </a>
        </Magnetic>

        <div className="h-4 w-px bg-foreground/10 mx-1 md:mx-2" />
        <PhaseToggle />
        <div className="h-4 w-px bg-foreground/10 mx-1 md:mx-2" />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <Magnetic key={link.name} strength={0.25}>
                <a
                  href={link.href}
                  className={`relative px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 flex items-center gap-2 ${
                    isActive ? "text-white" : "text-foreground/40 hover:text-foreground/70"
                  }`}
                >
                  {isActive && (
                    <>
                      <motion.div
                        layoutId="nav-bg"
                        className="absolute inset-0 bg-accent rounded-xl -z-10 shadow-[0_0_20px_rgba(255,70,85,0.4)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <link.Icon size={14} />
                      </motion.span>
                    </>
                  )}
                  {link.name}
                </a>
              </Magnetic>
            );
          })}
        </div>

        {/* Mobile Links (Icons Only) */}
        <div className="flex md:hidden items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            const Icon = link.Icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover="hover"
                initial="initial"
                className={`relative h-10 flex items-center px-2.5 md:px-3 transition-all duration-300 rounded-xl group ${
                  isActive ? "text-white bg-accent shadow-[0_0_15px_rgba(255,70,85,0.3)]" : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5"
                }`}
              >
                <Icon size={16} className="flex-shrink-0" />
                <motion.span
                  variants={{
                    initial: { width: 0, opacity: 0, marginLeft: 0 },
                    hover: { width: "auto", opacity: 1, marginLeft: 8 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden whitespace-nowrap text-[10px] font-black uppercase tracking-widest"
                >
                  {link.name}
                </motion.span>
              </motion.a>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}
