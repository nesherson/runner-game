import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

import { APP_WIDTH, APP_HEIGHT } from "../constants";

interface Props {
    score: number
}

function Score({ score }: Props) {
    return (
        <Text
            text={Math.floor(score).toString()}
            anchor={0.5}
            x={APP_WIDTH * 0.9}
            y={APP_HEIGHT * 0.05}
            style={new TextStyle({
                fontSize: 20
            })}
        />
    );
}

export default Score;