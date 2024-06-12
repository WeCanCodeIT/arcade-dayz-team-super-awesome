import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import '../pages/TicTacToe.css'; // Make sure this is the correct path to your CSS file // Make sure this is the correct path to your CSS file
import UserInfo from './UserInfo';

const TicTacToePage = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [topScores, setTopScores] = useState([]);
  const [user, setUser] = useState(null);

  const handleRefresh = () => {
    setRefreshData(!refreshData);
  };

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
        }
      } catch (error) {
        console.log('Error fetching top scores');
      }
    };

    fetchTopScores();
  }, [refreshData]);

  const handleUserFetch = (fetchedUser) => {
    if (!fetchedUser) {
      console.log("User not found");
      return;
    }
    setUser(fetchedUser);
  }

  const handleWinner = async (user) => {
    if (user) {
      try {
        const response = await fetch("http://localhost:8080/tictactoe/winner", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ username: user.username, id: user.id }),
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
      <UserInfo onUserFetch={handleUserFetch} />
    </div>
  );
};

export default TicTacToePage;
