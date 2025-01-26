import { Stage } from "@pixi/react";

import Ground from "./Ground";
import PlayerChar from "./PlayerChar";
import Background from "./Background";

function Game() {
    const appWidth = 640;
    const appHeight = 480;
    const groundYScale = 1.5;
    const groundHeight = 18 * groundYScale;

    return (
        <Stage width={appWidth} height={appHeight} options={{ background: 0x1099bb }}>
            <Background
                appHeight={appHeight}
                appWidth={appWidth} />
            <Ground
                appHeight={appHeight}
                appWidth={appWidth}
                groundHeight={groundHeight}
                groundYSale={groundYScale} />
            <PlayerChar
                appHeight={appHeight}
                groundHeight={groundHeight} />
        </Stage>
    );
}

export default Game;