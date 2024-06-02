import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TicTacToe from './pages/TicTacToePage'
import PongGame from './pages/PongGamePage'

function App(){
  return(
    <Router>
      <div>
        <Switch>
          <Route path = "/tic-tac-toe" exact component = {TicTacToe} />
          <Route path = "/pong-game" exact component={ PongGame } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;