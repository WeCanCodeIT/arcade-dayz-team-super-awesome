import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import TicTacToe from "./pages/TicTacToePage";
import RPSJokerAce from "./pages/RPSJokerAcePage";
import PongGame from "./pages/PongGamePage";
import WhacAMole from "./pages/WhacAMolePage";
import HomePage from "./pages/HomePage";
import WhacAMoleScoreBadge from "./components/WhacAMoleScoreBadge";
import DiceGame from "./components/DiceGame";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserInfo from "./pages/UserInfo";
import ConnectFourBoard from "./components/ConnectFourBoard";
import AlienGame from "./pages/AlienGamePage";
import NavBar from "./pages/NavBar";

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
      "Dice_background",
      "spaceshipBackground",
      "gameboy",
      "signup-background"
    );

    if (location.pathname === "/tic-tac-toe") {
      document.body.classList.add("tic-tac-toe-background");
    } else if (location.pathname === "/mole-smash") {
      document.body.classList.add("mole-background");
    } else if (location.pathname === "/RPSJokerAce") {
      document.body.classList.add("RPS_background");
    } else if (location.pathname === "/PongGame") {
      document.body.classList.add("arcade-pong1");
    } else if (location.pathname === "/connect-four") {
      document.body.classList.add("retro-connect-four-background");
    } else if (location.pathname === "/alien-jump") {
      document.body.classList.add("alien-background");
    } else if (location.pathname === "/DiceGame") {
      document.body.classList.add("Dice_background");
    } else if (location.pathname === "/signup") {
      document.body.classList.add("arcade-pong1");
    } else if (location.pathname === "/HomePage") {
      document.body.classList.add("spaceshipBackground");
    } else if (location.pathname === "/" || location.pathname === "/signup") {
      document.body.classList.add("gameboy");
    } else if (location.pathname === "/signup") {
      document.body.classList.add("signup-background");
    }
  }, [location]);

  const isAuthRoute = location.pathname === "/" || location.pathname === "/signup";

  return (
    <div>
      {!isAuthRoute && <NavBar />}
      <Routes>
        <Route path="/nav" element={<NavBar />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/RPSJokerAce" element={<RPSJokerAce />} />
        <Route path="/PongGame" element={<PongGame />} />
        <Route path="/alien-jump" element={<AlienGame />} />
        <Route path="/DiceGame" element={<DiceGame />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route
          path="/mole-smash"
          element={<WhacAMole score={score} setScore={setScore} />}
        />
        <Route path="/connect-four" element={<ConnectFourBoard />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
     </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
