import { useCallback, useState } from 'react';
import { Stage, Graphics as GraphicsComp, useTick } from '@pixi/react';
import './App.css';
import { Graphics } from 'pixi.js';

function Ground({ appWidth, appHeight }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(appHeight - 5);

  const draw = useCallback(
    (g: Graphics) => {
      let tempX = x;
      let tempY = y;
      g.clear();
      g.lineStyle(2, 0x000000, 1);

      g.moveTo(tempX, tempY);
      tempX += 150;
      g.lineTo(tempX, tempY);
      tempX += 20;
      tempY -= 20;
      g.lineTo(tempX, tempY);
      tempX += 20;
      tempY += 20;
      g.lineTo(tempX, tempY);
      tempX += appWidth - tempX;
      g.lineTo(tempX, tempY);
    },
    [x, y],
  );

  useTick(deltaTime => {
    setX(x + (deltaTime * 1));
    // setY(x + (deltaTime * 1));

    if (x >= appWidth) {
      setX(0);
    }
    console.log(`x -> ${x},y -> ${y}`);
  });

  return <GraphicsComp draw={draw} />
}

function App() {
  const appWidth = 800;
  const appHeight = 600;

  return (
    <Stage width={appWidth} height={appHeight} options={{ background: 0x1099bb }}>
      {/* <GraphicsComp draw={groundDraw} /> */}
      <Ground appWidth={appWidth} appHeight={appHeight}/>
    </Stage>
  );
}

export default App
