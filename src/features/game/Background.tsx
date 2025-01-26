import { useState } from "react";
import { TilingSprite, useTick } from "@pixi/react";

import backgroundImg from "../../assets/background/background.png";

interface Props {
    appWidth: number,
    appHeight: number
}

function Background({ appWidth, appHeight }: Props) {
    const [xPos, setXPos] = useState(0);

    useTick(d => {
        setXPos(prev => prev - 0.5 * d);
    });

    return <TilingSprite 
        image={backgroundImg}
        width={appWidth}
        height={appHeight}
        tilePosition={{ x: xPos, y: 0 }}
        tileScale={{ x: 0.5, y: 0.5 }}
    />
}

export default Background;