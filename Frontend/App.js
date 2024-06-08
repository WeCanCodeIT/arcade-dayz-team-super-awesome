import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TicTacToe from "../src/pages/TicTacToe";
import PongGame from "../src/pages/PongGame";
import RPSJokerAce from "./src/components/RPSJokerAce";
import WhacAMole from "./components/WhacAMole";
import ConnectFourBoardPage from "./src/pages/ConnectFourBoardPage";


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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
