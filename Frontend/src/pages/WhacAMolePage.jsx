import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import MoleHole from "../components/MoleHole";
import WhacAMoleScoreBadge from "../components/WhacAMoleScoreBadge";
import "./WhacAMole.css";
import Navbar from "./NavBar";

const WhacAMole = ({ score, setScore }) => {
  const [activeHole, setActiveHole] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHammerDown, setIsHammerDown] = useState(false);
  const [hitMole, setHitMole] = useState(null);
  const [hitMonster, setHitMonster] = useState(null);
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [hitMessage, setHitMessage] = useState(
    "Welcome to Super Mole Smash! Smash as many moles as you can to score points, but be careful not to hit the monsters! You have 2 minutes. Moles are +1 and monsters are -2."
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [timer, setTimer] = useState(2 * 60 * 1000);
  const [topScores, setTopScores] = useState([]);
  const [user, setUser] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleRefresh = () => {
    setRefreshData(!refreshData);
  };

  useEffect(() => {
    document.body.classList.add("mole-background");
    return () => {
      document.body.classList.remove("mole-background");
    };
  }, []);

  useEffect(() => {
    let gameInterval, timerInterval;

    if (isGameStart && !isGameOver) {
      gameInterval = startNewInterval();
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 100) {
            clearInterval(timerInterval);
            setIsGameOver(true);
            setHitMessage(`TIME'S UP! You scored ${score} points!`);
            return 0;
          }
          return prevTimer - 100;
        });
      }, 100);

      setIntervalId(gameInterval);
    }

    return () => {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
    };
  }, [isGameStart, isGameOver, score]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const startNewInterval = () => {
    clearInterval(intervalId);
    return setInterval(() => {
      const newActiveHole = Math.floor(Math.random() * 7);
      const isMonster = Math.random() < 0.5;

      setActiveHole(newActiveHole);
      setActiveCharacter(isMonster ? "monster" : "mole");
    }, 1000);
  };

  const handleClick = () => {
    if (!isGameStart || isGameOver) return;

    setIsHammerDown(true);
    setTimeout(() => setIsHammerDown(false), 200);

    const hammerRadius = 25;
    const characterRadius = 40;
    const hammerCenterX = mousePosition.x;
    const hammerCenterY = mousePosition.y;

    const activeHoleElement = document.querySelector(`.hole-${activeHole}`);
    if (activeHoleElement) {
      const characterRect = activeHoleElement.getBoundingClientRect();
      const characterCenterX = characterRect.left + characterRect.width / 2;
      const characterCenterY = characterRect.top + characterRect.height / 2;

      const distance = Math.sqrt(
        (hammerCenterX - characterCenterX) ** 2 +
          (hammerCenterY - characterCenterY) ** 2
      );

      if (distance < hammerRadius + characterRadius) {
        clearInterval(intervalId);
        if (activeCharacter === "mole") {
          setScore((prevScore) => {
            console.log("Hit Mole, new score: ", prevScore + 1);
            return prevScore + 1;
          });
          setHitMole(activeHole);
        } else if (activeCharacter === "monster") {
          setScore((prevScore) => {
            const newScore = prevScore > 2 ? prevScore - 2 : 0;
            console.log("Hit Monster, new score: ", newScore);
            if (newScore <= 0) {
              setIsGameOver(true);
              setHitMessage("YOU LOSE!");
            } else {
              setHitMessage("Don't smash the monsters!");
              setTimeout(() => setHitMessage(""), 1000);
            }
            return newScore;
          });
          setHitMonster(activeHole);
        }

        setTimeout(() => {
          setHitMole(null);
          setHitMonster(null);
          setActiveHole(null);
          setActiveCharacter(null);

          if (!isGameOver) {
            const newInterval = startNewInterval();
            setIntervalId(newInterval);
          }
        }, 500);
      }
    }
  };

  const handleStart = () => {
    setIsGameStart(true);
    setIsGameOver(false);
    setScore(0);
    setHitMole(null);
    setHitMonster(null);
    setActiveHole(null);
    setActiveCharacter(null);
    setHitMessage("");
    setTimer(2 * 60 * 100);
    const newInterval = startNewInterval();
    setIntervalId(newInterval);
  };

  const handleRestart = (e) => {
    e.stopPropagation();
    clearInterval(intervalId);
    setIsGameStart(true);
    setScore(0);
    setHitMole(null);
    setHitMonster(null);
    setActiveHole(null);
    setActiveCharacter(null);
    setHitMessage("");
    setTimer(2 * 60 * 100);
    const newInterval = startNewInterval();
    setIntervalId(newInterval);
    setIsGameOver(false);
  };

  const formatTime = (timer) => {
    const minutes = Math.floor((timer / 60000) % 60);
    const seconds = Math.floor((timer / 1000) % 60);
    const milliseconds = Math.floor((timer / 10) % 100);
    return (
      <div className="timer">
        {("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}:
        {("0" + milliseconds).slice(-2)}
      </div>
    );
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        console.log("Fetching current user with cookie:", cookies.user);
        const response = await fetch(
          "http://localhost:8080/molesmash/player?username=" + cookies.user,
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

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/molesmash/records",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched top scores:", data);
          setTopScores(data);
        } else {
          console.log("Error fetching top scores");
        }
      } catch (error) {
        console.log("Error fetching top scores", error);
      }
    };

    fetchTopScores();
  }, [refreshData]);

  useEffect(() => {
    if (isGameOver) {
      handleWinner();
    }
  }, [isGameOver]);

  const handleWinner = async () => {
    if (user) {
      try {
        console.log("Posting winner with user:", user, "and score:", score);
        const response = await fetch("http://localhost:8080/molesmash/winner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username: user.username, score: score }),
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
    <div className="game-container">
      <div
        className={`whac-a-mole ${isGameOver ? "game-over" : ""} ${
          isGameStart && !isGameOver ? "hide-cursor" : "game-start"
        }`}
        onClick={handleClick}
      >
        <div className="mole-title">
          <h1>Super Mole Smash!</h1>
        </div>
        <div className="holes-wrapper">
          {isGameStart && !isGameOver && <WhacAMoleScoreBadge score={score} />}
          <div className="holes">
            {[...Array(7)].map((_, index) => (
              <MoleHole
                key={index}
                index={index}
                isActive={isGameStart && !isGameOver && index === activeHole}
                isHit={index === hitMole || index === hitMonster}
                activeCharacter={
                  isGameStart && !isGameOver && index === activeHole
                    ? activeCharacter
                    : null
                }
                isGameOver={isGameOver}
              />
            ))}
          </div>
        </div>
      </div>
      {!isGameOver && isGameStart && (
        <img
          src="/mallet.png"
          alt="Hammer"
          className={`hammer ${isHammerDown ? "down" : ""}`}
          style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
        />
      )}
      {hitMessage && <div className="hit-message">{hitMessage}</div>}
      {!isGameStart && (
        <div className="start-game">
          <button onClick={handleStart}>Play</button>
        </div>
      )}
      {isGameOver && (
        <div className="play-again">
          <button onClick={handleRestart}>Play Again</button>
        </div>
      )}
      <div>{formatTime(timer)}</div>
      <div className="top-scores">
        <h2>Top 3 Players</h2>
        <ul>
          <li className="header">
            <span>Username</span>
            <span></span>
            <span>Score</span>
          </li>
          {topScores.map((player, index) => (
            <li key={index}>
            <div className="username">
              <span>{player.username}</span>
              </div>
              <span></span>
              <div className="score">
              <span>{player.score}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Navbar />
    </div>
  );
};

export default WhacAMole;
