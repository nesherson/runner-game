import { AnimatedSprite } from "@pixi/react";

import { ANIMATION_SPEED, OBSTACLE_HEIGHT, OBSTACLE_WIDTH } from "../constants";
import { Obstacle } from "../types/types";

interface Props {
    obstacles: Obstacle[]
    isGamePlaying: boolean
}

function Obstacles({ obstacles, isGamePlaying }: Props) {
    return obstacles.map((o, i) => (
            <AnimatedSprite
                key={i}
                textures={o.textures}
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