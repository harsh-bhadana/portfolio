"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Database, Globe, Zap, Box, Share2, ShieldCheck, Activity } from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "client" | "server" | "db" | "service";
  desc: string;
}

interface Edge {
  from: string;
  to: string;
  label: string;
}

interface ArchitectureGraphProps {
  project: {
    name: string;
    graph: {
      nodes: Node[];
      edges: Edge[];
    };
  };
  onClose: () => void;
}

export default function ArchitectureGraph({ project, onClose }: ArchitectureGraphProps) {
  const { nodes, edges } = project.graph;
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const isMobile = windowSize.width < 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Calculate node positions dynamically
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const types = ["client", "server", "service", "db"];
    
    const containerW = Math.min(windowSize.width * 0.9, 1100);
    const containerH = windowSize.height * 0.6;
    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;

    nodes.forEach((node, i) => {
      if (isMobile) {
        // Vertical Stack
        const totalHeight = nodes.length * 100;
        positions[node.id] = { 
          x: centerX, 
          y: centerY - (totalHeight / 2) + (i * 120) 
        };
      } else {
        // Horizontal Flow
        const typeIndex = types.indexOf(node.type);
        const sameTypeNodes = nodes.filter(n => n.type === node.type);
        const nodeIndexInType = sameTypeNodes.indexOf(node);
        
        const columnX = centerX - (containerW / 2) + (typeIndex * (containerW / (types.length - 1)));
        const rowY = centerY + (nodeIndexInType - (sameTypeNodes.length - 1) / 2) * 120;
        
        positions[node.id] = { x: columnX, y: rowY };
      }
    });
    
    return positions;
  }, [nodes, windowSize, isMobile]);

  const getIcon = (type: string) => {
    switch (type) {
      case "client": return Globe;
      case "server": return ShieldCheck;
      case "db": return Database;
      case "service": return Zap;
      default: return Box;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 backdrop-blur-2xl bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="w-full max-w-7xl h-full md:h-[85vh] bg-foreground/[0.01] border border-white/10 rounded-[2rem] md:rounded-[4rem] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-8 left-8 md:top-12 md:left-16 flex flex-col pointer-events-none">
          <span className="text-accent font-black tracking-[0.4em] uppercase text-[8px] md:text-[10px] mb-2 opacity-60">Architectural Blueprint</span>
          <h2 className="text-3xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">{project.name}</h2>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 md:top-12 md:right-16 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent transition-all group z-[210]"
          title="Close (Esc)"
        >
          <X className="text-white group-hover:scale-110" size={24} />
        </button>

        {/* Global Architecture Graph */}
        <div className="relative w-full h-full overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent)" />
              </marker>
            </defs>
            {edges.map((edge, i) => {
              const from = nodePositions[edge.from];
              const to = nodePositions[edge.to];
              if (!from || !to) return null;

              return (
                <g key={i}>
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 1.5, ease: "easeInOut" }}
                    d={isMobile 
                        ? `M ${from.x} ${from.y} L ${to.x} ${to.y}`
                        : `M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}`}
                    className="flow-line"
                    fill="none"
                    strokeWidth={isMobile ? "1.5" : "2"}
                    markerEnd="url(#arrowhead)"
                  />
                  {!isMobile && (
                    <motion.text
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2 - 12}
                      className="text-[9px] font-black fill-accent/60 tracking-[0.3em] uppercase"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </motion.text>
                  )}
                </g>
              );
            })}
          </svg>

          {nodes.map((node, i) => {
            const pos = nodePositions[node.id];
            const Icon = getIcon(node.type);
            
            return (
              <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.3 + i * 0.05, 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25 
                }}
                className="absolute flex flex-col items-center group cursor-help"
                style={{ 
                  left: pos.x, 
                  top: pos.y, 
                  transform: 'translate(-50%, -50%)' 
                }}
              >
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-black border border-white/10 flex items-center justify-center text-accent relative group-hover:scale-110 group-hover:border-accent transition-all duration-500 node-pulse shadow-2xl">
                   <Icon size={isMobile ? 24 : 32} />
                   <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
                </div>
                
                <div className="mt-4 text-center pointer-events-none">
                  <h3 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/50 group-hover:text-accent transition-colors whitespace-nowrap">{node.label}</h3>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 w-48 md:w-64 p-5 rounded-2xl bg-black/90 border border-white/10 backdrop-blur-xl z-[220] shadow-2xl scale-90 group-hover:scale-100">
                    <p className="text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                      {node.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-8 md:bottom-16 px-10 md:px-16 py-5 rounded-full bg-white/[0.02] border border-white/5 flex items-center gap-12 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--accent)]" />
            <span className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Synapse Active</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
             <ShieldCheck size={14} className="text-white/30" />
             <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Integrity Verified</span>
          </div>
          <div className="flex items-center gap-3">
             <Activity size={14} className="text-white/30" />
             <span className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">60FPS Ready</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
