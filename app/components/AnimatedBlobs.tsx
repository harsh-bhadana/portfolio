"use client";

import { motion } from "framer-motion";

export default function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden mix-blend-overlay">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 45, 0],
          borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/15 bg-blob animate-float"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          rotate: [0, -45, 0],
          borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 60% 40% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-accent-secondary/15 bg-blob"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 150, 0],
          borderRadius: ["50% 50% 20% 80% / 25% 80% 20% 75%", "80% 20% 50% 50% / 75% 20% 80% 25%", "50% 50% 20% 80% / 25% 80% 20% 75%"]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-accent-tertiary/15 bg-blob"
      />
    </div>
  );
}
