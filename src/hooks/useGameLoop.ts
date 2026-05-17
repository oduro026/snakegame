"use client";

import { useEffect, useRef } from "react";
import { getTickInterval } from "@/lib/game/engine";
import { useGameStore } from "@/store/game-store";

export function useGameLoop() {
  const engine = useGameStore((s) => s.engine);
  const advanceTick = useGameStore((s) => s.advanceTick);
  const lastTickRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (engine.status !== "playing") {
      lastTickRef.current = 0;
      return;
    }

    const interval = getTickInterval(engine);

    const loop = (timestamp: number) => {
      if (lastTickRef.current === 0) {
        lastTickRef.current = timestamp;
      }

      const elapsed = timestamp - lastTickRef.current;
      if (elapsed >= interval) {
        advanceTick();
        lastTickRef.current = timestamp;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [engine.status, engine.speedLevel, engine.config.difficulty, advanceTick]);
}
