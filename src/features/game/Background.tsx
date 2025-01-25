import { useState } from "react";
import { TilingSprite, useTick } from "@pixi/react";

import backgroundImg from "../../assets/background/background.png"

function Background({ appWidth, appHeight }: { appWidth: number, appHeight: number }) {
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