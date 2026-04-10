"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, ShieldCheck, Database, Zap, Box, Activity, ChevronRight } from "lucide-react";

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

const TYPE_META: Record<string, { icon: React.ElementType; color: string; label: string; bg: string; border: string }> = {
  client:  { icon: Globe,        color: "#a78bfa", label: "Client",  bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)" },
  server:  { icon: ShieldCheck,  color: "#34d399", label: "Server",  bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.25)" },
  db:      { icon: Database,     color: "#fb923c", label: "Storage", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.25)" },
  service: { icon: Zap,          color: "#facc15", label: "Service", bg: "rgba(250,204,21,0.08)",  border: "rgba(250,204,21,0.25)" },
};

export default function ArchitectureGraph({ project, onClose }: ArchitectureGraphProps) {
  const { nodes, edges } = project.graph;
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!hasMounted) return null;

  // --- Layout: distribute nodes in a flow from left to right by type order ---
  const typeOrder = ["client", "server", "service", "db"];
  // Group by type, then assign column (x) and row (y) positions
  type PositionedNode = Node & { x: number; y: number; col: number; row: number };

  const columns: Record<string, Node[]> = {};
  typeOrder.forEach(t => { columns[t] = []; });
  nodes.forEach(n => {
    const t = typeOrder.includes(n.type) ? n.type : "service";
    columns[t].push(n);
  });

  // Only include columns that have nodes
  const activeTypes = typeOrder.filter(t => columns[t].length > 0);
  const totalCols = activeTypes.length;

  // SVG canvas dimensions (viewBox)
  const W = 900;
  const colWidth = W / totalCols;
  const nodeW = 220;
  const nodeH = 88;
  const nodeRadius = 20;
  // Row spacing
  const rowGap = 110;

  const positioned: PositionedNode[] = [];
  activeTypes.forEach((type, colIdx) => {
    const colNodes = columns[type];
    const colX = colIdx * colWidth + colWidth / 2;
    const maxRows = Math.max(...activeTypes.map(t => columns[t].length));
    const totalH = (colNodes.length - 1) * rowGap;
    colNodes.forEach((node, rowIdx) => {
      const rowY = 180 + rowIdx * rowGap - totalH / 2;
      positioned.push({ ...node, x: colX, y: rowY, col: colIdx, row: rowIdx });
    });
  });

  const svgH = Math.max(400, 360 + Math.max(...activeTypes.map(t => columns[t].length)) * rowGap);

  // Build a lookup for connector points
  const posMap: Record<string, { x: number; y: number }> = {};
  positioned.forEach(n => { posMap[n.id] = { x: n.x, y: n.y }; });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-8 backdrop-blur-2xl bg-black/85"
      onClick={onClose}
      style={{ fontFamily: "inherit" }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 200 }}
        className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden relative shadow-2xl flex flex-col"
        style={{ maxHeight: "95vh" }}
        onClick={e => e.stopPropagation()}
      >

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 pb-5 border-b border-white/[0.06] shrink-0">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-accent opacity-60 block mb-1">
              Architectural Blueprint
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic leading-none">
              {project.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-3 md:p-4 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent transition-all group"
            title="Close (Esc)"
          >
            <X className="text-white group-hover:scale-110 transition-transform" size={20} />
          </button>
        </div>

        {/* ── Main: Graph + Sidebar ── */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">

          {/* ── SVG Graph ── */}
          <div className="flex-1 overflow-auto custom-scrollbar min-h-0 p-4 md:p-6">
            <svg
              viewBox={`0 0 ${W} ${svgH}`}
              width="100%"
              style={{ minWidth: 340, display: "block" }}
            >
              <defs>
                {/* Glow filter */}
                <filter id="node-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>

                {/* Arrow markers per type */}
                {Object.entries(TYPE_META).map(([t, m]) => (
                  <marker
                    key={t}
                    id={`arrow-${t}`}
                    markerWidth="10" markerHeight="7"
                    refX="9" refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill={m.color} opacity="0.8" />
                  </marker>
                ))}
              </defs>

              {/* ── Column header labels ── */}
              {activeTypes.map((type, colIdx) => {
                const meta = TYPE_META[type] ?? TYPE_META.service;
                const cx = colIdx * colWidth + colWidth / 2;
                return (
                  <g key={type}>
                    {/* Subtle column lane */}
                    <rect
                      x={cx - colWidth / 2 + 8}
                      y={60}
                      width={colWidth - 16}
                      height={svgH - 80}
                      rx={16}
                      fill={meta.bg}
                      opacity={0.45}
                    />
                    {/* Type label at top */}
                    <text
                      x={cx}
                      y={38}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="900"
                      fill={meta.color}
                      opacity={0.7}
                      style={{ letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "inherit" }}
                    >
                      {meta.label} Layer
                    </text>
                  </g>
                );
              })}

              {/* ── Edges ── */}
              {edges.map((edge, i) => {
                const from = posMap[edge.from];
                const to = posMap[edge.to];
                if (!from || !to) return null;

                const fromNode = positioned.find(n => n.id === edge.from)!;
                const toNode   = positioned.find(n => n.id === edge.to)!;
                const meta = TYPE_META[fromNode?.type] ?? TYPE_META.service;

                // Connect right-edge of source to left-edge of destination (horizontal flow)
                // If same column, connect bottom to top
                const sameCol = fromNode?.col === toNode?.col;
                let x1 = from.x + nodeW / 2;
                let y1 = from.y;
                let x2 = to.x - nodeW / 2;
                let y2 = to.y;
                let path: string;

                if (sameCol) {
                  // vertical connection
                  x1 = from.x;
                  y1 = from.y + nodeH / 2;
                  x2 = to.x;
                  y2 = to.y - nodeH / 2;
                  path = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
                } else if (fromNode.col > toNode.col) {
                  // right to left (reverse)
                  x1 = from.x - nodeW / 2;
                  x2 = to.x + nodeW / 2;
                  path = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
                } else {
                  path = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
                }

                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2 - 14;

                return (
                  <g key={i}>
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 1.2, ease: "easeInOut" }}
                      d={path}
                      fill="none"
                      stroke={meta.color}
                      strokeWidth={1.8}
                      strokeOpacity={0.55}
                      strokeDasharray="5 3"
                      markerEnd={`url(#arrow-${fromNode?.type ?? "service"})`}
                    />
                    <motion.rect
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.15 }}
                      x={midX - 32}
                      y={midY - 10}
                      width={64}
                      height={20}
                      rx={6}
                      fill="rgba(0,0,0,0.7)"
                    />
                    <motion.text
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.15 }}
                      x={midX}
                      y={midY + 4}
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill={meta.color}
                      opacity={0.85}
                      style={{ letterSpacing: "0.3em", fontFamily: "inherit" }}
                    >
                      {edge.label}
                    </motion.text>
                  </g>
                );
              })}

              {/* ── Nodes ── */}
              {positioned.map((node, i) => {
                const meta = TYPE_META[node.type] ?? TYPE_META.service;
                const Icon = meta.icon;
                const isSelected = selectedNode === node.id;
                const nx = node.x - nodeW / 2;
                const ny = node.y - nodeH / 2;

                return (
                  <motion.g
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 280, damping: 22 }}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedNode(isSelected ? null : node.id)}
                  >
                    {/* Glow aura when selected */}
                    {isSelected && (
                      <rect
                        x={nx - 6} y={ny - 6}
                        width={nodeW + 12} height={nodeH + 12}
                        rx={nodeRadius + 4}
                        fill={meta.color}
                        opacity={0.12}
                        filter="url(#node-glow)"
                      />
                    )}

                    {/* Card background */}
                    <rect
                      x={nx} y={ny}
                      width={nodeW} height={nodeH}
                      rx={nodeRadius}
                      fill={isSelected ? meta.bg : "rgba(15,15,15,0.95)"}
                      stroke={isSelected ? meta.color : meta.border}
                      strokeWidth={isSelected ? 1.5 : 1}
                    />

                    {/* Icon circle */}
                    <circle
                      cx={nx + 36} cy={node.y}
                      r={20}
                      fill={meta.bg}
                      stroke={meta.border}
                      strokeWidth={1}
                    />

                    {/* Lucide icon rendered as foreignObject */}
                    <foreignObject x={nx + 16} y={node.y - 20} width={40} height={40}>
                      <div
                        style={{
                          width: 40, height: 40,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: meta.color,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                    </foreignObject>

                    {/* Label */}
                    <text
                      x={nx + 68} y={node.y - 10}
                      fontSize="12"
                      fontWeight="900"
                      fill="rgba(255,255,255,0.9)"
                      style={{ letterSpacing: "0.05em", fontFamily: "inherit" }}
                    >
                      {node.label}
                    </text>

                    {/* Description (2 lines, truncated) */}
                    <foreignObject x={nx + 68} y={node.y + 2} width={nodeW - 78} height={38}>
                      <div
                        style={{
                          fontSize: 9.5,
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.38)",
                          lineHeight: 1.45,
                          letterSpacing: "0.01em",
                          fontFamily: "inherit",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {node.desc}
                      </div>
                    </foreignObject>
                  </motion.g>
                );
              })}
            </svg>
          </div>

          {/* ── Right Sidebar: Selected Node Detail / Legend ── */}
          <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-white/[0.06] shrink-0 flex flex-col">

            <AnimatePresence mode="wait">
              {selectedNode ? (() => {
                const node = positioned.find(n => n.id === selectedNode)!;
                const meta = TYPE_META[node.type] ?? TYPE_META.service;
                const Icon = meta.icon;
                return (
                  <motion.div
                    key={selectedNode}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col h-full p-6 md:p-8"
                  >
                    <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/30 mb-6">
                      Node Inspector
                    </span>
                    <div
                      className="p-5 rounded-2xl mb-6"
                      style={{ background: meta.bg, border: `1px solid ${meta.border}` }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl" style={{ background: `${meta.color}20` }}>
                          <Icon size={20} style={{ color: meta.color }} />
                        </div>
                        <div>
                          <div className="text-white font-black text-base leading-tight">{node.label}</div>
                          <div className="text-[9px] font-black uppercase tracking-widest mt-0.5" style={{ color: meta.color }}>
                            {meta.label} Layer
                          </div>
                        </div>
                      </div>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">{node.desc}</p>
                    </div>

                    {/* Connected edges */}
                    {(() => {
                      const related = edges.filter(e => e.from === node.id || e.to === node.id);
                      if (related.length === 0) return null;
                      return (
                        <div>
                          <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/30 mb-4 block">
                            Connections
                          </span>
                          <div className="space-y-3">
                            {related.map((e, i) => {
                              const isOut = e.from === node.id;
                              const otherId = isOut ? e.to : e.from;
                              const other = positioned.find(n => n.id === otherId);
                              const om = TYPE_META[other?.type ?? "service"];
                              return (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                  <ChevronRight
                                    size={12}
                                    style={{
                                      color: meta.color,
                                      transform: isOut ? "none" : "rotate(180deg)"
                                    }}
                                  />
                                  <span className="font-black text-white/70 text-xs">{e.label}</span>
                                  <span className="text-white/35 text-xs font-mono ml-auto">{other?.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}

                    <button
                      onClick={() => setSelectedNode(null)}
                      className="mt-auto text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors text-left"
                    >
                      ← Clear selection
                    </button>
                  </motion.div>
                );
              })() : (
                <motion.div
                  key="legend"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full p-6 md:p-8"
                >
                  <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/30 mb-6">
                    Layer Legend
                  </span>
                  <div className="space-y-4">
                    {Object.entries(TYPE_META).map(([type, meta]) => {
                      const Icon = meta.icon;
                      const count = nodes.filter(n => n.type === type).length;
                      if (count === 0) return null;
                      return (
                        <div key={type} className="flex items-center gap-4">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: meta.bg, border: `1px solid ${meta.border}` }}
                          >
                            <Icon size={16} style={{ color: meta.color }} />
                          </div>
                          <div>
                            <div className="text-white/80 font-black text-sm">{meta.label}</div>
                            <div className="text-white/25 text-[10px] font-bold">{count} node{count > 1 ? "s" : ""}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/[0.06]">
                    <p className="text-white/20 text-[10px] font-bold leading-relaxed">
                      Click any node in the diagram to inspect its connections and details.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Footer Status Bar ── */}
        <div className="px-6 md:px-10 py-3 border-t border-white/[0.06] flex items-center justify-between bg-white/[0.01] shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--accent)]" />
            <span className="text-[9px] font-black text-white/25 uppercase tracking-[0.3em]">Synapse Active</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] hidden md:block">
              {nodes.length} Nodes · {edges.length} Connections
            </span>
            <div className="flex items-center gap-2 text-white/20">
              <Activity size={12} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Click node to inspect</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
