import { Container, Text, useTick } from "@pixi/react";
import { useEventListener } from "@react-hookz/web";
import { TextStyle } from "pixi.js";
import { useReducer } from "react";

import Background from "./Background";
import Ground from "./Ground";
import Obstacles from "./Obstacles";
import Player from "./Player";
import Score from "./Score";

import {
    APP_HEIGHT,
    APP_WIDTH,
    PLAYER_JUMP_HEIGHT,
    PLAYER_ORIGINAL_Y_POS
} from "../constants";
import { reducer } from "../stores/reducers";
import { GameStatus } from "../types/types";
import { createInitialState, hasPlayerCollided, isScoreMilestone } from "../utils/gameHelpers";
import { playCollisionSound, playJumpSound, playScoreMilestone } from "../utils/soundHelpers";
import StartGameText from "./StartGameText";

function Game() {
    const [gameState, dispatch] = useReducer(reducer, {}, createInitialState);

    useTick(deltaTime => {
        if (gameState.status !== GameStatus.Playing)
            return;

        dispatch({ type: "increase_score" });
        dispatch({ type: "move_obstacles", deltaTime: deltaTime });

        if (isScoreMilestone(gameState.score)) {
            playScoreMilestone();
        }

        if (hasPlayerCollided(gameState.player, gameState.obstacles)) {
            playCollisionSound();
            dispatch({ type: "end_game" });
            return;
        }

        if (gameState.player.isJumping &&
            gameState.player.y > PLAYER_ORIGINAL_Y_POS - PLAYER_JUMP_HEIGHT) {
            dispatch({ type: "decrease_player_y_pos", deltaTime: deltaTime });
        }

        if (gameState.player.isFalling &&
            gameState.player.y < PLAYER_ORIGINAL_Y_POS) {
            dispatch({ type: "increase_player_y_pos", deltaTime: deltaTime });
        }

        if (gameState.player.y <= PLAYER_ORIGINAL_Y_POS - PLAYER_JUMP_HEIGHT &&
            !gameState.player.isFalling) {
            dispatch({ type: "player_fall" });
        }

        if (gameState.player.isFalling &&
            gameState.player.y > PLAYER_ORIGINAL_Y_POS - 10) {
            dispatch({ type: "player_reset_fall" });
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

            if (!gameState.player.isJumping &&
                !gameState.player.isFalling
            ) {
                playJumpSound();
                dispatch({ type: "player_jump", isJumping: true });
            }
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
               <StartGameText />
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