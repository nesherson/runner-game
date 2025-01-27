import { useState, useEffect } from "react";
import { AnimatedSprite } from "@pixi/react";
import { Texture, Resource } from "pixi.js";

import orangeBoxStart from "../../assets/characters/enemies/orange-box-start.png";
import orangeBoxEnd from "../../assets/characters/enemies/orange-box-end.png";
import { ANIMATION_SPEED, OBSTACLE_HEIGHT, OBSTACLE_WIDTH } from "./constants";

interface Props {
    xPos: number,
    yPos: number,
    isGamePlaying: boolean
}

function Obstacle({ yPos, xPos, isGamePlaying }: Props) {
    const [frames, setFrames] = useState<Texture<Resource>[]>([]);

    useEffect(() => {
        setFrames([orangeBoxStart, orangeBoxEnd]
            .map(x => Texture.from(x)));
    }, []);

    return frames.length > 0 &&
        <AnimatedSprite
            textures={frames}
            height={OBSTACLE_HEIGHT}
            width={OBSTACLE_WIDTH}
            x={xPos}
            y={yPos}
            animationSpeed={ANIMATION_SPEED}
            isPlaying={isGamePlaying}
        />
}

export default Obstacle;