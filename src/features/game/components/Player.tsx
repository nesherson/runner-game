import { useState, useEffect } from "react";
import { AnimatedSprite } from "@pixi/react";
import { Texture, Resource } from "pixi.js";

import playerCharStart from "../../../assets/characters/player/player-start.png";
import playerCharEnd from "../../../assets/characters/player/player-end.png";
import { ANIMATION_SPEED, PLAYER_HEIGHT, PLAYER_WIDTH } from "../constants";

interface Props {
  xPos: number,
  yPos: number,
  isGamePlaying: boolean
}

function Player({ xPos, yPos, isGamePlaying }: Props) {
  const [frames, setFrames] = useState<Texture<Resource>[]>([]);

  useEffect(() => {
    const images = [playerCharStart, playerCharEnd];

    setFrames(images.map(x => Texture.from(x)));
  }, []);

  return frames.length > 0 &&
    <AnimatedSprite
      textures={frames}
      height={PLAYER_HEIGHT}
      width={PLAYER_WIDTH}
      x={xPos}
      y={yPos}
      animationSpeed={ANIMATION_SPEED}
      isPlaying={isGamePlaying}
    />
}

export default Player;