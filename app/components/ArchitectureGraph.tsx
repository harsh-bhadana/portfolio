"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Database, Globe, Zap, Box, Share2 } from "lucide-react";

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

  // Calculate node positions
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const types = ["client", "server", "service", "db"];
    
    // Simple horizontal layout based on type
    nodes.forEach((node) => {
      const typeIndex = types.indexOf(node.type);
      const sameTypeNodes = nodes.filter(n => n.type === node.type);
      const nodeIndex = sameTypeNodes.indexOf(node);
      
      const x = (typeIndex + 1) * 200;
      const y = 300 + (nodeIndex - (sameTypeNodes.length - 1) / 2) * 120;
      
      positions[node.id] = { x, y };
    });
    
    return positions;
  }, [nodes]);

  const getIcon = (type: string) => {
    switch (type) {
      case "client": return Globe;
      case "server": return Cpu;
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
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 backdrop-blur-xl bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-6xl h-[80vh] bg-foreground/[0.02] border border-white/10 rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-8 left-12 flex flex-col">
          <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Technical Blueprint</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">{project.name}</h2>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-12 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent transition-all group"
        >
          <X className="text-white group-hover:scale-110" />
        </button>

        {/* Global Architecture Graph */}
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="20" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent)" opacity="0.5" />
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
                    transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                    d={`M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}`}
                    className="flow-line"
                    fill="none"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 10}
                    className="text-[8px] font-black fill-accent/40 tracking-[0.2em] uppercase text-center"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </motion.text>
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
                initial={{ scale: 0, opacity: 0, x: -100 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.2 + i * 0.1, 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
                className="absolute flex flex-col items-center group cursor-default"
                style={{ 
                  left: pos.x, 
                  top: pos.y, 
                  transform: 'translate(-50%, -50%)' 
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-accent relative group-hover:scale-110 group-hover:border-accent transition-all duration-300 node-pulse shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                   <Icon size={28} />
                   <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                </div>
                
                <div className="mt-4 text-center">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 whitespace-nowrap">{node.label}</h3>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none w-48 p-4 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md z-50">
                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                      {node.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-12 px-12 py-4 rounded-full bg-white/[0.03] border border-white/5 flex items-center gap-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Data Synapse Active</span>
          </div>
          <div className="flex items-center gap-2">
             <Share2 size={10} className="text-white/30" />
             <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Full Stack Integrity Verified</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
