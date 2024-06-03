import React from 'react';
import GameCanvas from '../components/GameCanvas';

const PongGamePage = () => {
  return (
    <div className='pong-game-page'>
      <h1> Pong Game</h1>
      <GameCanvas />
    </div>
  );
};
export default PongGamePage;