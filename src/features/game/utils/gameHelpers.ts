import { useGameSettingsStore } from "../stores";
import {
	obstacleOneTextures,
	obstacleThreeTextures,
	obstacleTwoTextures,
} from "../textures/textures";
import type { Obstacle, ObstacleData, Player } from "../types/types";

const obstacleData: ObstacleData[] = [
	{
		textures: obstacleOneTextures,
		width: 20,
		height: 23,
	},
	{
		textures: obstacleTwoTextures,
		width: 18,
		height: 18,
	},
	{
		textures: obstacleThreeTextures,
		width: 20,
		height: 23,
	},
];

export function createObstacles() {
	const appWidth = useGameSettingsStore.getState().appWidth;
	const appHeight = useGameSettingsStore.getState().appHeight;
	const groundHeight = useGameSettingsStore.getState().groundHeight;
	const obstacleCount = useGameSettingsStore.getState().obstacleCount;
	const obstacleMinSpacing = useGameSettingsStore.getState().obstacleMinSpacing;
	const obstacleMaxSpacing = useGameSettingsStore.getState().obstacleMaxSpacing;
	const sizeScale = useGameSettingsStore.getState().sizeScale;

	const obstacles: Obstacle[] = [];

	let prevPosX = appWidth;

	for (let i = 0; i < obstacleCount; i++) {
		const temp = obstacleData[Math.floor(Math.random() * obstacleData.length)];

		const obstacleHeight = temp.height * sizeScale;

		const obstacle: Obstacle = {
			y: appHeight - groundHeight - obstacleHeight,
			x:
				prevPosX +
				(Math.random() * (obstacleMaxSpacing - obstacleMinSpacing) +
					obstacleMinSpacing),
			width: temp.width * sizeScale,
			height: obstacleHeight,
			textures: temp.textures,
			animationSpeed: 0.1,
		};

		prevPosX = obstacle.x;
		obstacles.push(obstacle);
	}

	return obstacles;
}

export function hasPlayerCollided(player: Player, obstacles: Obstacle[]) {
	const yCollisionOffset = useGameSettingsStore.getState().yCollisionOffset;
	const xCollisionOffset = useGameSettingsStore.getState().xCollisionOffset;

	return obstacles.some(
		(o) =>
			o.x < player.x + player.width - xCollisionOffset &&
			o.x + o.width > player.x &&
			o.y < player.y + player.height - yCollisionOffset &&
			o.y + o.height > player.y,
	);
}

export function isScoreMilestone(score: number) {
	if (score === 0) return false;

	return Math.round(score % 100) === 100;
}

export function getRandomObstacleData(): ObstacleData {
	const data = obstacleData[Math.floor(Math.random() * obstacleData.length)];

	return {
		width: data.width,
		height: data.height,
		textures: data.textures,
	};
}
