import { useState, useEffect } from "react";
import { AnimatedSprite } from "@pixi/react";
import { Texture, Resource } from "pixi.js";

import orangeBoxStart from "../../../assets/obstacles/orange-box-start.png";
import orangeBoxEnd from "../../../assets/obstacles/orange-box-end.png";
import { ANIMATION_SPEED, OBSTACLE_HEIGHT, OBSTACLE_WIDTH } from "../constants";
import { Obstacle } from "../types/types";

interface Props {
    obstacles: Obstacle[]
    isGamePlaying: boolean
}

function Obstacles({ obstacles, isGamePlaying }: Props) {
    const [frames, setFrames] = useState<Texture<Resource>[]>([]);

    useEffect(() => {
        setFrames([orangeBoxStart, orangeBoxEnd]
            .map(x => Texture.from(x)));
    }, []);

    return frames.length > 0 &&
        obstacles.map((o, i) => (
            <AnimatedSprite
                key={i}
                textures={frames}
                height={OBSTACLE_HEIGHT}
                width={OBSTACLE_WIDTH}
                x={o.x}
                y={o.y}
                animationSpeed={ANIMATION_SPEED}
                isPlaying={isGamePlaying}
            />
        ))

}

export default Obstacles;