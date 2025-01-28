import { TilingSprite, useTick } from "@pixi/react";
import { useState } from "react";

import { Texture } from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, GROUND_HEIGHT, GROUND_SPEED_MULTIPLIER, GROUND_Y_SCALE } from "../constants";

const groundTexture = Texture.from("/assets/ground/ground.png");

interface Props {
    isGamePlaying: boolean
}

function Ground({ isGamePlaying }: Props) {
    const [xPos, setXPos] = useState(0);

    useTick(d => {
        if (!isGamePlaying)
            return;

        setXPos(prev => prev - GROUND_SPEED_MULTIPLIER * d);
    });

    return (
        <TilingSprite
            texture={groundTexture}
            width={APP_WIDTH}
            height={GROUND_HEIGHT}
            x={0}
            y={APP_HEIGHT - GROUND_HEIGHT}
            tilePosition={{ x: xPos, y: 0 }}
            tileScale={{ x: 1, y: GROUND_Y_SCALE }}
        />
    );
}

export default Ground;