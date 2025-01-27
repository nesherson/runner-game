export type GameState = {
    status: GameStatus,
    player: Player,
    score: number
}

export type Player = {
    x: number,
    y: number,
    isJumping: boolean
}

export type GameAction = {
    type: string,
    status?: GameStatus,
    deltaTime?: number,
    jumpValue?: boolean
}

export enum GameStatus {
    Initial,
    Playing,
    GameOver
}