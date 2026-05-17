"use client";

import { useEffect } from "react";
import type { Direction } from "@/types/game";
import { useGameStore } from "@/store/game-store";

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  W: "up",
  s: "down",
  S: "down",
  a: "left",
  A: "left",
  d: "right",
  D: "right",
};

export function useKeyboardControls(enabled: boolean) {
  const setDirection = useGameStore((s) => s.setDirection);
  const pauseGame = useGameStore((s) => s.pauseGame);
  const resumeGame = useGameStore((s) => s.resumeGame);
  const engine = useGameStore((s) => s.engine);
  const screen = useGameStore((s) => s.screen);

  useEffect(() => {
    if (!enabled || screen !== "game") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Escape") {
        event.preventDefault();
        if (engine.status === "playing") pauseGame();
        else if (engine.status === "paused") resumeGame();
        return;
      }

      const direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        setDirection(direction);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    enabled,
    screen,
    engine.status,
    setDirection,
    pauseGame,
    resumeGame,
  ]);
}
