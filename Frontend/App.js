import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TicTacToe from '../src/pages/TicTacToe'
import RPSJokerAce from './src/components/RPSJokerAce';

function App(){
  return(
    <Router>
      <div>
        <Switch>
          <Route path = "/tic-tac-toe" exact component = {TicTacToe} />
          <Route path = "/infants" component = {InfantsPage} />
          <Route path = "/RPSJokerAce" component = {RPSJokerAce} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;