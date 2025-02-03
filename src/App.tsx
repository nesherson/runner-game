import { Stage, withPixiApp } from '@pixi/react';

import './App.css';
import Game from './features/game/components/Game';
import { useGameSettingsStore } from './features/game/stores';

function App() {
  const Comp = withPixiApp(Game);
  const appWidth = useGameSettingsStore(state => state.appWidth);
  const appHeight = useGameSettingsStore(state => state.appHeight);

  return (
    <Stage width={appWidth} height={appHeight} options={{ background: 0x1099bb }}>
      <Comp />
    </Stage>
  );
}

export default App;