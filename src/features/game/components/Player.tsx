import { AnimatedSprite } from "@pixi/react";

import type { Player as PlayerType } from "../types/types";

interface Props {
  player: PlayerType,
  isGamePlaying: boolean
}

function Player({ player, isGamePlaying }: Props) {
  return (
    <AnimatedSprite
      textures={player.textures}
      height={player.height}
      width={player.width}
      x={player.x}
      y={player.y}
      animationSpeed={player.animationSpeed}
      isPlaying={isGamePlaying}
    />
  );
}

export default Player;