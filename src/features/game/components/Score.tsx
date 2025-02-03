import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

interface Props {
    appWidth: number,
    appHeight: number,
    sizeScale: number,
    score: number
}

function Score({ appWidth, appHeight, sizeScale, score }: Props) {
    return (
        <Text
            text={Math.floor(score).toString()}
            anchor={0.5}
            x={appWidth * 0.9}
            y={appHeight * 0.05}
            style={new TextStyle({
                fontSize: 15 * sizeScale
            })}
        />
    );
}

export default Score;