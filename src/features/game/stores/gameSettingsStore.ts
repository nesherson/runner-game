import { create } from "zustand";

export const useGameSettingsStore = create<GameSettings & GameSettingsStoreAction>((set) => ({
    ...createInitialGameSettings(800, 600),
    updateScaling: (sizeScalingOption: SizeScalingOption) => set((state) => {
        if (sizeScalingOption === SizeScalingOption.HeightDividedByWidth) {
            return { sizeScale: state.appHeight / state.appWidth };
        }

        return { sizeScale: state.appWidth / state.appHeight };
    }),
    resetSettings: (newAppWidth: number, newAppHeight: number) => set((_) => ({
        ...createInitialGameSettings(newAppWidth, newAppHeight)
    }))
}));

type GameSettings = {
    appWidth: number
    appHeight: number
    sizeScale: number
    groundHeight: number
    playerHeight: number
    playerWidth: number
    backgroundSpeed: number
    groundSpeed: number,
    playerStartPosX: number,
    playerStartPosY: number
}

type GameSettingsStoreAction = {
    updateScaling: (sizeScalingOption: SizeScalingOption) => void
    resetSettings: (newAppWidth: number, newAppHeight: number) => void
}

export enum SizeScalingOption {
    WidthDividedByHeight,
    HeightDividedByWidth
}

function createInitialGameSettings(appW: number, appH: number) {
    const appWidth = appW;
    const appHeight = appH;
    const sizeScale = appWidth / appHeight * 1.65;
    const groundHeight = sizeScale * 18;
    const playerHeight = 23 * sizeScale;
    const playerWidth = 20 * sizeScale;
    const backgroundSpeed = 0.7;
    const groundSpeed = 2.95;
    const playerStartPosX = appWidth * 0.1;
    const playerStartPosY = appHeight - groundHeight - playerHeight;

    return {
        appWidth,
        appHeight,
        sizeScale,
        groundHeight,
        playerHeight,
        playerWidth,
        backgroundSpeed,
        groundSpeed,
        playerStartPosX,
        playerStartPosY
    };
}