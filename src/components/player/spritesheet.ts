export const playerSpriteSheetData = {
    frames: {
        player1: {
            frame: { x: 0, y: 0, w: 24, h: 24 },
            sourceSize: { w: 24, h: 24 },
            spriteSourceSize: { x: 0, y: 0, w: 24, h: 24 },
        },
        player2: {
            frame: { x: 24, y: 0, w: 24, h: 24 },
            sourceSize: { w: 24, h: 24 },
            spriteSourceSize: { x: 0, y: 0, w: 24, h: 24 },
        },
    },
    meta: {
        image: "/assets/player/player.png",
        format: "RGBA8888",
        size: { w: 48, h: 24 },
        scale: 1,
    },
    animations: {
        player: ["player1", "player2"],
    },
};