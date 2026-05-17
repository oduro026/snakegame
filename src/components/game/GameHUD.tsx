"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/game-store";

export function GameHUD() {
  const score = useGameStore((s) => s.engine.score);
  const highScore = useGameStore((s) => s.highScore);
  const mode = useGameStore((s) => s.settings.mode);
  const difficulty = useGameStore((s) => s.settings.difficulty);

  return (
    <div className="flex w-full max-w-[min(92vw,520px)] items-center justify-between gap-4 text-sm">
      <motion.div
        key={score}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.15 }}
      >
        <p className="text-[var(--muted)] uppercase tracking-widest">Score</p>
        <p className="text-2xl font-bold text-[var(--accent)] tabular-nums">
          {score}
        </p>
      </motion.div>
      <motion.div className="hidden text-center sm:block">
        <p className="text-[var(--muted)] uppercase tracking-widest">Best</p>
        <p className="text-xl font-semibold tabular-nums">{highScore}</p>
      </motion.div>
      <div className="text-right">
        <p className="text-[var(--muted)] uppercase tracking-widest">Mode</p>
        <p className="font-medium capitalize">
          {mode} · {difficulty}
        </p>
      </div>
    </div>
  );
}
