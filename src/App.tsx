import { Application } from '@pixi/react';

import './App.css';

import Game from './components/Game';
import { useGameSettingsStore } from './stores';

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