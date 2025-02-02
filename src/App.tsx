import { Stage, withPixiApp } from '@pixi/react';

import './App.css';
import Game from './features/game/components/Game';
import { APP_HEIGHT, APP_WIDTH } from './features/game/constants';

function App() {
  const Comp = withPixiApp(Game);
  return (
    <Stage width={APP_WIDTH} height={APP_HEIGHT} options={{ background: 0x1099bb }}>
      <Comp />
    </Stage>
  );
}

export default App;