import { useApplication, useExtend, useTick } from "@pixi/react";
import { useEventListener, useWindowSize } from "@react-hookz/web";
import { useEffect } from "react";
import { Container, Text, TextStyle } from "pixi.js";

import { useGameSettingsStore, useGameStateStore } from "../stores";
import { SizeScalingOption } from "../types/types";
import { GameStatus } from "../types/types";
import { hasPlayerCollided, isScoreMilestone } from "../utils/gameHelpers";
import {
	playCollisionSound,
	playJumpSound,
	playScoreMilestone,
} from "../utils/soundHelpers";

import Background from "./Background";
import Ground from "./Ground";
import Player from "./player/Player";
import Score from "./Score";
import GameOverText from "./GameOverText";
import GameStartText from "./GameStartText";
import Obstacles from "./Obstacles";

function Game() {
	useExtend({ Container, Text });
	const { app } = useApplication();
	const { width: windowWidth, height: windowHeight } = useWindowSize();

	const appHeight = useGameSettingsStore((state) => state.appHeight);
	const appWidth = useGameSettingsStore((state) => state.appWidth);
	const backgroundSpeed = useGameSettingsStore(
		(state) => state.backgroundSpeed,
	);
	const groundHeight = useGameSettingsStore((state) => state.groundHeight);
	const groundSpeed = useGameSettingsStore((state) => state.groundSpeed);
	const sizeScale = useGameSettingsStore((state) => state.sizeScale);
	const gameStatus = useGameStateStore((state) => state.status);
	const score = useGameStateStore((state) => state.score);
	const player = useGameStateStore((state) => state.player);
	const obstacles = useGameStateStore((state) => state.obstacles);

	const resetSettings = useGameSettingsStore((state) => state.resetSettings);
	const updateScaling = useGameSettingsStore((state) => state.updateScaling);
	const resetGameState = useGameStateStore((state) => state.resetState);
	const increaseScore = useGameStateStore((state) => state.increaseScore);
	const moveObstacles = useGameStateStore((state) => state.moveObstacles);
	const playerJump = useGameStateStore((state) => state.playerJump);
	const startGame = useGameStateStore((state) => state.startGame);
	const restartGame = useGameStateStore((state) => state.restartGame);
	const endGame = useGameStateStore((state) => state.endGame);
	const decreasePlayerYPos = useGameStateStore(
		(state) => state.decreasePlayerYPos,
	);

	useEffect(() => {
		if (windowHeight > windowWidth) {
			updateScaling(SizeScalingOption.HeightDividedByWidth);
		} else {
			updateScaling(SizeScalingOption.WidthDividedByHeight);
		}

		if (!app.renderer) return;

		if (windowWidth >= 400 && windowWidth <= 800) {
			app.renderer.resize(windowWidth, appHeight);
			resetSettings(windowWidth, appHeight);
			resetGameState();
		} else {
			app.renderer.resize(800, 600);
			resetSettings();
			resetGameState();
		}
	}, [
		app.renderer,
		appHeight,
		windowWidth,
		windowHeight,
		updateScaling,
		resetSettings,
		resetGameState,
	]);

	useTick((t) => {
		if (gameStatus !== GameStatus.Playing) return;

		if (isScoreMilestone(score)) {
			playScoreMilestone();
		}

		if (hasPlayerCollided(player, obstacles)) {
			playCollisionSound();
			endGame();
			return;
		}

		decreasePlayerYPos(t.deltaTime);
		increaseScore();
		moveObstacles(t.deltaTime);
	});

	const playGame = () => {
		if (gameStatus === GameStatus.Initial) {
			startGame();
			return;
		}

		if (gameStatus === GameStatus.GameOver) {
			restartGame();
			return;
		}

		if (!player.isJumping) {
			playJumpSound();
			playerJump();
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === " ") {
			playGame();
		}
	};

	const handleMouseDown = () => {
		playGame();
	};

	const handleTouchStart = () => {
		playGame();
	};

	useEventListener(window, "keydown", handleKeyDown, {
		passive: true,
	});

	useEventListener(window, "mousedown", handleMouseDown, {
		passive: true,
	});

	useEventListener(window, "touchstart", handleTouchStart, {
		passive: true,
	});

	return (
		<pixiContainer>
			<Background
				appWidth={appWidth}
				appHeight={appHeight}
				backgroundSpeed={backgroundSpeed}
				isGamePlaying={gameStatus === GameStatus.Playing}
			/>
			{app.ticker && process.env.NODE_ENV === "development" && (
				<pixiText
					text={Math.trunc(app.ticker.FPS).toString()}
					anchor={0.5}
					x={15}
					y={15}
					style={
						new TextStyle({
							fontSize: 10,
						})
					}
				/>
			)}
			{gameStatus !== GameStatus.Initial && (
				<Score
					appWidth={appWidth}
					appHeight={appHeight}
					sizeScale={sizeScale}
					score={score}
				/>
			)}
			{gameStatus === GameStatus.Initial && (
				<GameStartText
					appWidth={appWidth}
					appHeight={appHeight}
					sizeScale={sizeScale}
				/>
			)}
			{gameStatus === GameStatus.GameOver && (
				<GameOverText
					appWidth={appWidth}
					appHeight={appHeight}
					sizeScale={sizeScale}
				/>
			)}
			<Player
				player={player}
				isGamePlaying={gameStatus === GameStatus.Playing}
			/>
			<Obstacles
				obstacles={obstacles}
				isGamePlaying={gameStatus === GameStatus.Playing}
			/>
			<Ground
				appWidth={appWidth}
				appHeight={appHeight}
				groundHeight={groundHeight}
				groundSpeed={groundSpeed}
				sizeScale={sizeScale}
				isGamePlaying={gameStatus === GameStatus.Playing}
			/>
		</pixiContainer>
	);
}

export default Game;
