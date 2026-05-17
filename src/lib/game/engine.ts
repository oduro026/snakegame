import {
  INITIAL_SNAKE_LENGTH,
  MIN_TICK_MS,
  OPPOSITE_DIRECTION,
  SPEED_INCREASE_EVERY_FOODS,
  SPEED_INCREASE_MS,
  TICK_MS_BY_DIFFICULTY,
  DIRECTION_DELTA,
} from "@/constants/game";
import { isGameOver, wrapHead } from "@/lib/game/collision";
import { pointsEqual, spawnFood } from "@/lib/game/food";
import type {
  Direction,
  GameConfig,
  GameEngineState,
  GameStatus,
} from "@/types/game";

function createInitialSnake(gridWidth: number, gridHeight: number) {
  const startX = Math.floor(gridWidth / 2);
  const startY = Math.floor(gridHeight / 2);
  const snake = [];

  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({ x: startX - i, y: startY });
  }

  return snake;
}

export function createInitialState(config: GameConfig): GameEngineState {
  const snake = createInitialSnake(config.gridWidth, config.gridHeight);
  const food = spawnFood(snake, config.gridWidth, config.gridHeight);

  return {
    snake,
    direction: "right",
    queuedDirection: "right",
    food,
    score: 0,
    foodsEaten: 0,
    speedLevel: 0,
    status: "idle",
    config,
    elapsedMs: 0,
    startedAt: null,
  };
}

export function setStatus(
  state: GameEngineState,
  status: GameStatus,
): GameEngineState {
  return {
    ...state,
    status,
    startedAt:
      status === "playing" && state.startedAt === null
        ? Date.now()
        : state.startedAt,
  };
}

export function queueDirection(
  state: GameEngineState,
  direction: Direction,
): GameEngineState {
  const active = state.status === "playing" ? state.queuedDirection : state.direction;

  if (OPPOSITE_DIRECTION[direction] === active) {
    return state;
  }

  return { ...state, queuedDirection: direction };
}

export function getTickInterval(state: GameEngineState): number {
  const base = TICK_MS_BY_DIFFICULTY[state.config.difficulty];
  const reduction = state.speedLevel * SPEED_INCREASE_MS;
  return Math.max(MIN_TICK_MS, base - reduction);
}

function advanceSpeedLevel(foodsEaten: number, current: number): number {
  return Math.floor(foodsEaten / SPEED_INCREASE_EVERY_FOODS);
}

export function tick(state: GameEngineState): GameEngineState {
  if (state.status !== "playing") {
    return state;
  }

  const direction = state.queuedDirection;
  const delta = DIRECTION_DELTA[direction];
  const head = state.snake[0];
  let nextHead = { x: head.x + delta.x, y: head.y + delta.y };
  nextHead = wrapHead(nextHead, state.config);

  if (isGameOver(state, nextHead)) {
    return { ...state, direction, status: "gameover" };
  }

  const ateFood = pointsEqual(nextHead, state.food);
  const newSnake = [nextHead, ...state.snake];

  if (!ateFood) {
    newSnake.pop();
  }

  const foodsEaten = ateFood ? state.foodsEaten + 1 : state.foodsEaten;
  const score = ateFood ? state.score + 10 : state.score;
  const food = ateFood
    ? spawnFood(newSnake, state.config.gridWidth, state.config.gridHeight)
    : state.food;

  const speedLevel = advanceSpeedLevel(foodsEaten, state.speedLevel);
  const elapsedMs =
    state.startedAt !== null ? Date.now() - state.startedAt : state.elapsedMs;

  const timedOver =
    state.config.mode === "timed" &&
    state.config.timedDurationMs !== undefined &&
    elapsedMs >= state.config.timedDurationMs;

  if (timedOver) {
    return {
      ...state,
      snake: newSnake,
      direction,
      queuedDirection: direction,
      food,
      score,
      foodsEaten,
      speedLevel,
      elapsedMs,
      status: "gameover",
    };
  }

  if (
    state.config.mode === "classic" &&
    newSnake.length >= state.config.gridWidth * state.config.gridHeight
  ) {
    return {
      ...state,
      snake: newSnake,
      direction,
      queuedDirection: direction,
      food,
      score,
      foodsEaten,
      speedLevel,
      elapsedMs,
      status: "gameover",
    };
  }

  return {
    ...state,
    snake: newSnake,
    direction,
    queuedDirection: direction,
    food,
    score,
    foodsEaten,
    speedLevel,
    elapsedMs,
    status: "playing",
  };
}
