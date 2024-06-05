import React, { useEffect, useRef, useState } from "react";
import "../pages/pong-game.css";

const GameCanvas = ({ updateScore }) => {
  const canvasRef = useRef(null);
  const [ball, setBall] = useState({ x: 300, y: 200, dx: 5, dy: 5 });
  const [paddles, setPaddles] = useState({ left: 150, right: 150 });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState(null);

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "ArrowUp":
        setPaddles((prev) => ({
          ...prev,
          right: Math.max(prev.right - 10, 20),
        }));
        break;
      case "ArrowDown":
        setPaddles((prev) => ({
          ...prev,
          right: Math.min(prev.right + 10, 280),
        }));
        break;
      case "w":
        setPaddles((prev) => ({
          ...prev,
          left: Math.max(prev.left - 10, 20),
        }));
        break;
      case "s":
        setPaddles((prev) => ({
          ...prev,
          left: Math.min(prev.left + 10, 280),
        }));
        break;
      default:
        break;
    }
  };

  const updateGame = () => {
    setBall((prevBall) => {
      let newDx = prevBall.dx;
      let newDy = prevBall.dy;
      let player1Scored = false;
      let player2Scored = false;

      if (prevBall.y <= 20 || prevBall.y >= 380) {
        newDy = -prevBall.dy;
      }

      if (
        (prevBall.x <= 50 &&
          prevBall.y >= paddles.left &&
          prevBall.y <= paddles.left + 100) ||
        (prevBall.x >= 550 &&
          prevBall.y >= paddles.right &&
          prevBall.y <= paddles.right + 100)
      ) {
        newDx = -prevBall.dx;
      }

      if (prevBall.x < 0) {
        player2Scored = true;
      } else if (prevBall.x > 600) {
        player1Scored = true;
      }

      if (player1Scored) {
        setScores((prevScores) => ({
          ...prevScores,
          player1: prevScores.player1 + 5,
        }));
      } else if (player2Scored) {
        setScores((prevScores) => ({
          ...prevScores,
          player2: prevScores.player2 + 5,
        }));
      }

      if (player1Scored || player2Scored) {
        setBall({ x: 300, y: 200, dx: 5, dy: 5 });
      }

      return {
        ...prevBall,
        x: prevBall.x + newDx,
        y: prevBall.y + newDy,
        dx: newDx,
        dy: newDy,
      };
    });

    if (scores.player1 >= 50 || scores.player2 >= 50) {
      setGameOver(true);
      setGameRunning(false);
      setWinningPlayer(scores.player1 >= 50 ? "Player 1" : "Player 2");
    }
  };

  useEffect(() => {
    if (gameRunning) {
      const intervalId = setInterval(updateGame, 50);
      window.addEventListener("keydown", handleKeyPress);

      return () => {
        clearInterval(intervalId);
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [gameRunning, ball, paddles, scores]);

  const startGame = () => {
    setGameRunning(true);
    setGameOver(false);
  };

  const restartGame = () => {
    setBall({ x: 300, y: 200, dx: 5, dy: 5 });
    setPaddles({ left: 150, right: 150 });
    setScores({ player1: 0, player2: 0 });
    setGameOver(false);
    setGameRunning(true);
    setWinningPlayer(null); // Reset winning player
  };

  const pauseGame = () => {
    setGameRunning(false);
  };

  useEffect(() => {
    updateScore(scores);
  }, [scores, updateScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const outerGradient = context.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      outerGradient.addColorStop(0, "#0072FF");
      outerGradient.addColorStop(1, "#00C6FF");
      context.fillStyle = outerGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#FFFFFF";
      context.fillRect(30, paddles.left, 20, 100);
      context.fillRect(550, paddles.right, 20, 100);

      context.beginPath();
      context.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
      context.fillStyle = "#FFFFFF";
      context.fill();
    };

    const intervalId = setInterval(() => {
      draw();
    }, 50);

    return () => clearInterval(intervalId);
  }, [gameRunning, ball, paddles]);

  return (
    <div className="Game">
      <div className="Header">
        <h1>Welcome to Pong</h1>
      </div>
      <div className="game-area">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="game-canvas"
        />
      </div>
      <div className="controls">
        {!gameRunning && !gameOver && (
          <button onClick={startGame}>Start</button>
        )}
        <button onClick={restartGame}>Restart</button>
        {gameRunning && <button onClick={pauseGame}>Pause</button>}
      </div>
      {gameOver && (
        <div className="game-over">Game Over! {winningPlayer} wins!</div>
      )}
    </div>
  );
};

export default GameCanvas;
