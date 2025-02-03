import { AnimatedSprite } from "@pixi/react";

import { Player as PlayerType } from "../types/types";

interface Props {
  player: PlayerType,
  isGamePlaying: boolean,
  playerHeight: number,
  playerWidth: number
}

function Player({ player, isGamePlaying, playerWidth, playerHeight }: Props) {
  return (
    <AnimatedSprite
      textures={player.textures}
      height={playerHeight}
      width={playerWidth}
      x={player.x}
      y={player.y}
      animationSpeed={player.animationSpeed}
      isPlaying={isGamePlaying}
    />
  );
}

export default Player;