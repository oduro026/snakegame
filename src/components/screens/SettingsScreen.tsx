"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { useGameStore } from "@/store/game-store";
import type { Difficulty, GameMode } from "@/types/game";

const difficulties: Difficulty[] = ["easy", "medium", "hard", "insane"];
const modes: GameMode[] = ["classic", "endless", "timed"];

export function SettingsScreen() {
  const settings = useGameStore((s) => s.settings);
  const updateSettings = useGameStore((s) => s.updateSettings);
  const setScreen = useGameStore((s) => s.setScreen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8"
    >
      <h2 className="text-2xl font-bold">Settings</h2>
      <Panel className="w-full max-w-md space-y-6">
        <fieldset>
          <legend className="mb-2 text-xs uppercase tracking-widest text-[var(--muted)]">
            Difficulty
          </legend>
          <motion.div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {difficulties.map((d) => (
              <OptionButton
                key={d}
                active={settings.difficulty === d}
                label={d}
                onClick={() => updateSettings({ difficulty: d })}
              />
            ))}
          </motion.div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs uppercase tracking-widest text-[var(--muted)]">
            Game mode
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {modes.map((m) => (
              <OptionButton
                key={m}
                active={settings.mode === m}
                label={m}
                onClick={() => updateSettings({ mode: m })}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs uppercase tracking-widest text-[var(--muted)]">
            Theme
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {(["cyber", "neon", "minimal"] as const).map((t) => (
              <OptionButton
                key={t}
                active={settings.theme === t}
                label={t}
                onClick={() => updateSettings({ theme: t })}
              />
            ))}
          </div>
        </fieldset>

        <label className="flex items-center justify-between gap-4 text-sm">
          <span>Sound effects</span>
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) =>
              updateSettings({ soundEnabled: e.target.checked })
            }
            className="h-5 w-5 accent-[var(--accent)]"
          />
        </label>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setScreen("menu")}
        >
          Back to menu
        </Button>
      </Panel>
    </motion.div>
  );
}

function OptionButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-xs font-semibold capitalize transition-colors ${
        active
          ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]"
          : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/50"
      }`}
    >
      {label}
    </button>
  );
}
