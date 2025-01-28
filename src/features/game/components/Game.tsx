import { Container, useApp, useTick, Text } from "@pixi/react";
import { useEventListener } from "@react-hookz/web";
import { useReducer } from "react";

import Background from "./Background";
import Ground from "./Ground";
import Obstacles from "./Obstacles";
import Player from "./Player";
import Score from "./Score";

import {
    PLAYER_JUMP_HEIGHT,
    PLAYER_ORIGINAL_Y_POS
} from "../constants";
import { reducer } from "../stores/reducers";
import { GameStatus } from "../types/types";
import { createInitialState, hasPlayerCollided, isScoreMilestone } from "../utils/gameHelpers";
import { playCollisionSound, playJumpSound, playScoreMilestone } from "../utils/soundHelpers";
import GameOverText from "./GameOverText";
import StartGameText from "./StartGameText";
import { TextStyle } from "pixi.js";

function Game() {
    const [gameState, dispatch] = useReducer(reducer, {}, createInitialState);
    const app = useApp();

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

        if (gameState.player.isJumping) {
            if (gameState.player.y > PLAYER_ORIGINAL_Y_POS - PLAYER_JUMP_HEIGHT) {
                dispatch({ type: "decrease_player_y_pos", deltaTime: deltaTime });
            }
            else {
                dispatch({ type: "player_jump" });
            }
        }
        else {
            if (gameState.player.y < PLAYER_ORIGINAL_Y_POS) {
                dispatch({ type: "increase_player_y_pos", deltaTime: deltaTime });
            }
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

            if (gameState.player.y >= PLAYER_ORIGINAL_Y_POS) {
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
            {process.env.NODE_ENV === "development" &&
                <Text
                    text={Math.trunc(app.ticker.FPS).toString()}
                    anchor={0.5}
                    x={15}
                    y={15}
                    style={new TextStyle({
                        fontSize: 10
                    })}
                />
            }
            {gameState.status !== GameStatus.Initial &&
                <Score score={gameState.score} />
            }
            {gameState.status === GameStatus.Initial &&
                <StartGameText />
            }
            {gameState.status === GameStatus.GameOver &&
                <GameOverText />
            }
            <Player
                player={gameState.player}
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