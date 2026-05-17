"use client";

import { create } from "zustand";
import { DEFAULT_GAME_CONFIG, TIMED_MODE_DURATION_MS } from "@/constants/game";
import {
  createInitialState,
  queueDirection,
  setStatus,
  tick,
} from "@/lib/game/engine";
import {
  addLeaderboardEntry,
  loadHighScore,
  loadLeaderboard,
  loadSettings,
  saveHighScore,
  saveSettings,
} from "@/lib/storage/scores";
import type {
  AppScreen,
  Direction,
  GameEngineState,
  LeaderboardEntry,
  Settings,
} from "@/types/game";

interface GameStore {
  screen: AppScreen;
  engine: GameEngineState;
  highScore: number;
  leaderboard: LeaderboardEntry[];
  settings: Settings;
  splashDone: boolean;

  setScreen: (screen: AppScreen) => void;
  completeSplash: () => void;
  hydrate: () => void;
  updateSettings: (partial: Partial<Settings>) => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  goToMenu: () => void;
  setDirection: (direction: Direction) => void;
  advanceTick: () => void;
  finalizeScore: () => void;
}

function buildConfig(settings: Settings) {
  return {
    ...DEFAULT_GAME_CONFIG,
    difficulty: settings.difficulty,
    mode: settings.mode,
    timedDurationMs:
      settings.mode === "timed" ? TIMED_MODE_DURATION_MS : undefined,
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  screen: "splash",
  engine: createInitialState(buildConfig(loadSettings())),
  highScore: 0,
  leaderboard: [],
  settings: loadSettings(),
  splashDone: false,

  setScreen: (screen) => set({ screen }),

  completeSplash: () => {
    set({ splashDone: true, screen: "menu" });
  },

  hydrate: () => {
    const settings = loadSettings();
    set({
      settings,
      highScore: loadHighScore(),
      leaderboard: loadLeaderboard(),
      engine: createInitialState(buildConfig(settings)),
    });
  },

  updateSettings: (partial) => {
    const settings = { ...get().settings, ...partial };
    saveSettings(settings);
    set({
      settings,
      engine: createInitialState(buildConfig(settings)),
    });
  },

  startGame: () => {
    const { settings } = get();
    let engine = createInitialState(buildConfig(settings));
    engine = setStatus(engine, "starting");
    engine = setStatus(engine, "playing");
    set({ engine, screen: "game" });
  },

  pauseGame: () => {
    const { engine } = get();
    if (engine.status !== "playing") return;
    set({ engine: setStatus(engine, "paused") });
  },

  resumeGame: () => {
    const { engine } = get();
    if (engine.status !== "paused") return;
    set({ engine: setStatus(engine, "playing") });
  },

  restartGame: () => {
    const { settings } = get();
    let engine = createInitialState(buildConfig(settings));
    engine = setStatus(engine, "playing");
    set({ engine });
  },

  goToMenu: () => {
    const { settings } = get();
    set({
      screen: "menu",
      engine: createInitialState(buildConfig(settings)),
    });
  },

  setDirection: (direction) => {
    const { engine } = get();
    if (engine.status !== "playing" && engine.status !== "starting") return;
    set({ engine: queueDirection(engine, direction) });
  },

  advanceTick: () => {
    const { engine } = get();
    if (engine.status !== "playing") return;
    const next = tick(engine);
    set({ engine: next });
  },

  finalizeScore: () => {
    const { engine, settings } = get();
    if (engine.status !== "gameover") return;

    const highScore = saveHighScore(engine.score);
    const entry = {
      score: engine.score,
      mode: settings.mode,
      difficulty: settings.difficulty,
      date: new Date().toISOString(),
    };
    const leaderboard = addLeaderboardEntry(entry);
    set({ highScore, leaderboard });
  },
}));
