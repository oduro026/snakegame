import { STORAGE_KEYS } from "@/constants/game";
import type { Difficulty, GameMode, LeaderboardEntry, Settings } from "@/types/game";

const DEFAULT_SETTINGS: Settings = {
  difficulty: "medium",
  mode: "classic",
  theme: "cyber",
  soundEnabled: true,
  musicEnabled: true,
  sfxVolume: 0.8,
  musicVolume: 0.5,
};

export function loadHighScore(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(STORAGE_KEYS.highScore);
  const parsed = raw ? Number.parseInt(raw, 10) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

export function saveHighScore(score: number): number {
  const current = loadHighScore();
  const next = Math.max(current, score);
  localStorage.setItem(STORAGE_KEYS.highScore, String(next));
  return next;
}

export function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.leaderboard);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LeaderboardEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addLeaderboardEntry(entry: LeaderboardEntry): LeaderboardEntry[] {
  const board = loadLeaderboard();
  const next = [...board, entry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(next));
  return next;
}

export function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}
