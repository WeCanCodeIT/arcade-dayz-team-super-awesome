import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TicTacToe from '../src/pages/TicTacToe'

function App(){
  return(
    <Router>
      <div>
        <Switch>
          <Route path = "/tic-tac-toe" exact component = {TicTacToe} />
          <Route path = "/infants" component = {InfantsPage} />
          <Route path = "/toddlers" component = {ToddlersPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;