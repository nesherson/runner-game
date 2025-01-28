import { Texture } from "pixi.js";

import {
  ANIMATION_SPEED,
  APP_HEIGHT,
  APP_WIDTH,
  GROUND_HEIGHT,
  OBSTACLE_HEIGHT,
  OBSTACLE_MAX_SPACING,
  OBSTACLE_MIN_SPACING,
  OBSTACLE_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_ORIGINAL_Y_POS,
  PLAYER_WIDTH,
  X_COLLISION_OFFSET,
  Y_COLLISION_OFFSET,
} from "../constants";
import { GameStatus, Obstacle, Player } from "../types/types";

const enemyZeroTextures = [
  Texture.from("/assets/obstacles/enemy-0-start.png"),
  Texture.from("/assets/obstacles/enemy-0-end.png"),
];
const enemyOneTextures = [
  Texture.from("/assets/obstacles/enemy-1-start.png"),
  Texture.from("/assets/obstacles/enemy-1-end.png"),
];
const playerTextures = [
  Texture.from("/assets/player/player-start.png"),
  Texture.from("/assets/player/player-end.png"),
];

const obstacleTextures = [enemyZeroTextures, enemyOneTextures];

export function createInitialState() {
  return {
    status: GameStatus.Initial,
    score: 0,
    player: {
      x: 30,
      y: PLAYER_ORIGINAL_Y_POS,
      isJumping: false,
      isFalling: false,
      animationSpeed: ANIMATION_SPEED,
      textures: playerTextures,
    },
    obstacles: createObstacles(),
  };
}

export function createObstacles() {
  const obstacles: Obstacle[] = [];
  let prevPosX = APP_WIDTH;

  for (let i = 0; i < 3; i++) {
    const obstacle: Obstacle = {
      x: 0,
      y: 0,
      textures: [],
    };

    obstacle.textures = getRandomObstacleTextures();
    obstacle.y = APP_HEIGHT - GROUND_HEIGHT - OBSTACLE_HEIGHT;
    obstacle.x =
      prevPosX +
      (Math.random() * (OBSTACLE_MAX_SPACING - OBSTACLE_MIN_SPACING) +
        OBSTACLE_MIN_SPACING);
    prevPosX = obstacle.x;

    obstacles.push(obstacle);
  }

  return obstacles;
}

export function hasPlayerCollided(player: Player, obstacles: Obstacle[]) {
  return obstacles.some(
    (o) =>
      o.x < player.x + PLAYER_WIDTH - X_COLLISION_OFFSET &&
      o.x + OBSTACLE_WIDTH - X_COLLISION_OFFSET > player.x &&
      o.y < player.y + PLAYER_HEIGHT - Y_COLLISION_OFFSET &&
      o.y + OBSTACLE_HEIGHT - Y_COLLISION_OFFSET > player.y
  );
}

export function isScoreMilestone(score: number) {
  if (score === 0) return false;

  return score % 100 === 0;
}

export function getRandomObstacleTextures() {
  return obstacleTextures[Math.floor(Math.random() * 2)];
}
