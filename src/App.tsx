import { Stage } from '@pixi/react';

import './App.css';
import Game from './features/game/components/Game';
import { APP_HEIGHT, APP_WIDTH } from './features/game/constants';

function App() {
  return (
    <Stage width={APP_WIDTH} height={APP_HEIGHT} options={{ background: 0x1099bb }}>
      <Game />
    </Stage>
  );
}

export default App;