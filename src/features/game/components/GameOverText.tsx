import { Text } from "@pixi/react";
import { APP_HEIGHT, APP_WIDTH } from "../constants";
import { TextStyle } from "pixi.js";

function GameOverText() {
    return (
        <>
            <Text
                text="Game over"
                anchor={0.5}
                x={APP_WIDTH / 2}
                y={APP_HEIGHT / 2}
                style={new TextStyle({
                    fontSize: 50
                })}
            />
            <Text
                text="Press spacebar to restart"
                anchor={0.5}
                x={APP_WIDTH / 2}
                y={APP_HEIGHT / 2 + 40}
                style={new TextStyle({
                    fontSize: 15
                })}
            />
        </>
    );
}

export default GameOverText;