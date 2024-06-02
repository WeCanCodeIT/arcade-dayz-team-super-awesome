import React from 'react';
<<<<<<< HEAD
import TicTacToePage from './pages/TicTacToePage'; 
import PongGamePage from './pages/PongGamePage'; 
import './tic-tac-toe.css';

const App = () => {
  
  return (
    <div className="App">
    <div className="tic-tac-toe-background"></div>
=======
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TicTacToe from './pages/TicTacToePage'

function App(){
  return(
    <Router>
      <div>
        <Switch>
          <Route path = "/tic-tac-toe" exact component = {TicTacToe} />
        </Switch>
>>>>>>> main
      </div>
    </Router>
  );
}

export default App;