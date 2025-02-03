import { AnimatedSprite, Container } from "@pixi/react";

import { type AnimatedSprite as AnimatedSpriteType, ColorMatrixFilter } from "pixi.js";
import { useEffect, useRef } from "react";
import type { Obstacle } from "../types/types";

interface ObstaclesProps {
    obstacles: Obstacle[]
    isGamePlaying: boolean,
}

interface AnimatedSpriteWrapper {
    obstacle: Obstacle
    isGamePlaying: boolean
}

function Obstacles({ obstacles, isGamePlaying }: ObstaclesProps) {
    return obstacles.map((o, i) => (
        <AnimatedSpriteWrapper key={i} obstacle={o} isGamePlaying={isGamePlaying}
        />
    ))
}

function AnimatedSpriteWrapper({ obstacle, isGamePlaying }: { obstacle: Obstacle, isGamePlaying: boolean }) {
    const spriteRef = useRef<null | AnimatedSpriteType>(null);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.gotoAndPlay(0);
        }
    }, [obstacle.textures]);

    return (
        <Container filters={[new ColorMatrixFilter()]}>
            <AnimatedSprite
                ref={spriteRef}
                textures={obstacle.textures}
                height={obstacle.height}
                width={obstacle.width}
                x={obstacle.x}
                y={obstacle.y}
                animationSpeed={obstacle.animationSpeed}
                isPlaying={isGamePlaying}
                initialFrame={0}
            />
        </Container>
    );
}

export default Obstacles;