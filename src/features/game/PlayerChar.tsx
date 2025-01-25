import { useState, useEffect } from "react";
import { useTick, AnimatedSprite } from "@pixi/react";
import { Texture, Resource } from "pixi.js";

import playerCharStart from "../../assets/characters/player-start.png";
import playerCharEnd from "../../assets/characters/player-end.png";

function PlayerChar({ appHeight }: { appHeight: number }) {
  const groundYScale = 1.5;
  const groundHeight = 18 * groundYScale;
  const charHeight = 36;
  const charWidth = 36;
  const jumpHeight = 60;
  const originalYPos = appHeight - groundHeight - charHeight;
  const xPos = 30;


  const [yPos, setYPos] = useState(originalYPos);
  const [isJumping, setIsJumping] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [frames, setFrames] = useState<Texture<Resource>[]>([]);

  useEffect(() => {
    const images = [playerCharStart, playerCharEnd];

    window.addEventListener("keydown", handleKeyDown);

    setFrames(images.map(x => Texture.from(x)));
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === " ") {
      setIsJumping(true)
    }
  }

  useTick(d => {
    if (isJumping) {
      if (yPos > originalYPos - jumpHeight) {
        setYPos(prev => prev - 1.9 * d);
      }
      else {
        setIsJumping(false);
        setIsFalling(true);
      }
    }

    if (isFalling) {
      if (yPos < originalYPos) {
        setYPos(prev => prev + 2.2 * d);
      }
      else {
        setIsFalling(false);
      }
    }
  });

  return frames.length > 0 &&
    <AnimatedSprite
      textures={frames}
      height={charHeight}
      width={charWidth}
      x={xPos}
      y={yPos}
      animationSpeed={0.15}
      isPlaying={true}
    />
}

export default PlayerChar;