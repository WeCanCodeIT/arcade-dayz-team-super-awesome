import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TicTacToe from "../src/pages/TicTacToe";
import PongGame from "../src/pages/PongGame";
import RPSJokerAce from "./src/components/RPSJokerAce";
import WhacAMole from "./components/WhacAMole";
import HomePage from "../src/pages/HomePage";

import ConnectFourBoardPage from "./src/pages/ConnectFourBoardPage";

import AlienGame from "./src/pages/AlienGame";
import DiceGame from "./pages/DiceGamePage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/tic-tac-toe" exact component={TicTacToe} />
          <Route path="/PongGame" exact component={PongGame} />
          <Route path="/RPSJokerAce" component={RPSJokerAce} />
          <Route path="/mole-smash" exact component={WhacAMole} />

          <Route path="/connect-four" exact component={ConnectFourBoardPage} />

          <Route path="/alien-jump" exact component={AlienGame} />
          <Route path="/DiceGame" exact component={DiceGame} />
          <Route path="/HomePage" exact component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
