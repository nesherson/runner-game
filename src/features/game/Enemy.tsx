import { useState, useEffect } from "react";
import { useTick, AnimatedSprite } from "@pixi/react";
import { Texture, Resource } from "pixi.js";

import orangeBoxStart from "../../assets/characters/enemies/orange-box-start.png";
import orangeBoxEnd from "../../assets/characters/enemies/orange-box-end.png";

interface Props {
    appWidth: number,
    appHeight: number,
    groundHeight: number,
    animationSpeed: number
}

function Enemy({ appWidth, appHeight, groundHeight, animationSpeed }: Props) {
    const charHeight = 36;
    const charWidth = 36;

    const [xPos, setXPos] = useState(appWidth);
    const [yPos, setYPos] = useState(appHeight - groundHeight - charHeight + 4);

    const [frames, setFrames] = useState<Texture<Resource>[]>([]);

    useEffect(() => {
        const images = [orangeBoxStart, orangeBoxEnd];

        setFrames(images.map(x => Texture.from(x)));
    }, []);

    useTick(d => {
        if (xPos <= -charWidth) {
            setXPos(appWidth);
        }
        else {
            setXPos(prev => prev - 2.3 * d);
        }

    });

    return frames.length > 0 &&
        <AnimatedSprite
            textures={frames}
            height={charHeight}
            width={charWidth}
            x={xPos}
            y={yPos}
            animationSpeed={animationSpeed}
            isPlaying={true}
        />
}

export default Enemy;