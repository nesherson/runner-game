import { FC, forwardRef, MutableRefObject, useEffect, useRef, useState } from 'react';
import { Stage, useTick, Container, Sprite, AnimatedSprite, PixiRef } from '@pixi/react';
import { Resource, Texture } from 'pixi.js';

import './App.css';
import groundTile from "./assets/ground/tile_ground.png";
import playerCharStart from "./assets/characters/player-char-start.png";
import playerCharEnd from "./assets/characters/player-char-end.png";

const groundHeight = 36;
const groundWidth = 80;

function Ground({ appWidth, appHeight, startX }: { appWidth: number, appHeight: number, startX: number }) {
  const [xPos, setXPos] = useState(startX);

  const groundTiles = Array.from({ length: 10 }, (_, i) => {
    return {
      i: i,
      image: groundTile,
      x: xPos + i * groundWidth,
      y: appHeight - groundHeight,
      height: groundHeight,
      width: groundWidth
    };
  });

  useTick(d => {
    let tempXPos = xPos - 3;

    if (tempXPos <= -appWidth) {
      tempXPos = appWidth;
      setXPos(tempXPos);
    }
    else {
      setXPos(tempXPos);
    }
  });

  return (
    <Container>
      {groundTiles.map(gt => (
        <Sprite
          key={gt.i}
          image={gt.image}
          height={gt.height}
          width={gt.width}
          x={gt.x}
          y={gt.y}
        />
      ))
      }
    </Container>
  );
}

function PlayerChar({ appHeight }: { appHeight: number }) {
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

function App() {
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

export default App;