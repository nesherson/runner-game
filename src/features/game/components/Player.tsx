import { AnimatedSprite } from "@pixi/react";

import { PLAYER_HEIGHT, PLAYER_WIDTH } from "../constants";
import { Player as PlayerType } from "../types/types";

interface Props {
  player: PlayerType,
  isGamePlaying: boolean
}

function Player({ player, isGamePlaying }: Props) {
  return (
    <AnimatedSprite
      textures={player.textures}
      height={PLAYER_HEIGHT}
      width={PLAYER_WIDTH}
      x={player.x}
      y={player.y}
      animationSpeed={player.animationSpeed}
      isPlaying={isGamePlaying}
    />
  );
}

export default Player;