import { useEffect, useState } from "react";
import { useTick } from "@pixi/react";
import { Assets, Texture } from "pixi.js";

interface Props {
    isGamePlaying: boolean,
    appWidth: number,
    appHeight: number,
    groundSpeed: number,
    groundHeight: number,
    sizeScale: number
}

function Ground({ appWidth, appHeight, groundHeight, groundSpeed, sizeScale, isGamePlaying }: Props) {
    const [xPos, setXPos] = useState(0);
    const [texture, setTexture] = useState(Texture.EMPTY);

      useEffect(() => {
            if (texture === Texture.EMPTY) {
                Assets
                .load("/assets/ground/ground.png")
                .then(result => setTexture(result));
            }
        }, [texture]);


    useTick(t => {
        if (!isGamePlaying)
            return;

        setXPos(prev => prev - groundSpeed * t.deltaTime);
    });

    return (
        <pixiTilingSprite
            texture={texture}
            width={appWidth}
            height={groundHeight}
            x={0}
            y={appHeight - groundHeight}
            tilePosition={{ x: xPos, y: 0 }}
            tileScale={{ x: 1, y: sizeScale }}
        />
    );
}

export default Ground;