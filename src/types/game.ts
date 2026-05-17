export type Direction = "up" | "down" | "left" | "right";

export type GameStatus =
  | "idle"
  | "starting"
  | "playing"
  | "paused"
  | "gameover";

export type Difficulty = "easy" | "medium" | "hard" | "insane";

export type GameMode = "classic" | "endless" | "timed";

export type AppScreen = "splash" | "menu" | "game" | "settings" | "leaderboard";

export interface Point {
  x: number;
  y: number;
}

export interface GameConfig {
  gridWidth: number;
  gridHeight: number;
  difficulty: Difficulty;
  mode: GameMode;
  timedDurationMs?: number;
}

export interface GameEngineState {
  snake: Point[];
  direction: Direction;
  queuedDirection: Direction;
  food: Point;
  score: number;
  foodsEaten: number;
  speedLevel: number;
  status: GameStatus;
  config: GameConfig;
  elapsedMs: number;
  startedAt: number | null;
}

export interface LeaderboardEntry {
  score: number;
  mode: GameMode;
  difficulty: Difficulty;
  date: string;
}

export interface Settings {
  difficulty: Difficulty;
  mode: GameMode;
  theme: "cyber" | "neon" | "minimal";
  soundEnabled: boolean;
  musicEnabled: boolean;
  sfxVolume: number;
  musicVolume: number;
}
