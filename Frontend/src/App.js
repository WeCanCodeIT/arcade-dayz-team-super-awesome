import React from 'react';
import TicTacToePage from './pages/TicTacToePage';  
import './tic-tac-toe.css';

const App = () => {
  
  return (
    <div className="App">
    <div className="tic-tac-toe-background"></div>
      <TicTacToePage />
      </div>
  );
};

export default App;
