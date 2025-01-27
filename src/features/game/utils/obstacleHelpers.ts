import {
  APP_HEIGHT,
  APP_WIDTH,
  GROUND_HEIGHT,
  OBSTACLE_HEIGHT,
  OBSTACLE_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
} from "../constants";
import { Obstacle, Player } from "../types/types";

export function createObstacles() {
  const obstacles: Obstacle[] = [];
  const min = 150;
  const max = 350;
  let prevPosX = APP_WIDTH;

  for (let i = 0; i < 3; i++) {
    const obstacle: Obstacle = {
      x: 0,
      y: 0,
    };

    obstacle.y = APP_HEIGHT - GROUND_HEIGHT - OBSTACLE_HEIGHT;
    obstacle.x = prevPosX + (Math.random() * (max - min) + min);
    prevPosX = obstacle.x;
    console.log(obstacle.x);

    obstacles.push(obstacle);
  }

  return obstacles;
}

export function hasPlayerCollided(player: Player, obstacles: Obstacle[]) {
  return obstacles.some(
    (o) =>
      o.x < player.x + PLAYER_WIDTH &&
      o.x + OBSTACLE_WIDTH > player.x &&
      o.y < player.y + PLAYER_HEIGHT &&
      o.y + OBSTACLE_HEIGHT > player.y
  );
}
