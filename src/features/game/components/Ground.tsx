import { useState } from "react";
import { TilingSprite, useTick } from "@pixi/react";
import { Texture } from "pixi.js";

const groundTexture = Texture.from("/assets/ground/ground.png");

interface Props {
    isGamePlaying: boolean,
    appWidth: number,
    appHeight: number,
    groundSpeed: number,
    groundHeight: number,
    sizeScale: number
}

function Ground({ appWidth, appHeight, groundHeight, groundSpeed, sizeScale, isGamePlaying }: Props) {
    const [xPos, setXPos] = useState(0);

    useTick(d => {
        if (!isGamePlaying)
            return;

        setXPos(prev => prev - groundSpeed * d);
    });

    return (
        <TilingSprite
            texture={groundTexture}
            width={appWidth}
            height={groundHeight}
            x={0}
            y={appHeight - groundHeight}
            tilePosition={{ x: xPos, y: 0 }}
            tileScale={{ x: 1, y: sizeScale }}
        />
    );
}

export default Ground;