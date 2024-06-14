import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TicTacToe from "./pages/TicTacToePage";
import PongGame from "./pages/PongGamePage";
import RPSJokerAce from "./components/RPSJokerAce";
import WhacAMole from "./pages/WhacAMolePage";
import HomePage from "./pages/HomePage";
import ConnectFourBoardPage from "./pages/ConnectFourBoardPage";
import AlienGame from "./pages/AlienGamePage";
import DiceGame from "./pages/DiceGamePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserInfo from "./pages/UserInfo";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/tic-tac-toe" exact component={TicTacToe} />
          <Route path="/PongGame" exact component={PongGame} />
          <Route path="/RPSJokerAce" component={RPSJokerAce} />
          <Route path="/mole-smash" exact component={WhacAMole} />
          <Route path="/connect-four" exact component={ConnectFourBoardPage} />
          <Route path="/alien-jump" exact component={AlienGame} />
          <Route path="/DiceGame" exact component={DiceGame} />
          <Route path="/HomePage" exact component={HomePage} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/userInfo" exact component={UserInfo} />
          <Route path="/" exact component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
