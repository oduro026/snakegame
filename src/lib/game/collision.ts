import type { GameConfig, GameEngineState, Point } from "@/types/game";
import { pointsEqual } from "@/lib/game/food";

export function hitsWall(head: Point, config: GameConfig): boolean {
  if (config.mode === "endless") {
    return false;
  }

  return (
    head.x < 0 ||
    head.x >= config.gridWidth ||
    head.y < 0 ||
    head.y >= config.gridHeight
  );
}

export function hitsSelf(head: Point, snake: Point[]): boolean {
  return snake.slice(1).some((segment) => pointsEqual(segment, head));
}

export function wrapHead(head: Point, config: GameConfig): Point {
  if (config.mode !== "endless") {
    return head;
  }

  return {
    x: (head.x + config.gridWidth) % config.gridWidth,
    y: (head.y + config.gridHeight) % config.gridHeight,
  };
}

export function isGameOver(state: GameEngineState, head: Point): boolean {
  if (hitsWall(head, state.config)) {
    return true;
  }

  return hitsSelf(head, state.snake);
}
