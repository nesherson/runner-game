import {
  APP_WIDTH,
  OBSTACLE_MAX_SPACING,
  OBSTACLE_MIN_SPACING,
  OBSTACLE_WIDTH,
  PLAYER_FALL_STRENGTH,
  PLAYER_JUMP_STRENGTH,
  PLAYER_ORIGINAL_Y_POS,
  SCORE_INCREASE_MULTIPLIER,
} from "../constants";
import { GameState, GameAction, GameStatus } from "../types/types";
import { createObstacles } from "../utils/gameHelpers";

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
      return {
        status: GameStatus.Playing,
        score: 0,
        player: {
          x: 30,
          y: PLAYER_ORIGINAL_Y_POS,
          isJumping: false,
          isFalling: false,
        },
        obstacles: createObstacles(),
      };
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
      return {
        ...state,
        player: {
          ...state.player,
          isJumping: true,
          isFalling: false,
        },
      };
    case "player_fall":
      return {
        ...state,
        player: {
          ...state.player,
          isJumping: false,
          isFalling: true,
        },
      };
    case "player_reset_fall":
      return {
        ...state,
        player: {
          ...state.player,
          isFalling: false,
        },
      };
    case "increase_score":
      return {
        ...state,
        score: state.score + 1 * SCORE_INCREASE_MULTIPLIER,
      };
    case "move_obstacles": {
      return {
        ...state,
        obstacles: state.obstacles.map((o) => {
          let prevPosX = APP_WIDTH;

          if (o.x < -OBSTACLE_WIDTH) {
            o.x = prevPosX + (Math.random() * (OBSTACLE_MAX_SPACING - OBSTACLE_MIN_SPACING) + OBSTACLE_MIN_SPACING);
            prevPosX = o.x;
          } else {
            o.x -= 2.3 * action.deltaTime!;
          }

          return o;
        }),
      };
    }
    default:
      return state;
  }
}
