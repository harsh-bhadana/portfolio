"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ChevronRight, Command } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface LogEntry {
  type: "command" | "result" | "error";
  content: string;
}

const COMMANDS = {
  HELP: "/help",
  THEME: "/theme",
  JUMP: "/jump",
  WHOIS: "/whois",
  CLEAR: "/clear",
};

const SECTIONS = ["about", "experience", "projects", "labs", "skills", "contact"];

export default function CommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "result", content: "SYST_CORE_LOADED: Command Center V1.0.4" },
    { type: "result", content: "Type /help for available directives." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const fullCmd = cmdStr.trim();
    if (!fullCmd) return;

    setHistory((prev) => [...prev, { type: "command", content: fullCmd }]);
    
    const [base, ...args] = fullCmd.toLowerCase().split(" ");

    switch (base) {
      case COMMANDS.HELP:
        setHistory((prev) => [
          ...prev,
          { type: "result", content: "AVAILABLE DIRECTIVES:" },
          { type: "result", content: "  /theme [aurora|eclipse] - Switch visual phase" },
          { type: "result", content: "  /jump [section] - Quantum leap to sector (about, experience, projects, labs, skills, contact)" },
          { type: "result", content: "  /whois - Extract subject telemetry" },
          { type: "result", content: "  /clear - Purge terminal buffer" },
        ]);
        break;

      case COMMANDS.THEME:
        const targetTheme = args[0] as "aurora" | "eclipse";
        if (targetTheme === "aurora" || targetTheme === "eclipse") {
          setTheme(targetTheme);
          setHistory((prev) => [...prev, { type: "result", content: `PHASE_SHIFT: ${targetTheme.toUpperCase()} MODE ACTIVE` }]);
        } else {
          setHistory((prev) => [...prev, { type: "error", content: "ERR: INVALID_THEME. USE 'aurora' OR 'eclipse'." }]);
        }
        break;

      case COMMANDS.JUMP:
        const section = args[0];
        if (SECTIONS.includes(section)) {
          const el = document.getElementById(section);
          if (el) {
            setIsOpen(false);
            el.scrollIntoView({ behavior: "smooth" });
            setHistory((prev) => [...prev, { type: "result", content: `QUANTUM_LEAP: NAVIGATING TO SECTOR_${section.toUpperCase()}` }]);
          } else {
            setHistory((prev) => [...prev, { type: "error", content: `ERR: SECTOR_${section.toUpperCase()} NOT FOUND IN DOM.` }]);
          }
        } else {
          setHistory((prev) => [...prev, { type: "error", content: `ERR: INVALID_SECTOR. CHOOSE FROM: ${SECTIONS.join(", ")}` }]);
        }
        break;

      case COMMANDS.WHOIS:
        setHistory((prev) => [
          ...prev,
          { type: "result", content: "SUBJECT: HARSH BHADANA" },
          { type: "result", content: "ROLE: SENIOR FRONTEND DEVELOPER" },
          { type: "result", content: "EXP: 3+ YEARS (TCZ DIGITAL / ROYAL ENFIELD)" },
          { type: "result", content: "SPECIALIZATION: NEXT.JS / REACT / HIGH-PERFORMANCE UI" },
          { type: "result", content: "LOCATION: INDIA" },
          { type: "result", content: "STATUS: ACTIVE_FOR_PROJECTS" },
        ]);
        break;

      case COMMANDS.CLEAR:
        setHistory([]);
        break;

      default:
        setHistory((prev) => [...prev, { type: "error", content: `ERR: UNKNOWN DIRECTIVE '${base}'. TYPE /help FOR PROTOCOLS.` }]);
    }

    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-black/40"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(255,70,85,0.3)] crt-overlay"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="scanline" />
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <Terminal size={16} className="text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Command Center</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-mono font-bold text-white/20 uppercase tracking-widest hidden md:block">ESC to Close</span>
                  <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Terminal Output */}
              <div 
                ref={scrollRef}
                className="h-[300px] md:h-[400px] overflow-y-auto p-6 font-mono text-sm custom-scrollbar bg-black/40"
              >
                <div className="space-y-2">
                  {history.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-3 ${
                        log.type === "command" ? "text-white" : 
                        log.type === "error" ? "text-red-500" : "text-accent"
                      }`}
                    >
                      <span className="opacity-30 shrink-0">
                        {log.type === "command" ? ">" : "#"}
                      </span>
                      <p className="leading-relaxed whitespace-pre-wrap break-all uppercase font-bold tracking-tight">
                        {log.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Terminal Input */}
              <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 border border-accent/20">
                  <ChevronRight size={16} className="text-accent" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCommand(input);
                    }
                  }}
                  placeholder="Enter directive..."
                  className="bg-transparent border-none outline-none flex-1 text-white font-mono placeholder:text-white/10 uppercase tracking-widest font-bold"
                />
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
                   <Command size={10} className="text-white/30" />
                   <span className="text-[9px] font-black text-white/30 tracking-tight">K</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
