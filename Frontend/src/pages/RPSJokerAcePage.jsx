import React, { useState, useEffect } from 'react';
import RPSJokerAceGame from '../components/RPSJokerAceGame';
import '../RPSJokerAce.css';
import { useCookies } from 'react-cookie';

import UserInfo from './UserInfo';

const RPSJokerAcePage = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [topScores, setTopScores] = useState ([]);
  const [user, setUser] = useState(null);

  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  const handleRefresh = () => {
    setRefreshData(!refreshData);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      
      try {
        const response = await fetch('http://localhost:8080/RPS/player?username=' + cookie.user, {
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
        const response = await fetch('http://localhost:8080/RPS/records', {
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
        const response = await fetch("http://localhost:8080/RPS/winner", {
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
    <div className="RPSJokerAce-container">
      <div className="RPSJokerAce-background"></div>
      <RPSJokerAceGame key={refreshData} onWinner={handleWinner} />
      <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>
      <div className="top-scores">
        <h2>Top 3 Players</h2>
        <ul>
          {topScores.map((player, index) => (
            <li key={index}>
              <span>{player.username}</span>
              <span> Wins: </span>
              <span>{player.wins}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RPSJokerAcePage;
