"use client";

import { motion } from "framer-motion";

export const AnimatedDashboard = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.rect x="3" y="3" width="7" height="7" rx="1" animate={{ scale: [1, 0.7, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
    <motion.rect x="14" y="3" width="7" height="7" rx="1" animate={{ scale: [1, 0.7, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
    <motion.rect x="14" y="14" width="7" height="7" rx="1" animate={{ scale: [1, 0.7, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
    <motion.rect x="3" y="14" width="7" height="7" rx="1" animate={{ scale: [1, 0.7, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
  </svg>
);

export const AnimatedCPU = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <motion.rect x="9" y="9" width="6" height="6" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
    {[ 
      {d: "M9 1v3", delay: 0}, {d: "M15 1v3", delay: 0.2}, 
      {d: "M9 20v3", delay: 0.4}, {d: "M15 20v3", delay: 0.6}, 
      {d: "M20 9h3", delay: 0.8}, {d: "M20 14h3", delay: 1.0}, 
      {d: "M1 9h3", delay: 1.2}, {d: "M1 14h3", delay: 1.4} 
    ].map((line, i) => (
      <motion.path key={i} d={line.d} animate={{ pathLength: [0, 1, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: line.delay }} />
    ))}
  </svg>
);

export const AnimatedDatabase = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.ellipse cx="12" cy="5" rx="9" ry="3" animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
    <motion.path d="M3 5V12C3 13.65 7.03 15 12 15C16.97 15 21 13.65 21 12V5" animate={{ y: [0, -1.5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} />
    <motion.path d="M3 12V19C3 20.65 7.03 22 12 22C16.97 22 21 20.65 21 19V12" />
  </svg>
);

export const AnimatedLayers = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.polygon points="12 2 2 7 12 12 22 7 12 2" animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
    <motion.polyline points="2 12 12 17 22 12" animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.polyline points="2 17 12 22 22 17" animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
  </svg>
);

export const AnimatedCamera = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <motion.circle cx="12" cy="13" r="3" animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
    <motion.circle cx="12" cy="13" r="1.5" animate={{ scale: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
  </svg>
);

export const AnimatedZap = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.polygon 
      points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" 
      animate={{ pathLength: [0, 1], fill: ["rgba(0,0,0,0)", color, "rgba(0,0,0,0)"], opacity: [0.2, 1, 0.2] }} 
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }} 
    />
  </svg>
);

export const AnimatedPaintbrush = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.g animate={{ rotate: [0, -15, 15, 0], x: [0, -2, 2, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "9px", originY: "15px" }}>
      <path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z" />
      <path d="M9 8c-2 3-4 3.5-7 4l8 8c.5-3 1-5 4-7" />
    </motion.g>
    <motion.path d="M14.5 17.5L4.5 15" animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
  </svg>
);

export const AnimatedGlobe = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <motion.path 
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" 
      animate={{ scaleX: [1, 0, -1, 0, 1] }} 
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
    />
    <path d="M2 12h20" />
  </svg>
);
