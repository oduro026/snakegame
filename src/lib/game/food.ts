import type { Point } from "@/types/game";

function pointKey(p: Point): string {
  return `${p.x},${p.y}`;
}

export function spawnFood(
  snake: Point[],
  gridWidth: number,
  gridHeight: number,
): Point {
  const occupied = new Set(snake.map(pointKey));
  const freeCells: Point[] = [];

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) {
        freeCells.push({ x, y });
      }
    }
  }

  if (freeCells.length === 0) {
    return snake[0];
  }

  const index = Math.floor(Math.random() * freeCells.length);
  return freeCells[index];
}

export function pointsEqual(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}
