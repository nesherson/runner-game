import { Texture } from "pixi.js";

import {
  ANIMATION_SPEED,
  APP_HEIGHT,
  APP_WIDTH,
  GROUND_HEIGHT,
  OBSTACLE_MAX_SPACING,
  OBSTACLE_MIN_SPACING,
  OBSTACLE_SIZE_SCALE,
  PLAYER_HEIGHT,
  PLAYER_ORIGINAL_Y_POS,
  PLAYER_WIDTH,
} from "../constants";
import { GameStatus, Obstacle, Player } from "../types/types";

type ObstacleData = {
  textures: Texture[];
  width: number;
  height: number;
  animationSpeed: number;
};

const obstacleOneTextures = [
  Texture.from("/assets/obstacles/obstacle-1-1.png"),
  Texture.from("/assets/obstacles/obstacle-1-2.png"),
];
const obstacleTwoTextures = [
  Texture.from("/assets/obstacles/obstacle-2-1.png"),
  Texture.from("/assets/obstacles/obstacle-2-2.png"),
];
const obstacleThreeTextures = [
  Texture.from("/assets/obstacles/obstacle-3-1.png"),
  Texture.from("/assets/obstacles/obstacle-3-2.png"),
];
const playerTextures = [
  Texture.from("/assets/player/player-1.png"),
  Texture.from("/assets/player/player-2.png"),
];

const obstacleSeed: ObstacleData[] = [
  {
    textures: obstacleOneTextures,
    width: 20 * OBSTACLE_SIZE_SCALE,
    height: 23 * OBSTACLE_SIZE_SCALE,
    animationSpeed: ANIMATION_SPEED,
  },
  {
    textures: obstacleTwoTextures,
    width: 18 * OBSTACLE_SIZE_SCALE,
    height: 18 * OBSTACLE_SIZE_SCALE,
    animationSpeed: ANIMATION_SPEED,
  },
  {
    textures: obstacleThreeTextures,
    width: 20 * OBSTACLE_SIZE_SCALE,
    height: 23 * OBSTACLE_SIZE_SCALE,
    animationSpeed: ANIMATION_SPEED,
  },
];

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
    const obstacle = getRandomObstacle();

    obstacle.y = APP_HEIGHT - GROUND_HEIGHT - obstacle.height;
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
  return obstacles.some((o) =>
    o.x < player.x + PLAYER_WIDTH &&
    o.x + o.width > player.x &&
    o.y < player.y + PLAYER_HEIGHT &&
    o.y + o.height > player.y);
}

export function isScoreMilestone(score: number) {
  if (score === 0) return false;

  return score % 100 === 0;
}

export function getRandomObstacle(): Obstacle {
  const data = obstacleSeed[Math.floor(Math.random() * obstacleSeed.length)];

  return {
    x: 0,
    y: 0,
    width: data.width,
    height: data.height,
    animationSpeed: data.animationSpeed,
    textures: data.textures,
  };
}
