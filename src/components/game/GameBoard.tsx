"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/game-store";

export function GameBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useGameStore((s) => s.engine);
  const settings = useGameStore((s) => s.settings);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = canvas.clientWidth;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const { gridWidth, gridHeight } = engine.config;
    const cellSize = size / gridWidth;
    const boardHeight = cellSize * gridHeight;
    const { snake, food } = engine;

    ctx.clearRect(0, 0, size, size);

    ctx.strokeStyle = "rgba(0, 255, 200, 0.06)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridWidth; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, boardHeight);
      ctx.stroke();
    }
    for (let i = 0; i <= gridHeight; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(size, i * cellSize);
      ctx.stroke();
    }

    // Food glow
    const foodX = food.x * cellSize + cellSize / 2;
    const foodY = food.y * cellSize + cellSize / 2;
    const foodGradient = ctx.createRadialGradient(
      foodX,
      foodY,
      0,
      foodX,
      foodY,
      cellSize,
    );
    foodGradient.addColorStop(0, "rgba(255, 80, 120, 0.9)");
    foodGradient.addColorStop(1, "rgba(255, 80, 120, 0)");
    ctx.fillStyle = foodGradient;
    ctx.beginPath();
    ctx.arc(foodX, foodY, cellSize * 0.55, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ff5078";
    ctx.beginPath();
    ctx.arc(foodX, foodY, cellSize * 0.32, 0, Math.PI * 2);
    ctx.fill();

    // Snake
    snake.forEach((segment, index) => {
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      const padding = index === 0 ? 1 : 2;
      const alpha = 1 - index / (snake.length + 4);

      if (index === 0) {
        ctx.fillStyle = "#00ffc8";
        ctx.shadowColor = "#00ffc8";
        ctx.shadowBlur = 12;
      } else {
        ctx.fillStyle = `rgba(0, 255, 200, ${Math.max(0.35, alpha)})`;
        ctx.shadowBlur = 0;
      }

      ctx.fillRect(
        x + padding,
        y + padding,
        cellSize - padding * 2,
        cellSize - padding * 2,
      );
      ctx.shadowBlur = 0;
    });

    // Timed mode overlay
    if (settings.mode === "timed" && engine.config.timedDurationMs) {
      const remaining = Math.max(
        0,
        engine.config.timedDurationMs - engine.elapsedMs,
      );
      const seconds = Math.ceil(remaining / 1000);
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = "bold 14px var(--font-geist-mono, monospace)";
      ctx.textAlign = "right";
      ctx.fillText(`${seconds}s`, size - 8, 20);
    }
  }, [engine, settings.mode]);

  return (
    <canvas
      ref={canvasRef}
      className="aspect-square w-full max-w-[min(92vw,520px)] rounded-xl border border-[var(--border)] bg-[#050810] shadow-[inset_0_0_60px_rgba(0,255,200,0.05)]"
      aria-label="Snake game board"
    />
  );
}
