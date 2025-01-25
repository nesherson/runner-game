import { useState } from "react";
import { useTick, TilingSprite } from "@pixi/react";

import groundImg from "../../assets/ground/ground.png";

function Ground({ appWidth, appHeight }: { appWidth: number, appHeight: number }) {
    const yScale = 1.5;
    const groundHeight = 18 * yScale;

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
            tileScale={{ x: 1, y: yScale }}
        />
    );
}

export default Ground;