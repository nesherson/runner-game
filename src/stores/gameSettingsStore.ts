import { create } from "zustand";
import { type GameSettings, type GameSettingsStoreAction, SizeScalingOption } from "../types/types";

export const useGameSettingsStore = create<GameSettings & GameSettingsStoreAction>((set) => ({
    ...createInitialGameSettings(),
    updateScaling: (sizeScalingOption: SizeScalingOption) => set((state) => {
        if (sizeScalingOption === SizeScalingOption.HeightDividedByWidth) {
            return { sizeScale: state.appHeight / state.appWidth };
        }

        return { sizeScale: state.appWidth / state.appHeight };
    }),
    resetSettings: (newAppWidth?: number, newAppHeight?: number) => set((_) => ({
        ...createInitialGameSettings(newAppWidth, newAppHeight)
    }))
}));

function createInitialGameSettings(appW?: number, appH?: number) {
    const defaultAppWidth = 800;
    const defaultAppHeight = 600;
    const appWidth = appW ?? defaultAppWidth;
    const appHeight = appH ?? defaultAppHeight;
    const sizeScale = appWidth / appHeight * 1.65;
    const groundHeight = sizeScale * 18;
    const backgroundSpeed = 0.7;
    const groundSpeed = 2.95;
    const obstacleMinSpacing = 200;
    const obstacleMaxSpacing = 650;
    const obstacleSpeed = 5.1;
    const obstacleCount = 7;
    const scoreIncreaseSpeed = 0.3;
    const yCollisionOffset = 3;
    const xCollisionOffset = 3;
    const defaultAnimationSpeed = 0.1;

    return {
        appWidth,
        appHeight,
        sizeScale,
        groundHeight,
        backgroundSpeed,
        groundSpeed,
        obstacleMinSpacing,
        obstacleMaxSpacing,
        obstacleSpeed,
        obstacleCount,
        scoreIncreaseSpeed,
        yCollisionOffset,
        xCollisionOffset,
        defaultAnimationSpeed
    };
}