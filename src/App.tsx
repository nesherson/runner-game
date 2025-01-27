import { useReducer } from 'react';
import { Stage } from '@pixi/react';

import './App.css';
import { APP_HEIGHT, APP_WIDTH, PLAYER_ORIGINAL_Y_POS } from './features/game/constants';
import Game from './features/game/components/Game';
import { GameState, GameStatus } from './features/game/types/types';
import { reducer } from './features/game/stores/reducers';
import { createObstacles } from './features/game/utils/obstacleHelpers';

const initialGameState: GameState = {
  status: GameStatus.Initial,
  score: 0,
  player: {
    x: 30,
    y: PLAYER_ORIGINAL_Y_POS,
    isJumping: false
  },
  obstacles: createObstacles()
};

function App() {
  const [gameState, dispatch] = useReducer(reducer, initialGameState);

  return (
    <Stage width={APP_WIDTH} height={APP_HEIGHT} options={{ background: 0x1099bb }}>
      <Game gameState={gameState} dispatch={dispatch} />
    </Stage>
  );
}

export default App;