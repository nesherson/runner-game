import { useState } from "react";
import { useTick, TilingSprite } from "@pixi/react";

import groundImg from "../../assets/ground/ground.png";

interface Props {
    appWidth: number,
    appHeight: number,
    groundHeight: number,
    groundYSale: number
}

function Ground({ appWidth, appHeight, groundHeight, groundYSale }: Props) {
    const [xPos, setXPos] = useState(0);

    useTick(d => {
        setXPos(prev => prev - 2.4 * d);
    });

    return (
        <TilingSprite
            image={groundImg}
            width={appWidth}
            height={groundHeight}
            x={0}
            y={appHeight - groundHeight}
            tilePosition={{ x: xPos, y: 0 }}
            tileScale={{ x: 1, y: groundYSale }}
        />
    );
}

export default Ground;