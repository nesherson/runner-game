import { useState } from "react";
import { TilingSprite, useTick } from "@pixi/react";

import backgroundImg from "../../../assets/background/background.png";
import { APP_HEIGHT, APP_WIDTH, BACKGROUND_SPEED_MULTIPLIER } from "../constants";

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
        image={backgroundImg}
        width={APP_WIDTH}
        height={APP_HEIGHT}
        tilePosition={{ x: xPos, y: 0 }}
        tileScale={{ x: 0.5, y: 0.5 }}
    />
}

export default Background;