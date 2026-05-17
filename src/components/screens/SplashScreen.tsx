"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useGameStore } from "@/store/game-store";

export function SplashScreen() {
  const completeSplash = useGameStore((s) => s.completeSplash);

  useEffect(() => {
    const timer = setTimeout(completeSplash, 1800);
    return () => clearTimeout(timer);
  }, [completeSplash]);

  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-5xl font-black tracking-tighter text-[var(--accent)] drop-shadow-[0_0_30px_var(--accent-glow)] sm:text-6xl"
      >
        SNAKE
      </motion.div>
      <p className="text-sm uppercase tracking-[0.35em] text-[var(--muted)]">
        Modern Arcade
      </p>
    </motion.div>
  );
}
