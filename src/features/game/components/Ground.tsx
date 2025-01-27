import { useState } from "react";
import { useTick, TilingSprite } from "@pixi/react";

import groundImg from "../../../assets/ground/ground.png";
import { APP_HEIGHT, APP_WIDTH, GROUND_HEIGHT, GROUND_Y_SCALE, GROUND_SPEED_MULTIPLIER } from "../constants";

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
            image={groundImg}
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