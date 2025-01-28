import {
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
} from "../constants";
import { GameStatus, Obstacle, Player } from "../types/types";

export function createInitialState() {
    return {
        status: GameStatus.Initial,
        score: 0,
        player: {
            x: 30,
            y: PLAYER_ORIGINAL_Y_POS,
            isJumping: false,
            isFalling: false
        },
        obstacles: createObstacles()
    }
}

export function createObstacles() {
  const obstacles: Obstacle[] = [];
  let prevPosX = APP_WIDTH;

  for (let i = 0; i < 3; i++) {
    const obstacle: Obstacle = {
      x: 0,
      y: 0,
    };

    obstacle.y = APP_HEIGHT - GROUND_HEIGHT - OBSTACLE_HEIGHT;
    obstacle.x = prevPosX + (Math.random() * (OBSTACLE_MAX_SPACING - OBSTACLE_MIN_SPACING) + OBSTACLE_MIN_SPACING);
    prevPosX = obstacle.x;

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

export function isScoreMilestone(score: number) {
  if (score === 0)
    return false;

  return score % 100 === 0;
}
