import { create } from "zustand";
import { playerTextures } from "../textures/textures";
import {
	type GameState,
	type GameStateStoreAction,
	GameStatus,
} from "../types/types";
import { createObstacles, getRandomObstacleData } from "../utils/gameHelpers";
import { useGameSettingsStore } from "./gameSettingsStore";

export const useGameStateStore = create<GameState & GameStateStoreAction>(
	(set) => ({
		...createInitialGameState(),
		startGame: () =>
			set((_) => {
				return {
					status: GameStatus.Playing,
				};
			}),
		endGame: () =>
			set((_) => ({
				status: GameStatus.GameOver,
			})),
		restartGame: () =>
			set((_) => ({
				...createInitialGameState(),
			})),
		decreasePlayerYPos: (deltaTime: number) =>
			set((state) => {
				if (!state.player.isJumping) return state;

                const defaultAnimationSpeed =
					useGameSettingsStore.getState().defaultAnimationSpeed;
				const jumpHeight =
					(-state.player.gravity / 2) * state.player.time ** 2 +
					state.player.power * state.player.time;

				if (jumpHeight < 0) {
					return {
						player: {
							...state.player,
							y: state.player.startPosY,
							isJumping: false,
							time: 0,
                            animationSpeed: defaultAnimationSpeed
						},
					};
				}

				return {
					player: {
						...state.player,
						y: state.player.startPosY + jumpHeight * state.player.jumpDirection,
						time: state.player.time + deltaTime,
					},
				};
			}),
		playerJump: () =>
			set((state) => {
				return {
					player: {
						...state.player,
						isJumping: true,
						animationSpeed: 0,
					},
				};
			}),
		increaseScore: () =>
			set((state) => {
				const scoreIncreaseSpeed =
					useGameSettingsStore.getState().scoreIncreaseSpeed;

				return {
					score: state.score + 1 * scoreIncreaseSpeed,
				};
			}),
		moveObstacles: (deltaTime: number) =>
			set((state) => {
				const obstacleMinSpacing =
					useGameSettingsStore.getState().obstacleMinSpacing;
				const obstacleMaxSpacing =
					useGameSettingsStore.getState().obstacleMaxSpacing;
				const appHeight = useGameSettingsStore.getState().appHeight;
				const groundHeight = useGameSettingsStore.getState().groundHeight;
				const obstacleSpeed = useGameSettingsStore.getState().obstacleSpeed;
				const sizeScale = useGameSettingsStore.getState().sizeScale;
				const lastPositionedObstacle = state.obstacles.reduce((a, b) =>
					a.x > b.x ? a : b,
				);
				const currentObstacles = [...state.obstacles];

				for (const obstacle of currentObstacles) {
					if (obstacle.x < -obstacle.width) {
						const randomObstacleData = getRandomObstacleData();

						obstacle.textures = randomObstacleData.textures;
						obstacle.x =
							lastPositionedObstacle.x +
							(Math.random() * (obstacleMaxSpacing - obstacleMinSpacing) +
								obstacleMinSpacing);
						obstacle.y =
							appHeight - groundHeight - randomObstacleData.height * sizeScale;
						obstacle.width = randomObstacleData.width * sizeScale;
						obstacle.height = randomObstacleData.height * sizeScale;
					} else {
						obstacle.x -= obstacleSpeed * deltaTime;
					}
				}

				return {
					obstacles: currentObstacles,
				};
			}),
		resetState: () =>
			set((_) => ({
				...createInitialGameState(),
			})),
	}),
);

export function createInitialGameState(): GameState {
	const sizeScale = useGameSettingsStore.getState().sizeScale;
	const appWidth = useGameSettingsStore.getState().appWidth;
	const appHeight = useGameSettingsStore.getState().appHeight;
	const groundHeight = useGameSettingsStore.getState().groundHeight;
	const playerHeight = 23 * sizeScale;
	const playerWidth = 20 * sizeScale;
	const playerStartPosX = appWidth * 0.1;
	const playerStartPosY = appHeight - groundHeight - playerHeight;
	const playerJumpHeight = 70 * sizeScale;
	const playerJumpStrength = 5.4;
	const playerFallStrength = 5.55;

	return {
		status: GameStatus.Initial,
		score: 0,
		player: {
			x: playerStartPosX,
			y: playerStartPosY,
			isJumping: false,
			animationSpeed: 0.1,
			textures: playerTextures,
			width: playerWidth,
			height: playerHeight,
			startPosY: playerStartPosY,
			jumpHeight: playerJumpHeight,
			jumpStrength: playerJumpStrength,
			fallStrength: playerFallStrength,
			jumpDirection: -1,
			gravity: 1,
			power: 18,
			time: 0,
		},
		obstacles: createObstacles(),
	};
}
