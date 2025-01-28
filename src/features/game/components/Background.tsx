import { TilingSprite, useTick } from "@pixi/react";
import { useState } from "react";

import { Texture } from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, BACKGROUND_SPEED_MULTIPLIER } from "../constants";

const backgroundTexture = Texture.from("/assets/background/background.png");

interface Props {
    isGamePlaying: boolean
}

function Background({ isGamePlaying }: Props) {
    const [xPos, setXPos] = useState(0);

    useTick(d => {
        if (!isGamePlaying)
            return;

        setXPos(prev => prev - BACKGROUND_SPEED_MULTIPLIER * d);
    });

    return <TilingSprite
        texture={backgroundTexture}
        width={APP_WIDTH}
        height={APP_HEIGHT}
        tilePosition={{ x: xPos, y: 0 }}
        tileScale={{ x: 0.5, y: 0.5 }}
    />
}

export default Background;