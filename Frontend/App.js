import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TicTacToe from "../src/pages/TicTacToe";
import PongGame from "../src/pages/PongGame";
import RPSJokerAce from "./src/components/RPSJokerAce";
import WhacAMole from "./components/WhacAMole";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/tic-tac-toe" exact component={TicTacToe} />
          <Route path="/pong-game-page" exact component={PongGame} />
          <Route path="/RPSJokerAce" component={RPSJokerAce} />
          <Route path="/mole-smash" exact component={WhacAMole} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
