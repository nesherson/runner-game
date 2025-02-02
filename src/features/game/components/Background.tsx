import { TilingSprite, useTick } from "@pixi/react";
import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS, useState } from "react";

import { Texture } from "pixi.js";

const backgroundTexture = Texture.from("/assets/background/background.png");

interface Props {
    isGamePlaying: boolean,
    appWidth: number,
    appHeight: number,
    backgroundSpeed: number
}

function Background({ appWidth, appHeight, backgroundSpeed, isGamePlaying }: Props) {
    const [xPos, setXPos] = useState(0);

    useTick(d => {
        if (!isGamePlaying)
            return;

        setXPos(prev => prev - backgroundSpeed * d);
    });

    return <TilingSprite
        texture={backgroundTexture}
        scale={{ x: 1.5, y: 1.5 }}
        width={appWidth}
        height={appHeight}
        tilePosition={{ x: xPos, y: 0 }}
        tileScale={{ x: 0.5, y: 0.5 }}
    />
}

export default Background;