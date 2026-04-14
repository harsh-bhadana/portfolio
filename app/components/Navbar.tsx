"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User, Briefcase, Layout, Beaker, Zap, Mail } from "lucide-react";
import Magnetic from "./Magnetic";
import PhaseToggle from "./PhaseToggle";
import { useTheme } from "../context/ThemeContext";
import Logo from "./Logo";

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
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // More sensitive to top entries
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
  }, [theme]);

  const isAurora = theme === "aurora";

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
        className={`rounded-2xl px-1 md:px-4 py-2 flex items-center gap-0.5 md:gap-2 transition-all duration-500 ${
          isAurora
            ? "bg-white border-2 border-accent shadow-xl"
            : `glass ${scrolled ? "shadow-2xl shadow-accent/10 border-foreground/20" : "border-foreground/10"}`
        }`}
      >
        <div className="flex items-center gap-2 px-3 md:px-4">
          <Logo />
          <div className="hidden md:block h-4 w-px bg-foreground/10 mx-1 md:mx-2" />
          <PhaseToggle />
        </div>

        {/* Desktop Links Container */}
        <div className="hidden md:flex items-center gap-1 ml-2 border-l border-foreground/5 pl-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <Magnetic key={link.name} strength={0.25}>
                <a
                  href={link.href}
                  className={`relative px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group ${
                    isActive 
                      ? "text-white" 
                      : (isAurora ? "text-foreground/60 hover:text-accent" : "text-foreground/40 hover:text-foreground/70")
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && (
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

                  {isActive && (
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
    </div>
  );
}
