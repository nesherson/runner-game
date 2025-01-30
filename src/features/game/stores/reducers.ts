import {
  ANIMATION_SPEED,
  APP_HEIGHT,
  GROUND_HEIGHT,
  OBSTACLE_MAX_SPACING,
  OBSTACLE_MIN_SPACING,
  OBSTACLE_SPEED,
  PLAYER_FALL_STRENGTH,
  PLAYER_JUMP_STRENGTH,
  PLAYER_ORIGINAL_Y_POS,
  SCORE_INCREASE
} from "../constants";
import { GameAction, GameState, GameStatus } from "../types/types";
import { createInitialState, getRandomObstacle } from "../utils/gameHelpers";

export function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "start_game":
      return {
        ...state,
        status: GameStatus.Playing,
      };
    case "end_game":
      return {
        ...state,
        status: GameStatus.GameOver,
      };
    case "restart_game":
      return createInitialState();
    case "decrease_player_y_pos":
      return {
        ...state,
        player: {
          ...state.player,
          y: state.player.y - PLAYER_JUMP_STRENGTH * action.deltaTime!,
        },
      };
    case "increase_player_y_pos":
      let newPlayerYPos = state.player.y + PLAYER_FALL_STRENGTH * action.deltaTime!;

      if (newPlayerYPos > PLAYER_ORIGINAL_Y_POS) {
        newPlayerYPos = PLAYER_ORIGINAL_Y_POS;
      }

      return {
        ...state,
        player: {
          ...state.player,
          y: newPlayerYPos,
        },
      };
    case "player_jump":
      const isJumping = !state.player.isJumping;

      return {
        ...state,
        player: {
          ...state.player,
          isJumping: isJumping,
          animationSpeed: isJumping ? 0 : ANIMATION_SPEED,
        },
      };
    case "increase_score":
      return {
        ...state,
        score: (state.score + 1 * SCORE_INCREASE),
      };
    case "move_obstacles": {
      const lastPositionedObstacle = state.obstacles.reduce((a, b) =>
        a.x > b.x ? a : b
      );
      const currentObstacles = [...state.obstacles];

      currentObstacles.forEach((o) => {
        if (o.x < -o.width) {
          const obstacle = getRandomObstacle();

          o.textures = obstacle.textures;
          o.x = lastPositionedObstacle.x +
            (Math.random() * (OBSTACLE_MAX_SPACING - OBSTACLE_MIN_SPACING) + OBSTACLE_MIN_SPACING);
          o.y = APP_HEIGHT - GROUND_HEIGHT - obstacle.height;
          o.animationSpeed = obstacle.animationSpeed;
          o.width = obstacle.width;
          o.height = obstacle.height;
        } else {
          o.x -= OBSTACLE_SPEED * action.deltaTime!;
        }
      });

      return {
        ...state,
        obstacles: currentObstacles,
      };
    }
    default:
      return state;
  }
}
