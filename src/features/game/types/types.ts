import { Texture } from "pixi.js";

export type GameState = {
  status: GameStatus;
  player: Player;
  score: number;
  obstacles: Obstacle[];
};

export type Player = {
  x: number;
  y: number;
  isJumping: boolean;
  animationSpeed: number;
  textures: Texture[];
};

export type GameAction = {
  type: string;
  status?: GameStatus;
  deltaTime?: number;
  isJumping?: boolean;
};

export type Obstacle = {
  x: number;
  y: number;
  textures: Texture[];
};

export enum GameStatus {
  Initial,
  Playing,
  GameOver,
}
