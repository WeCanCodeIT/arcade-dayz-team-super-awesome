import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import TicTacToe from './pages/TicTacToePage'
import RPSJokerAce from './pages/RPSJokerAcePage';
import PongGame from './pages/PongGamePage';
import WhacAMole from './pages/WhacAMolePage';
import WhacAMoleScoreBadge from './components/WhacAMoleScoreBadge';

import ConnectFourBoard from './components/ConnectFourBoard';

import AlienGame from './pages/AlienGamePage';


const App = () => {
  const location = useLocation();
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    document.body.classList.remove(
      "tic-tac-toe-background",
      "mole-background",
      "RPS_background",
      "arcade-pong1",

      "retro-connect-four-background",

      "alien-background",
      "Dice_background"

    );

    if (location.pathname === "/tic-tac-toe") {
      document.body.classList.add("tic-tac-toe-background");
    } else if (location.pathname === "/mole-smash") {
      document.body.classList.add("mole-background");
    } else if (location.pathname === "/RPSJokerAce") {
      document.body.classList.add("RPS_background");  
    } else if (location.pathname === "/PongGame"){

    } else if (location.pathname === "/connect-four") {
      document.body.classList.add("retro-connect-four-background")
    

    } else if (location.pathname === "/alien-jump"){
      document.body.classList.add("alien-background");
    } else if (location.pathname === "/DiceGame") {
      document.body.classList.add("Dice_background");
    }


    
  }, [location]);
  
  return(
    <Router>
      <div>
        <Switch>
          <Route path="/tic-tac-toe" exact component={TicTacToe} />
          <Route path="/RPSJokerAce" exact component={RPSJokerAce} />
          <Route path="/PongGame" exact component={PongGame} />
          <Route path="/alien-jump" exact component={AlienGame} />
          <Route path = "/DiceGame" exact component = {DiceGame}/>
          <Route path="/mole-smash" exact>
            <WhacAMole score={score} setScore={setScore} />
          </Route>
          <Route path="/connect-four" exact component={ConnectFourBoard} />
        </Switch>
        {location.pathname === '/mole-smash' && (
          <div className="app">
            <WhacAMoleScoreBadge score={score} />
          </div>
        )}
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
