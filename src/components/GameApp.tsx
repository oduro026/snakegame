"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { GameScreen } from "@/components/screens/GameScreen";
import { LeaderboardScreen } from "@/components/screens/LeaderboardScreen";
import { MainMenu } from "@/components/screens/MainMenu";
import { SettingsScreen } from "@/components/screens/SettingsScreen";
import { SplashScreen } from "@/components/screens/SplashScreen";
import { useGameStore } from "@/store/game-store";

export function GameApp() {
  const screen = useGameStore((s) => s.screen);
  const settings = useGameStore((s) => s.settings);
  const hydrate = useGameStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-1 flex-col"
        >
          {screen === "splash" && <SplashScreen />}
          {screen === "menu" && <MainMenu />}
          {screen === "game" && <GameScreen />}
          {screen === "settings" && <SettingsScreen />}
          {screen === "leaderboard" && <LeaderboardScreen />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
