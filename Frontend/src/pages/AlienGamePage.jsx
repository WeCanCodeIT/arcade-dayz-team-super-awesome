import React, { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import Alien from "../components/Alien";
import Platform from "../components/Platform";
import Spaceship from "../components/Spaceship";
import Fireball from "../components/Fireball";
import "./AlienGame.css";
import NavBar from "./NavBar";

const initialPlatforms = [
  { id: 1, left: 0, top: 700, width: 100, height: 20, isMoving: false },
  { id: 2, left: 150, top: 730, width: 100, height: 20, isMoving: false },
  { id: 3, left: 300, top: 660, width: 100, height: 20, isMoving: false },
  { id: 4, left: 450, top: 590, width: 100, height: 20, isMoving: true, range: { start: 450, end: 550 }, speed: 2 },
  { id: 5, left: 600, top: 520, width: 100, height: 20, isMoving: false },
  { id: 6, left: 750, top: 450, width: 100, height: 20, isMoving: false },
  { id: 7, left: 900, top: 400, width: 100, height: 20, isMoving: false },
  { id: 8, left: 1050, top: 350, width: 100, height: 20, isMoving: false },
  { id: 9, left: 1125, top: 300, width: 100, height: 20, isMoving: false },
  { id: 10, left: 965, top: 250, width: 100, height: 20, isMoving: false }
];

const spaceshipPosition = {
  left: 700,
  top: 5,
  width: 300,
  height: 130
};

const AlienGame = () => {
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [gameWon, setGameWon] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState("HELP! The alien is lost and needs your help finding its way. Help it get back to its space shuttle. Avoid the fireballs AT ALL COSTS!!!");
  const [gameLost, setGameLost] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const gameAreaRef = useRef(null);
  const [gameArea, setGameArea] = useState({ width: 0, height: 0 });
  const [fireballs, setFireballs] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ left: 0, top: 0, width: 50, height: 50 });
  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [topTimes, setTopTimes] = useState([]);
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(["user"]);
  const [refreshData, setRefreshData] = useState(false);
  const MAX_FIREBALLS = 4;

  useEffect(() => {
    let timerInterval = null;
    if (isGameStart && !gameWon && !gameLost) {
      timerInterval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isGameStart, gameWon, gameLost]);

  useEffect(() => {
    const updateGameArea = () => {
      if (gameAreaRef.current) {
        const { offsetWidth: width, offsetHeight: height } = gameAreaRef.current;
        setGameArea({ width, height });
      }
    };
    updateGameArea();
    window.addEventListener('resize', updateGameArea);
    return () => {
      window.removeEventListener('resize', updateGameArea);
    };
  }, []);

  const fetchTopTimes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/alienjump/records",
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched top scores:", data);
        setTopTimes(data);
      } else {
        console.log("Error fetching top scores");
      }
    } catch (error) {
      console.log("Error fetching top scores", error);
    }
  };

  useEffect(() => {
    fetchTopTimes();
  }, [refreshData]);

  const updatePlatformPosition = (id, newPosition) => {
    setPlatforms((prevPlatforms) =>
      prevPlatforms.map((platform) =>
        platform.id === id ? { ...platform, ...newPosition } : platform
      )
    );
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        console.log("Fetching current user with cookie:", cookies.user);
        const response = await fetch(
          "http://localhost:8080/alienjump/player?username=" + cookies.user,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const userData = await response.json();
          console.log("Fetched current user:", userData);
          setUser(userData);
        } else {
          console.log("Error fetching current player");
        }
      } catch (error) {
        console.log("Error fetching current player", error);
      }
    };
    fetchCurrentUser();
  }, [cookies.user]);

  const handleWin = () => {
    setGameWon(true);
    setIsGameOver(true);
    const completedTime = timer; 
    setShowWinMessage("You helped the alien find their way home! YOU WIN!");
    setButtonText("Play Again");
    setFireballs([]);
    handleWinner(completedTime);
  };

  const generateFireballs = () => {
    let newFireballs = [];
    for (let i = 0; i < MAX_FIREBALLS; i++) {
      newFireballs.push({
        id: i,
        left: Math.random() * (gameArea.width - 50), 
        top: Math.random() * (gameArea.height - 50), 
        width: 50,
        height: 50,
      });
    }
    console.log("Generated fireballs:", newFireballs); 
    setFireballs(newFireballs);
  };

  const handleFall = () => {
    setGameLost(true);
    setIsGameOver(true);
    setFireballs([]);
    setShowWinMessage("");
    setButtonText("Play Again");
  };
  

  const handleStart = () => {
    setIsGameStart(true);
    setGameLost(false);
    setIsGameOver(false);
    setGameWon(false);
    setTimer(0);
    generateFireballs();
    setButtonText("Start");
    setShowWinMessage("");
  };

  const handleRestart = () => {
    setIsGameStart(true);
    setGameLost(false);
    setIsGameOver(false);
    setGameWon(false);
    setFireballs([]);
    generateFireballs();
    setTimer(0);
    setButtonText("Play Again");
    setShowWinMessage("")

  };

  const handleHit = () => {
    setGameLost(true);
    setIsGameOver(true);
    setFireballs([]);
    setShowWinMessage("The alien was hit! GAME OVER!");
    setButtonText("Play Again");
  };


  const updatePlayerPosition = (newPosition) => {
    setPlayerPosition(newPosition);
  };

  const handleWinner = async (completedTime) => {
    if (user) {
      try {
        console.log("Posting winner with user:", user, "and score:", completedTime);
        const response = await fetch("http://localhost:8080/alienjump/winner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username: user.username, time: completedTime }),
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
    <div className="game-container" ref={gameAreaRef}>
      {showWinMessage && <div className="win-message">{showWinMessage}</div>}
      <div className="alien-game">
        <div className="alien-timer">Time: {timer} seconds</div>
        <Spaceship position={spaceshipPosition} />
        {isGameStart && !gameWon && !gameLost && (
          <Alien
            platforms={platforms}
            spaceshipPosition={spaceshipPosition}
            fireballs={fireballs}
            onWin={handleWin}
            onHit={handleHit}
            onLose={handleFall}
            updatePlayerPosition={updatePlayerPosition}
            gameArea={gameArea}
          />
        )}
        {isGameStart && platforms.map((platform) => (
          <Platform
            key={platform.id}
            position={{ left: platform.left, top: platform.top }}
            isMoving={platform.isMoving}
            range={platform.range}
            speed={platform.speed}
            updatePosition={(newPosition) =>
              updatePlatformPosition(platform.id, newPosition)
            }
          />
        ))}
        {isGameStart && fireballs.map((fireball) => (
          <Fireball key={fireball.id} position={fireball} gameArea={gameArea} playerPosition={playerPosition} onHit={handleHit} />
        ))}
        {!isGameStart && <button className="alien-start-button" onClick={handleStart}>{buttonText}</button>}
        {(gameLost || gameWon) && <button className="alien-restart-button" onClick={handleRestart}>{buttonText}</button>}
      </div>
      <NavBar />
      <div className="alien-top-scores">
        <h2>Top 3 Players</h2>
        <ul>
          <li className="alien-header">
            <span>Username</span>
            <span></span>
            <span>Fastest Time</span>
          </li>
          {topTimes.map((player, index) => (
            <li key={index}>
              <div className="alien-username">
                <span>{player.username}</span>
              </div>
              <span></span>
              <div className="alien-score">
                <span>{player.fastestTime} seconds</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlienGame;
