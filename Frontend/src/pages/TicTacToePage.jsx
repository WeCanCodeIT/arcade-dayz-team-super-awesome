import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import '../pages/TicTacToe.css';
import UserInfo from './UserInfo';

const TicTacToePage = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [topScores, setTopScores] = useState([]);
  const [user, setUser] = useState(null);
  const [userTopWins, setUserTopWins] = useState([]);

  const handleRefresh = () => {
    setRefreshData(!refreshData);
  };

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await fetch('http://localhost:8080/tic-tac-toe/records', {
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

  useEffect(() => {
    const fetchUserTopWins = async (username) => {
      try {
        const response = await fetch(`http://localhost:8080/tic-tac-toe/top-wins?username=${username}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUserTopWins(data);
        } else {
          console.log("Error fetching user top wins");
        }
      } catch (error) {
        console.log("Error fetching user top wins");
      }
    };

    if (user && user.username) {
      fetchUserTopWins(user.username);
    }
  }, [user]);

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
        const response = await fetch("http://localhost:8080/tic-tac-toe/winner", {
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
          const errorText = await response.text();
          console.log("Error posting winner", errorText);
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
        <h2><strong>Top 3 Scores:</strong></h2>
        <ul>
          {topScores.map((player, index) => (
            <li key={index}>
              {player.username} <strong>- Wins: {player.wins}</strong>
            </li>
          ))}
        </ul>
      </div>
      <div className="user-top-wins">
        <h2><strong>User Top 3 Wins:</strong></h2>
        <ul>
          {userTopWins.map((win, index) => (
            <li key={index}>
              {win.username} <strong>- Wins: {win.wins}</strong>
            </li>
          ))}
        </ul>
      </div>
      <UserInfo onUserFetch={handleUserFetch} />
    </div>
  );
};

export default TicTacToePage;
