"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { useGameStore } from "@/store/game-store";

export function LeaderboardScreen() {
  const leaderboard = useGameStore((s) => s.leaderboard);
  const highScore = useGameStore((s) => s.highScore);
  const setScreen = useGameStore((s) => s.setScreen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8"
    >
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      <p className="text-sm text-[var(--muted)]">
        All-time best: <span className="text-[var(--accent)]">{highScore}</span>
      </p>
      <Panel className="w-full max-w-md">
        {leaderboard.length === 0 ? (
          <p className="text-center text-sm text-[var(--muted)]">
            No scores yet. Play a game to set the record!
          </p>
        ) : (
          <ol className="space-y-2">
            {leaderboard.map((entry, index) => (
              <li
                key={`${entry.date}-${index}`}
                className="flex items-center justify-between rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              >
                <span className="font-mono text-[var(--muted)]">
                  #{index + 1}
                </span>
                <span className="font-bold tabular-nums">{entry.score}</span>
                <span className="text-xs capitalize text-[var(--muted)]">
                  {entry.mode} · {entry.difficulty}
                </span>
              </li>
            ))}
          </ol>
        )}
        <Button
          variant="secondary"
          className="mt-6 w-full"
          onClick={() => setScreen("menu")}
        >
          Back to menu
        </Button>
      </Panel>
    </motion.div>
  );
}
