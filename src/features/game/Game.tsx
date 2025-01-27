import { useReducer, useState } from "react";
import { TextStyle } from "pixi.js";
import { Container, Text, useTick } from "@pixi/react";
import { useEventListener } from "@react-hookz/web";

import Ground from "./Ground";
import Player from "./Player";
import Background from "./Background";
import Obstacle from "./Obstacle";
import Score from "./Score";

import {
    APP_WIDTH,
    APP_HEIGHT,
    GROUND_HEIGHT,
    PLAYER_HEIGHT,
    OBSTACLE_HEIGHT,
    PLAYER_WIDTH,
    OBSTACLE_WIDTH,
    PLAYER_JUMP_HEIGHT,
    PLAYER_JUMP_STRENGTH,
    PLAYER_FALL_STRENGTH,
    PLAYER_ORIGINAL_Y_POS,
    SCORE_INCREASE_MULTIPLIER
} from "./constants";
import { GameAction, GameState, GameStatus } from "./types/types";

function reducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case "start_game":
            return {
                ...state,
                status: GameStatus.Playing
            };
        case "end_game":
            return {
                ...state,
                status: GameStatus.GameOver
            };
        case "restart_game":
            return {
                status: GameStatus.Playing,
                score: 0,
                player: {
                    x: 30,
                    y: PLAYER_ORIGINAL_Y_POS,
                    isJumping: false
                }
            };
        case "decrease_player_y_pos":
            return {
                ...state,
                player: {
                    ...state.player,
                    y: state.player.y - PLAYER_JUMP_STRENGTH * action.deltaTime!
                }
            };
        case "increase_player_y_pos":
            return {
                ...state,
                player: {
                    ...state.player,
                    y: state.player.y + PLAYER_FALL_STRENGTH * action.deltaTime!
                }
            };
        case "player_jump":
            return {
                ...state,
                player: {
                    ...state.player,
                    isJumping: action.jumpValue!
                }
            };
        case "increase_score":
            return {
                ...state,
                score: state.score + 1 * SCORE_INCREASE_MULTIPLIER
            };
        default:
            return state;
    }
}

function Game() {
    const initialGameState: GameState = {
        status: GameStatus.Initial,
        score: 0,
        player: {
            x: 30,
            y: PLAYER_ORIGINAL_Y_POS,
            isJumping: false
        }
    };

    const [enemyXPos, setEnemyXPos] = useState(APP_WIDTH);
    const [enemyYPos, setEnemyYPos] = useState(APP_HEIGHT - GROUND_HEIGHT - OBSTACLE_HEIGHT + 4);
    const [gameState, disptach] = useReducer(reducer, initialGameState);

    useTick(deltaTime => {
        if (gameState.status !== GameStatus.Playing)
            return;

        disptach({ type: "increase_score" });

        if (enemyXPos < gameState.player.x + PLAYER_WIDTH &&
            enemyXPos + OBSTACLE_WIDTH > gameState.player.x &&
            enemyYPos < gameState.player.y + PLAYER_HEIGHT &&
            enemyYPos + OBSTACLE_HEIGHT > gameState.player.y
        ) {
            disptach({ type: "end_game" });
            return;
        }

        if (enemyXPos <= -OBSTACLE_WIDTH) {
            setEnemyXPos(APP_WIDTH);
        }
        else {
            setEnemyXPos(prev => prev - 2.3 * deltaTime);
        }

        if (gameState.player.isJumping &&
            gameState.player.y > PLAYER_ORIGINAL_Y_POS - PLAYER_JUMP_HEIGHT) {
            disptach({ type: "decrease_player_y_pos", deltaTime: deltaTime });
        }

        if (gameState.player.y <= PLAYER_ORIGINAL_Y_POS - PLAYER_JUMP_HEIGHT) {
            if (gameState.player.isJumping) {
                disptach({ type: "player_jump", jumpValue: false });
            }
        }

        if (!gameState.player.isJumping &&
            gameState.player.y < PLAYER_ORIGINAL_Y_POS) {
            disptach({ type: "increase_player_y_pos", deltaTime: deltaTime });
        }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === " ") {
            if (gameState.status === GameStatus.Initial) {
                disptach({ type: "start_game" });
                return;
            }

            if (gameState.status === GameStatus.GameOver) {
                disptach({ type: "restart_game" });
                return;
            }

            if (!gameState.player.isJumping)
                disptach({ type: "player_jump", jumpValue: true });
        }
    }

    useEventListener(window,
        "keydown",
        handleKeyDown,
        {
            passive: true
        }
    );

    return (
        <Container>
            <Background
                isGamePlaying={gameState.status === GameStatus.Playing} />
            <Score score={gameState.score} />
            {gameState.status === GameStatus.Initial &&
                <>
                    <Text
                        text="Start game"
                        anchor={0.5}
                        x={APP_WIDTH / 2}
                        y={APP_HEIGHT / 2}
                        style={new TextStyle({
                            fontSize: 50
                        })}
                    />
                    <Text
                        text="Press spacebar to start"
                        anchor={0.5}
                        x={APP_WIDTH / 2}
                        y={APP_HEIGHT / 2 + 40}
                        style={new TextStyle({
                            fontSize: 15
                        })}
                    />
                </>
            }
            {gameState.status === GameStatus.GameOver &&
                <>
                    <Text
                        text="Game over"
                        anchor={0.5}
                        x={APP_WIDTH / 2}
                        y={APP_HEIGHT / 2}
                        style={new TextStyle({
                            fontSize: 50
                        })}
                    />
                    <Text
                        text="Press spacebar to restart"
                        anchor={0.5}
                        x={APP_WIDTH / 2}
                        y={APP_HEIGHT / 2 + 40}
                        style={new TextStyle({
                            fontSize: 15
                        })}
                    />
                </>
            }
            <Player
                xPos={gameState.player.x}
                yPos={gameState.player.y}
                isGamePlaying={gameState.status === GameStatus.Playing} />
            <Obstacle
                xPos={enemyXPos}
                yPos={enemyYPos}
                isGamePlaying={gameState.status === GameStatus.Playing} />
            <Ground
                isGamePlaying={gameState.status === GameStatus.Playing} />
        </Container>
    );
}

export default Game;