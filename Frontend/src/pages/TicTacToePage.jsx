import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import '../pages/TicTacToe.css'; // Make sure this is the correct path to your CSS file // Make sure this is the correct path to your CSS file
import { useCookies } from 'react-cookie';

import UserInfo from './UserInfo';

const TicTacToePage = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [topScores, setTopScores] = useState([]);
  const [user, setUser] = useState(null);


  const [cookie, setCookie, removeCookie] = useCookies(["user"]);


  const handleRefresh = () => {
    setRefreshData(!refreshData);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      
      try {
        const response = await fetch('http://localhost:8080/tictactoe/player?username=' + cookie.user, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.log('Error fetching current player');
        }
      } catch (error) {
        console.log('Error fetching current player', error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await fetch('http://localhost:8080/tictactoe/records', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setTopScores(data);
        } else {
          console.log('Error fetching top scores');
          console.log(response.json())
        }
      } catch (error) {
        console.log('Error fetching top scores', error);
      }
    };

    fetchTopScores();
  }, [refreshData]);

  const handleWinner = async () => {
    if (user) {
      try {
        const response = await fetch("http://localhost:8080/tictactoe/winner", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          
          body: JSON.stringify({ username: user.username}),
        });
        if (response.ok) {
          console.log("Winner posted successfully");
          setRefreshData((prev) => !prev);
        } else {
          console.log("Error posting winner");
        }
      } catch (error) {
        console.log("Error posting winner", error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  return (
    <div className="App">
      <div className="tic-tac-toe-background"></div>
      <div className="game-title">
        <h1>Tic Tac Toe</h1>
      </div>
      <Board key={refreshData} onWinner={handleWinner} />
      <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>
      <div className="top-scores">
        <h2>Top 3 Scores</h2>
        <ul>
          {topScores.map((player, index) => (
            <li key={index}>
              {player.username} - Wins: {player.wins}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicTacToePage;
