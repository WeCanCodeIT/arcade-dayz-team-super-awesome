import React, { useState, useEffect } from "react";
import "../DiceGame.css";
import DiceRulesModal from "./DiceRulesModal";
import dice1 from "../components/DiceImages/dice_1.jpeg";
import dice2 from "../components/DiceImages/dice_2.jpeg";
import dice3 from "../components/DiceImages/dice_3.jpeg";
import dice4 from "../components/DiceImages/dice_4.jpeg";
import dice5 from "../components/DiceImages/dice_5.jpeg";
import dice6 from "../components/DiceImages/dice_6.jpeg";
import { useCookies } from "react-cookie";

const DiceGame = () => {
  const [dice, setDice] = useState([1, 1, 1]);
  const [score, setScore] = useState(0);
  const [calculations, setCalculations] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [rounds, setRounds] = useState(0);
  const [showRules, setShowRules] = useState(false);

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
        const response = await fetch(
          "http://localhost:8080/dice/player?username=" + cookie.user,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.log("Error fetching current player");
        }
      } catch (error) {
        console.log("Error fetching current player", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await fetch("http://localhost:8080/dice/records", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setTopScores(data);
        } else {
          console.log("Error fetching top scores");
          console.log(response.json());
        }
      } catch (error) {
        console.log("Error fetching top scores", error);
      }
    };

    fetchTopScores();
  }, [refreshData]);

  const handleWinner = async () => {
    if (user) {
      try {
        const response = await fetch("http://localhost:8080/dice/winner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username: user.username, rounds: rounds + 1}),
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

  const [cheatWindowVisible, setCheatWindowVisible] = useState(false);

  const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

  const rollDice = () => {
    setIsRolling(true);
    setRounds((prevRounds) => prevRounds + 1);

    setTimeout(() => {
      const newDice = Array.from(
        { length: 3 },
        () => Math.floor(Math.random() * 6) + 1
      );
      setDice(newDice);
      updateScore(newDice);
      setIsRolling(false);
    }, 1500);
  };

  const updateScore = (dice) => {
    let newScore = 0;
    let pointsGained = [];

    const isConsecutive = (arr) =>
      arr
        .sort((a, b) => a - b)
        .every((n, i) => i === 0 || n === arr[i - 1] + 1);
    const hasSameNumbers = (arr, count) =>
      arr.filter((n) => arr.filter((x) => x === n).length === count).length > 0;
    const allOdd = (arr) => arr.every((n) => n % 2 !== 0);
    const allEven = (arr) => arr.every((n) => n % 2 === 0);

    if (isConsecutive(dice)) {
      const sum = dice.reduce((a, b) => a + b, 0);
      newScore += sum;
      pointsGained.push(sum + " (Consecutive)");
    }

    if (hasSameNumbers(dice, 2)) {
      const sameNumbersSum = dice
        .filter((n) => dice.filter((x) => x === n).length === 2)
        .reduce((a, b) => a + b, 0);
      newScore += sameNumbersSum;
      pointsGained.push(sameNumbersSum + " (Two of a Kind)");
    }

    if (hasSameNumbers(dice, 3)) {
      const sameNumbers = dice.find(
        (n) => dice.filter((x) => x === n).length === 3
      );
      newScore += sameNumbers * 3;
      pointsGained.push(sameNumbers * 3 + " (Three of a Kind)");
    }

    if (allOdd(dice)) {
      newScore += 1;
      pointsGained.push(1 + " (All Odd)");
    }

    if (allEven(dice)) {
      newScore += 2;
      pointsGained.push(2 + " (All Even)");
    }

    const updatedScore = score + newScore;
    setScore(updatedScore);
    setCalculations(pointsGained);

    if (updatedScore >= 100) {
    setRounds((prevRounds) => prevRounds); 
    setHasWon(true);
    handleWinner();
    }
  };

  const resetScore = () => {
    setScore(0);
    setHasWon(false);
    setCalculations([]);
    setRounds(0);
  };

  useEffect(() => {
    if (hasWon) {
      const resetTimer = setTimeout(() => {
        resetScore();
      }, 2000);

      return () => clearTimeout(resetTimer);
    }
  }, [hasWon]);

  const checkCheatCode = (code) => {
    if (code === "99problems") {
      setScore(99);
      console.log("Cheat activated! Your score is now 99.");
    } else {
      console.log("Invalid cheat code.");
    }
  };

  const handleCheatInput = (event) => {
    if (event.key === "Enter") {
      checkCheatCode(event.target.value);
      event.target.value = "";
      setCheatWindowVisible(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.key === "Enter") {
        setCheatWindowVisible(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.classList.add("dice-game-body");
    return () => {
      document.body.classList.remove("dice-game-body");
    };
  }, []);

  return (
    
    <div className="dice-game">
      <h1>Dice Game</h1>

      <div className="dice-top-scores">
        <h2>Top 3 Scores</h2>
        <ul>
          {topScores.map((player, index) => (
            <li key={index}>
            <span>{player.username}</span> 
            <span>Rounds</span> 
            <span>{player.rounds}</span>
          </li>
          ))}
        </ul>
      </div>

      <div className="buttons-container">
        <button onClick={() => setShowRules(true)}>Show Rules</button>
        <button
          onClick={() => {
            rollDice();
          }}
        >
          Roll Dice
        </button>
        <button onClick={resetScore}>Reset Game</button>
      </div>
      <div className="dice-container">
        {dice.map((die, index) => (
          <div
            key={index}
            className="die"
            style={{ backgroundImage: `url(${diceImages[die - 1]})` }}
          ></div>
        ))}
      </div>
      <p>
        Score: {score}
        {calculations.length > 0 && (
          <span> (+ {calculations.join(" + ")})</span>
        )}
      </p>
      <p>Rounds: {rounds}</p>
      {isRolling && (
        <div className="rolling-gif">
          <iframe
            src="https://giphy.com/embed/K1bX4ydTVOByfp9M8Z"
            width="450"
            height="200"
          ></iframe>
          <p></p>
        </div>
      )}
      {hasWon && (
        <div className="winner-message">
          <h2>You Win!</h2>
        </div>
      )}
      <DiceRulesModal show={showRules} onClose={() => setShowRules(false)} />
      {cheatWindowVisible && (
        <div className="cheat-window">
          <input
            type="text"
            placeholder="Enter cheat code"
            onKeyDown={handleCheatInput}
          />
        </div>
      )}
    </div>
  );
};

export default DiceGame;
