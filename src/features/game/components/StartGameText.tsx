import { Text } from "@pixi/react";
import { APP_HEIGHT, APP_WIDTH } from "../constants";
import { TextStyle } from "pixi.js";

function StartGameText() {
    return (
        <>
            <Text
                text="Start game"
                anchor={0.5}
                x={APP_WIDTH / 2}
                y={APP_HEIGHT / 2}
                style={new TextStyle({
                    fontSize: 50
                })}
            />
            <Text
                text="Press spacebar to start"
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

export default StartGameText;