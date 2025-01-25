import { Stage } from "@pixi/react";

import Ground from "./Ground";
import PlayerChar from "./PlayerChar";

function Game() {
  const appWidth = 800;
  const appHeight = 520;

  return (
    <Stage width={appWidth} height={appHeight} options={{ background: 0x1099bb }}>
      <Ground appHeight={appHeight} appWidth={appWidth} startX={0} />
      <Ground appHeight={appHeight} appWidth={appWidth} startX={appWidth} />
      <PlayerChar appHeight={appHeight} />
    </Stage>
  );
}

export default Game;