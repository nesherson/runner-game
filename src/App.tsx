import { useState } from 'react';
import { Stage, useTick, Container, Sprite } from '@pixi/react';
import './App.css';
import groundTile from "./assets/tile_ground.png";

function Ground({ appWidth, appHeight, startX }: { appWidth: number, appHeight: number, startX: number }) {
  const groundHeight = 36;
  const groundWidth = 80;

  const [xPos, setXPos] = useState(startX);

  const groundTilesPartOne = Array.from({ length: 10 }, (_, i) => {
    return {
      i: i,
      image: groundTile,
      x: xPos + i * groundWidth,
      y: appHeight - groundHeight + 4,
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
      {groundTilesPartOne.map(gt => (
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

function App() {
  const appWidth = 800;
  const appHeight = 600;
  return (
    <Stage width={appWidth} height={appHeight} options={{ background: 0x1099bb }}>
      <Ground appHeight={appHeight} appWidth={appWidth} startX={0} />
      <Ground appHeight={appHeight} appWidth={appWidth} startX={appWidth} />
    </Stage>
  );
}

export default App
