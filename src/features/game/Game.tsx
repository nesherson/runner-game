import { Stage } from "@pixi/react";

import Ground from "./Ground";
import PlayerChar from "./PlayerChar";
import Background from "./Background";

function Game() {
    const appWidth = 640;
    const appHeight = 480;

    return (
        <Stage width={appWidth} height={appHeight} options={{ background: 0x1099bb }}>
            <Background appHeight={appHeight} appWidth={appWidth} />
            <Ground appHeight={appHeight} appWidth={appWidth} />
            <PlayerChar appHeight={appHeight} />
        </Stage>
    );
}

export default Game;