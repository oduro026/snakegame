"use client";

import { motion } from "framer-motion";
import type { Direction } from "@/types/game";
import { useGameStore } from "@/store/game-store";

export function MobileControls() {
  const setDirection = useGameStore((s) => s.setDirection);
  const status = useGameStore((s) => s.engine.status);

  if (status !== "playing" && status !== "paused") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid w-full max-w-[240px] grid-cols-3 gap-2 sm:hidden"
    >
      <motion.div />
      <PadButton label="↑" onPress={() => setDirection("up")} />
      <motion.div />
      <PadButton label="←" onPress={() => setDirection("left")} />
      <PadButton label="↓" onPress={() => setDirection("down")} />
      <PadButton label="→" onPress={() => setDirection("right")} />
    </motion.div>
  );
}

function PadButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      className="flex h-14 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xl text-[var(--accent)]"
    >
      {label}
    </motion.button>
  );
}
