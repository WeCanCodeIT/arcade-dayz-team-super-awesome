import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import TicTacToe from './pages/TicTacToePage'
import RPSJokerAce from './pages/RPSJokerAcePage';
import WhacAMole from './pages/WhacAMolePage';


const App = () => {

  const location = useLocation();

  useEffect(() => {
    document.body.classList.remove(
      "tic-tac-toe-background",
      "mole-background",
      "habitat_background"
      
    );

    if (location.pathname === "/tic-tac-toe") {
      document.body.classList.add("tic-tac-toe-background");
    } else if (location.pathname === "/mole-smash") {
      document.body.classList.add("mole-background");
    } else {
      document.body.classList.add("habitat_background");
    }
    
  }, [location]);
  return(
    <Router>
      <div>
        <Switch>
          <Route path = "/tic-tac-toe" exact component = {TicTacToe} />
          <Route path = "/RPSJokerAce" exact component = {RPSJokerAce} />
          <Route path = "/mole-smash" exact component = {WhacAMole} />
        </Switch>
      </div>
    </Router>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
