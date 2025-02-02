import { create } from "zustand";
import { OBSTACLE_MAX_SPACING, OBSTACLE_MIN_SPACING, SCORE_INCREASE_SPEED } from "../constants";
import { GameState, GameStatus } from "../types/types";
import { createInitialState, getRandomObstacle } from "../utils/gameHelpers";

export const useGameStateStore = create<GameState & GameStateStoreAction>((set) => ({
    ...createInitialState(),
    startGame: () => set(state => {
        return {
            status: GameStatus.Playing
        }
    }),
    endGame: () => set(_ => ({
        status: GameStatus.GameOver
    })),
    restartGame: () => set(_ => ({
        ...createInitialState()
    })),
    decreasePlayerYPos: (playerJumpStrength: number, deltaTime: number) => set(state => ({
        player: {
            ...state.player,
            y: state.player.y - playerJumpStrength * deltaTime
        }
    })),
    increasePlayerYPos: (playerFallStrength: number,
        playerOriginalYPos: number,
        deltaTime: number) => set(state => {
            let newPlayerYPos = state.player.y + playerFallStrength * deltaTime!;

            if (newPlayerYPos > playerOriginalYPos) {
                newPlayerYPos = playerOriginalYPos;
            }

            return {
                player: {
                    ...state.player,
                    y: newPlayerYPos
                }
            }
        }),
    playerJump: (animationSpeed: number) => set(state => {
        const isJumping = !state.player.isJumping;

        return {
            player: {
                ...state.player,
                isJumping: isJumping,
                animationSpeed: isJumping ? 0 : animationSpeed
            }
        };
    }),
    increaseScore: () => set(state => ({
        score: state.score + 1 * SCORE_INCREASE_SPEED
    })),
    moveObstacles: (appHeight: number, groundHeight: number, obstacleSpeed: number, deltaTime: number) => set(state => {
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
                o.y = appHeight - groundHeight - obstacle.height;
                o.animationSpeed = obstacle.animationSpeed;
                o.width = obstacle.width;
                o.height = obstacle.height;
            } else {
                o.x -= obstacleSpeed * deltaTime!;
            }
        });

        return {
            obstacles: currentObstacles
        }
    }),
    resetState: () => set(_ => ({
        ...createInitialState()
    })),
    setPlayerStartingPosition: (startPosX: number, startPosY: number) => set(state => ({
        player: {
            ...state.player,
            x: startPosX,
            y: startPosY
        }
    }))
}));


type GameStateStoreAction = {
    startGame: () => void
    endGame: () => void
    restartGame: () => void
    decreasePlayerYPos: (playerJumpStrength: number, deltaTime: number) => void
    increasePlayerYPos: (playerFallStrength: number, playerOriginalYPos: number, deltaTime: number) => void
    playerJump: (animationSpeed: number) => void
    increaseScore: () => void
    moveObstacles: (appHeight: number, groundHeight: number, obstacleSpeed: number, deltaTime: number) => void
    resetState: (playerOriginalYPos: number) => void
    setPlayerStartingPosition: (startPosX: number, startPosY: number) => void
}
