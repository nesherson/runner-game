import { useCallback, useState } from 'react';
import { Stage, Graphics as GraphicsComp, useTick, Container } from '@pixi/react';
import './App.css';
import { Graphics } from 'pixi.js';

function Ground({ appWidth, appHeight }) {
  const [x1, setX1] = useState(appWidth);
  const [y1, setY1] = useState(appHeight - 15);
  const [x2, setX2] = useState(appWidth * 2);
  const [y2, setY2] = useState(appHeight - 15);

  const draw1 = useCallback(
    (g: Graphics) => {
      let tempX = x1;
      let tempY = y1;

      g.clear()
      .lineStyle(2, 0x000000, 1)
      .moveTo(tempX, tempY);
      tempY -= 20;
      g.lineTo(tempX, tempY);
      tempY += 20;
      tempX += 150;
      g.lineTo(tempX, tempY);
      // tempX += 20;
      // tempY -= 20;
      // g.lineTo(tempX, tempY);
      // tempX += 20;
      // tempY += 20;
      // g.lineTo(tempX, tempY);
      tempX += appWidth - tempX;
      g.lineTo(tempX, tempY);
    },
    [x1, y1],
  );

  const draw2 = useCallback(
    (g: Graphics) => {
      let tempX = x2;
      let tempY = y2;

      g.clear()
      .lineStyle(2, 0x000000, 1)
      .moveTo(tempX, tempY);
      tempY -= 20;
      g.lineTo(tempX, tempY);
      tempY += 20;
      tempX += 150;
      g.lineTo(tempX, tempY);
      // tempX += 20;
      // tempY -= 20;
      // g.lineTo(tempX, tempY);
      // tempX += 20;
      // tempY += 20;
      // g.lineTo(tempX, tempY);
      tempX += appWidth - tempX;
      g.lineTo(tempX, tempY);
    },
    [x2, y2],
  );


  useTick(deltaTime => {
    if (x1 <= -appWidth) {
      setX1(appWidth);
      return;
    }

    setX1(x1 - (deltaTime * 5));
    setX2(x2 - (deltaTime * 5));
  });

  return <Container>
    <GraphicsComp draw={draw1} />
    <GraphicsComp draw={draw2} />
  </Container>
}

function App() {
  const appWidth = 800;
  const appHeight = 600;
  return (
    <Stage width={appWidth} height={appHeight} options={{ background: 0x1099bb }}>
      <Ground appWidth={appWidth} appHeight={appHeight}/>
      {/* <Ground2 appWidth={appWidth} appHeight={appHeight}/> */}
    </Stage>
  );
}

export default App
