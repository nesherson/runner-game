import type { Texture } from "pixi.js";

export type GameState = {
  status: GameStatus
  player: Player
  score: number
  obstacles: Obstacle[]
}

export type Player = {
  x: number
  y: number
  startPosY: number
  height: number
  width: number
  isJumping: boolean
  animationSpeed: number
  textures: Texture[]
  jumpHeight: number
  jumpStrength: number
  fallStrength: number
}

export type GameAction = {
  type: string
  status?: GameStatus
  deltaTime?: number
  isJumping?: boolean
}

export type Obstacle = {
  x: number
  y: number
  width: number
  height: number
  textures: Texture[]
  animationSpeed: number
}

export type GameStateStoreAction = {
  startGame: () => void
  endGame: () => void
  restartGame: () => void
  decreasePlayerYPos: (deltaTime: number) => void
  increasePlayerYPos: (deltaTime: number) => void
  playerJump: () => void
  increaseScore: () => void
  moveObstacles: (deltaTime: number) => void
  resetState: () => void
  setPlayerStartingPosition: (startPosX: number, startPosY: number) => void
}

export type GameSettings = {
  appWidth: number
  appHeight: number
  sizeScale: number
  groundHeight: number
  backgroundSpeed: number
  groundSpeed: number
  obstacleSpeed: number
  obstacleMinSpacing: number
  obstacleMaxSpacing: number
  obstacleCount: number
  scoreIncreaseSpeed: number
  yCollisionOffset: number
  xCollisionOffset: number
  defaultAnimationSpeed: number
}

export type GameSettingsStoreAction = {
  updateScaling: (sizeScalingOption: SizeScalingOption) => void
  resetSettings: (newAppWidth?: number, newAppHeight?: number) => void
}

export type ObstacleData = {
  textures: Texture[]
  width: number
  height: number
}

export enum SizeScalingOption {
  WidthDividedByHeight = 0,
  HeightDividedByWidth = 1
}

export enum GameStatus {
  Initial = 0,
  Playing = 1,
  GameOver = 2
}

