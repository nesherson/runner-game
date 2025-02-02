import { Container, Text, useTick } from "@pixi/react";
import { useEventListener, useWindowSize } from "@react-hookz/web";
import { useEffect } from "react";

import Background from "./Background";
import Ground from "./Ground";

import { Application, TextStyle } from "pixi.js";
import {
    ANIMATION_SPEED,
    OBSTACLE_SPEED,
    PLAYER_FALL_STRENGTH,
    PLAYER_JUMP_HEIGHT,
    PLAYER_JUMP_STRENGTH,
    PLAYER_ORIGINAL_Y_POS
} from "../constants";
import { useGameSettingsStore, useGameStateStore } from "../stores";
import { SizeScalingOption } from "../stores/gameSettingsStore";
import { GameStatus } from "../types/types";
import { hasPlayerCollided, isScoreMilestone } from "../utils/gameHelpers";
import { playCollisionSound, playJumpSound, playScoreMilestone } from "../utils/soundHelpers";
import Player from "./Player";
import Score from "./Score";
import GameOverText from "./GameOverText";
import GameStartText from "./GameStartText";
import Obstacles from "./Obstacles";

function Game({ app }: { app: Application }) {
    const { width: windowWidth, height: windowHeight } = useWindowSize();

    const playerStartPosY = useGameSettingsStore((state) => state.playerStartPosY);
    const playerStartPosX = useGameSettingsStore((state) => state.playerStartPosX);
    const appHeight = useGameSettingsStore((state) => state.appHeight);
    const appWidth = useGameSettingsStore((state) => state.appWidth);
    const backgroundSpeed = useGameSettingsStore((state) => state.backgroundSpeed);
    const groundHeight = useGameSettingsStore((state) => state.groundHeight);
    const groundSpeed = useGameSettingsStore((state) => state.groundSpeed);
    const sizeScale = useGameSettingsStore((state) => state.sizeScale);
    const playerWidth = useGameSettingsStore((state) => state.playerWidth);
    const playerHeight = useGameSettingsStore((state) => state.playerHeight);
    const gameStatus = useGameStateStore((state) => state.status);
    const score = useGameStateStore((state) => state.score);
    const player = useGameStateStore((state) => state.player);
    const obstacles = useGameStateStore((state) => state.obstacles);

    const resetSettings = useGameSettingsStore(state => state.resetSettings);
    const updateScaling = useGameSettingsStore(state => state.updateScaling);
    const resetState = useGameStateStore(state => state.resetState);
    const increaseScore = useGameStateStore(state => state.increaseScore);
    const moveObstacles = useGameStateStore(state => state.moveObstacles);
    const playerJump = useGameStateStore(state => state.playerJump);
    const startGame = useGameStateStore(state => state.startGame);
    const restartGame = useGameStateStore(state => state.restartGame);
    const setPlayerStartingPosition = useGameStateStore(state => state.setPlayerStartingPosition);
    const endGame = useGameStateStore(state => state.endGame);
    const decreasePlayerYPos = useGameStateStore(state => state.decreasePlayerYPos);
    const increasePlayerYPos = useGameStateStore(state => state.increasePlayerYPos);

    useEffect(() => {
        setPlayerStartingPosition(playerStartPosX, playerStartPosY);
    }, []);

    useEffect(() => {
        if (windowHeight > windowWidth) {
            updateScaling(SizeScalingOption.HeightDividedByWidth);
        }

        if (windowWidth <= 800) {
            app.renderer.resize(windowWidth, appHeight);
            resetSettings(windowWidth, appHeight);
            resetState(playerStartPosY);
        }
    }, [windowWidth]);

    useTick(deltaTime => {
        // console.log(gameStatus);
        if (gameStatus !== GameStatus.Playing)
            return;

        if (isScoreMilestone(score)) {
            playScoreMilestone();
        }

        if (hasPlayerCollided(player, obstacles)) {
            playCollisionSound();
            endGame();
            return;
        }

        if (player.isJumping) {
            if (player.y > PLAYER_ORIGINAL_Y_POS - PLAYER_JUMP_HEIGHT) {
                decreasePlayerYPos(PLAYER_JUMP_STRENGTH, deltaTime);
            }
            else {
                playerJump(ANIMATION_SPEED);
            }
        }
        else {
            if (player.y < PLAYER_ORIGINAL_Y_POS) {
                increasePlayerYPos(PLAYER_FALL_STRENGTH, playerStartPosY, deltaTime);
            }
        }

        increaseScore();
        moveObstacles(appHeight, groundHeight, OBSTACLE_SPEED, deltaTime);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === " ") {
            if (gameStatus === GameStatus.Initial) {
                startGame();
                return;
            }

            if (gameStatus === GameStatus.GameOver) {
                restartGame();
                return;
            }
            console.log("trigger");

            if (player.y >= playerStartPosY) {
                playJumpSound();
                playerJump(ANIMATION_SPEED);
            }
        }
    }

    const handleMouseDown = () => {
        if (gameStatus === GameStatus.Initial) {
            startGame();
            return;
        }

        if (gameStatus === GameStatus.GameOver) {
            restartGame();
            return;
        }

        if (player.y >= PLAYER_ORIGINAL_Y_POS) {
            playJumpSound();
            playerJump(ANIMATION_SPEED);
        }
    }

    useEventListener(window,
        "keydown",
        handleKeyDown,
        {
            passive: true
        }
    );

    useEventListener(window,
        "mousedown",
        handleMouseDown,
        {
            passive: true
        }
    );

    return (
        <Container>
            <Background
                appWidth={appWidth}
                appHeight={appHeight}
                backgroundSpeed={backgroundSpeed}
                isGamePlaying={gameStatus === GameStatus.Playing} />
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
            {gameStatus !== GameStatus.Initial &&
                <Score score={score} />
            }
            {gameStatus === GameStatus.Initial &&
                <GameStartText appWidth={appWidth} appHeight={appHeight} sizeScale={sizeScale} />
            }
            {gameStatus === GameStatus.GameOver &&
                <GameOverText appWidth={appWidth} appHeight={appHeight} sizeScale={sizeScale} />
            }
            <Player
                playerWidth={playerWidth}
                playerHeight={playerHeight}
                player={player}
                isGamePlaying={gameStatus === GameStatus.Playing} />
            <Obstacles
                obstacles={obstacles}
                isGamePlaying={gameStatus === GameStatus.Playing} />
            <Ground
                appWidth={appWidth}
                appHeight={appHeight}
                groundHeight={groundHeight}
                groundSpeed={groundSpeed}
                sizeScale={sizeScale}
                isGamePlaying={gameStatus === GameStatus.Playing} />
        </Container>
    )
}

export default Game;