import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TicTacToe from '../src/pages/TicTacToe'
import PongGamePage from './pages/PongGamePage';

function App(){
  return(
    <Router>
      <div>
        <Switch>
          <Route path = "/tic-tac-toe" exact component = {TicTacToe} />
          <Route path = "/pong-game-page" exact component = {PongGamePage} />
          <Route path = "/infants" component = {InfantsPage} />
          <Route path = "/toddlers" component = {ToddlersPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;