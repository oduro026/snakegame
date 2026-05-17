"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { useGameStore } from "@/store/game-store";

export function MainMenu() {
  const startGame = useGameStore((s) => s.startGame);
  const setScreen = useGameStore((s) => s.setScreen);
  const highScore = useGameStore((s) => s.highScore);
  const settings = useGameStore((s) => s.settings);

  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div className="text-center">
        <h1 className="text-4xl font-black tracking-tight text-[var(--accent)] sm:text-5xl">
          Modern Snake
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          {settings.mode} mode · {settings.difficulty}
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          High score: <span className="text-[var(--foreground)]">{highScore}</span>
        </p>
      </motion.div>

      <Panel className="flex w-full max-w-sm flex-col gap-3">
        <Button onClick={startGame}>Play</Button>
        <Button variant="secondary" onClick={() => setScreen("settings")}>
          Settings
        </Button>
        <Button variant="secondary" onClick={() => setScreen("leaderboard")}>
          Leaderboard
        </Button>
      </Panel>

      <p className="max-w-xs text-center text-xs text-[var(--muted)]">
        Arrow keys or WASD on desktop. Swipe or use the pad on mobile. Space to
        pause.
      </p>
    </motion.div>
  );
}
