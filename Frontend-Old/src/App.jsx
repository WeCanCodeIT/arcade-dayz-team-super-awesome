import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TicTacToe from './pages/tic-tac-toe-pages/TicTacToe'

function App(){
  return(
    <Router>
      <div>
        <Switch>
          <Route path = "/" exact component = {TicTacToe} />
          <Route path = "/infants" component = {InfantsPage} />
          <Route path = "/toddlers" component = {ToddlersPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;