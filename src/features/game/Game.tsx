import { Stage } from "@pixi/react";

import Ground from "./Ground";
import Player from "./Player";
import Background from "./Background";

function Game() {
    const appWidth = 640;
    const appHeight = 480;
    const groundYScale = 1.5;
    const groundHeight = 18 * groundYScale;
    const animationSpeed = 0.1;

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
            <Player
                appHeight={appHeight}
                groundHeight={groundHeight}
                animationSpeed={animationSpeed} />
        </Stage>
    );
}

export default Game;