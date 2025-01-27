import { TextStyle } from "pixi.js";
import { Container, Text, useTick } from "@pixi/react";
import { useEventListener } from "@react-hookz/web";

import Ground from "./Ground";
import Player from "./Player";
import Background from "./Background";
import Obstacles from "./Obstacles";
import Score from "./Score";

import {
    APP_WIDTH,
    APP_HEIGHT,
    PLAYER_JUMP_HEIGHT,
    PLAYER_ORIGINAL_Y_POS
} from "../constants";
import { GameAction, GameState, GameStatus } from "../types/types";
import { hasPlayerCollided } from "../utils/obstacleHelpers";

interface Props {
    gameState: GameState,
    dispatch: React.Dispatch<GameAction>
}

function Game({ gameState, dispatch }: Props) {
    useTick(deltaTime => {
        if (gameState.status !== GameStatus.Playing)
            return;

        dispatch({ type: "increase_score" });
        dispatch({ type: "move_obstacles", deltaTime: deltaTime });

        if (hasPlayerCollided(gameState.player, gameState.obstacles)) {
            dispatch({ type: "end_game" });
            return;
        }

        if (gameState.player.isJumping &&
            gameState.player.y > PLAYER_ORIGINAL_Y_POS - PLAYER_JUMP_HEIGHT) {
            dispatch({ type: "decrease_player_y_pos", deltaTime: deltaTime });
        }

        if (gameState.player.y <= PLAYER_ORIGINAL_Y_POS - PLAYER_JUMP_HEIGHT) {
            if (gameState.player.isJumping) {
                dispatch({ type: "player_jump", jumpValue: false });
            }
        }

        if (!gameState.player.isJumping &&
            gameState.player.y < PLAYER_ORIGINAL_Y_POS) {
            dispatch({ type: "increase_player_y_pos", deltaTime: deltaTime });
        }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === " ") {
            if (gameState.status === GameStatus.Initial) {
                dispatch({ type: "start_game" });
                return;
            }

            if (gameState.status === GameStatus.GameOver) {
                dispatch({ type: "restart_game" });
                return;
            }

            if (!gameState.player.isJumping)
                dispatch({ type: "player_jump", jumpValue: true });
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
            {gameState.status !== GameStatus.Initial &&
                <Score score={gameState.score} />
            }
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
            <Obstacles
                obstacles={gameState.obstacles}
                isGamePlaying={gameState.status === GameStatus.Playing} />
            <Ground
                isGamePlaying={gameState.status === GameStatus.Playing} />
        </Container>
    )
}

export default Game;