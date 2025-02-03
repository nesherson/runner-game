import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

interface Props {
    appWidth: number,
    appHeight: number,
    sizeScale: number
}

function GameStartText({ appWidth, appHeight, sizeScale }: Props) {
    const xPos = appWidth / 2;
    const yPos = appHeight / 2;

    return (
        <>
            <Text
                text="Start game"
                anchor={0.5}
                x={xPos}
                y={yPos}
                style={new TextStyle({
                    fontSize: 50 * sizeScale
                })}
            />
            <Text
                text="Click or press spacebar to start"
                anchor={0.5}
                x={xPos}
                y={yPos + 40 * sizeScale}
                style={new TextStyle({
                    fontSize: sizeScale * 20
                })}
            />
        </>
    );
}

export default GameStartText;