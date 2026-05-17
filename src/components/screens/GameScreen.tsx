"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { GameBoard } from "@/components/game/GameBoard";
import { GameHUD } from "@/components/game/GameHUD";
import { MobileControls } from "@/components/game/MobileControls";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { useGameLoop } from "@/hooks/useGameLoop";
import { useKeyboardControls } from "@/hooks/useKeyboardControls";
import { useSwipeControls } from "@/hooks/useSwipeControls";
import { useGameStore } from "@/store/game-store";

export function GameScreen() {
  const engine = useGameStore((s) => s.engine);
  const pauseGame = useGameStore((s) => s.pauseGame);
  const resumeGame = useGameStore((s) => s.resumeGame);
  const restartGame = useGameStore((s) => s.restartGame);
  const goToMenu = useGameStore((s) => s.goToMenu);
  const finalizeScore = useGameStore((s) => s.finalizeScore);
  const highScore = useGameStore((s) => s.highScore);

  useGameLoop();
  useKeyboardControls(true);
  const { onTouchStart, onTouchEnd } = useSwipeControls();

  useEffect(() => {
    if (engine.status === "gameover") {
      finalizeScore();
    }
  }, [engine.status, finalizeScore]);

  const isPaused = engine.status === "paused";
  const isGameOver = engine.status === "gameover";

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-6">
      <GameHUD />

      <motion.div
        className="relative w-full max-w-[min(92vw,520px)]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <GameBoard />

        <AnimatePresence>
          {(isPaused || isGameOver) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/70 backdrop-blur-sm"
            >
              <Panel className="mx-4 w-full max-w-xs text-center">
                {isGameOver ? (
                  <>
                    <h2 className="text-xl font-bold text-[var(--accent)]">
                      Game Over
                    </h2>
                    <p className="mt-2 text-3xl font-black tabular-nums">
                      {engine.score}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      Best: {Math.max(highScore, engine.score)}
                    </p>
                    <div className="mt-6 flex flex-col gap-2">
                      <Button onClick={restartGame}>Play again</Button>
                      <Button variant="secondary" onClick={goToMenu}>
                        Main menu
                      </Button>
                    </div>
                  </>
                ) : (

                  <>
                    <h2 className="text-xl font-bold">Paused</h2>
                    <div className="mt-6 flex flex-col gap-2">
                      <Button onClick={resumeGame}>Resume</Button>
                      <Button variant="secondary" onClick={goToMenu}>
                        Quit
                      </Button>
                    </div>
                  </>
                )}
              </Panel>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex w-full max-w-[min(92vw,520px)] justify-center gap-3">
        <Button
          variant="secondary"
          className="hidden sm:inline-flex"
          onClick={() =>
            engine.status === "playing" ? pauseGame() : resumeGame()
          }
          disabled={isGameOver}
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button variant="ghost" onClick={goToMenu}>
          Menu
        </Button>
      </div>

      <MobileControls />
    </div>
  );
}
