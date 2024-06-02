import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TicTacToe from './pages/TicTacToePage'
import RPSJokerAce from './pages/RPSJokerAcePage';

function App(){
  return(
    <Router>
      <div>
        <Switch>
          <Route path = "/tic-tac-toe" exact component = {TicTacToe} />
          <Route path = "/RPSJokerAce" exact component = {RPSJokerAce} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;