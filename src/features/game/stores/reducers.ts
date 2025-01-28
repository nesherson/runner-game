import {
  ANIMATION_SPEED,
  OBSTACLE_MAX_SPACING,
  OBSTACLE_MIN_SPACING,
  OBSTACLE_SPEED_MULTIPLIER,
  OBSTACLE_WIDTH,
  PLAYER_FALL_STRENGTH,
  PLAYER_JUMP_STRENGTH,
  SCORE_INCREASE_MULTIPLIER,
} from "../constants";
import { GameAction, GameState, GameStatus } from "../types/types";
import { createInitialState } from "../utils/gameHelpers";

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
      return {
        ...state,
        player: {
          ...state.player,
          y: state.player.y + PLAYER_FALL_STRENGTH * action.deltaTime!,
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
        score: state.score + 1 * SCORE_INCREASE_MULTIPLIER,
      };
    case "move_obstacles": {
      const lastPositionedObstacle = state.obstacles.reduce((a, b) =>
        a.x > b.x ? a : b
      );

      return {
        ...state,
        obstacles: state.obstacles.map((o) => {
          if (o.x < -OBSTACLE_WIDTH) {
            o.x =
              lastPositionedObstacle.x +
              (Math.random() * (OBSTACLE_MAX_SPACING - OBSTACLE_MIN_SPACING) +
                OBSTACLE_MIN_SPACING);
          } else {
            o.x -= OBSTACLE_SPEED_MULTIPLIER * action.deltaTime!;
          }

          return o;
        }),
      };
    }
    default:
      return state;
  }
}
