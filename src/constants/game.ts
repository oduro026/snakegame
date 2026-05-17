import type { Difficulty, Direction, GameConfig } from "@/types/game";

export const GRID_WIDTH = 24;
export const GRID_HEIGHT = 24;
export const INITIAL_SNAKE_LENGTH = 3;

export const TICK_MS_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 160,
  medium: 130,
  hard: 100,
  insane: 75,
};

export const SPEED_INCREASE_EVERY_FOODS = 5;
export const SPEED_INCREASE_MS = 8;
export const MIN_TICK_MS = 50;

export const TIMED_MODE_DURATION_MS = 60_000;

export const OPPOSITE_DIRECTION: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

export const DIRECTION_DELTA: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const DEFAULT_GAME_CONFIG: GameConfig = {
  gridWidth: GRID_WIDTH,
  gridHeight: GRID_HEIGHT,
  difficulty: "medium",
  mode: "classic",
  timedDurationMs: TIMED_MODE_DURATION_MS,
};

export const STORAGE_KEYS = {
  highScore: "snake-high-score",
  leaderboard: "snake-leaderboard",
  settings: "snake-settings",
} as const;
