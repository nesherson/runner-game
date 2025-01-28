export type GameState = {
    status: GameStatus,
    player: Player,
    score: number,
    obstacles: Obstacle[]
}

export type Player = {
    x: number,
    y: number,
    isJumping: boolean,
    isFalling: boolean
}

export type GameAction = {
    type: string,
    status?: GameStatus,
    deltaTime?: number,
    isJumping?: boolean,
    isFalling?: boolean
}

export type Obstacle = {
    x: number,
    y: number
}

export enum GameStatus {
    Initial,
    Playing,
    GameOver
}