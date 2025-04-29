import { Application } from '@pixi/react';

import './App.css';

import Game from './features/game/components/Game';
import { useGameSettingsStore } from './features/game/stores';

function App() {
  const appWidth = useGameSettingsStore(state => state.appWidth);
  const appHeight = useGameSettingsStore(state => state.appHeight);

  return (
    <Application width={appWidth} height={appHeight} background={0x1099bb}>
      <Game />
    </Application>
  );
}

export default App;