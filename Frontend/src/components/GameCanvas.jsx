import React, { useEffect, useRef, useState } from "react";

const GameCanvas = ({ updateScore }) => {
  const canvasRef = useRef(null);
  const [ball, setBall] = useState({ x: 300, y: 200, dx: 5, dy: 5 });
  const [paddles, setPaddles] = useState({ left: 150, right: 150 });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.strokeStyle = "#000000";
      context.lineWidth = 5;
      context.strokeRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#FFFFFF";
      context.fillRect(30, paddles.left, 20, 100);
      context.fillRect(550, paddles.right, 20, 100);

      context.beginPath();
      context.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
      context.fillStyle = "#FFFFFF";
      context.fill();

      context.font = "bold 20px Arial";
      context.fillStyle = "#FFFFFF";
      context.textAlign = "left";
      context.fillText("Player 1", 10, 30);
      context.textAlign = "right";
      context.fillText("Player 2", canvas.width - 10, 30);
    };

    const intervalId = setInterval(() => {
      if (gameRunning) {
        draw();
        updateGame();
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [ball, paddles, gameRunning]);

  useEffect(() => {
    updateScore(scores);
  }, [scores, updateScore]);

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "ArrowUp":
        setPaddles((prev) => ({
          ...prev,
          right: Math.max(prev.right - 10, 0),
        }));
        break;
      case "ArrowDown":
        setPaddles((prev) => ({
          ...prev,
          right: Math.min(prev.right + 10, 300),
        }));
        break;
      case "w":
        setPaddles((prev) => ({ ...prev, left: Math.max(prev.left - 10, 0) }));
        break;
      case "s":
        setPaddles((prev) => ({
          ...prev,
          left: Math.min(prev.left + 10, 300),
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const updateGame = () => {
    setBall((prevBall) => {
      let newDx = prevBall.dx;
      let newDy = prevBall.dy;
      let player1Scored = false;
      let player2Scored = false;
  
      if (prevBall.y <= 10 || prevBall.y >= 390) {
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
  
      if (player1Scored && scores.player1 < 100) {
        setScores((prevScores) => ({
          ...prevScores,
          player1: Math.min(prevScores.player1 + 20, 100),
        }));
      } else if (player2Scored && scores.player2 < 100) {
        setScores((prevScores) => ({
          ...prevScores,
          player2: Math.min(prevScores.player2 + 20, 100),
        }));
      }
  
      if (scores.player1 >= 100 || scores.player2 >= 100) {
        setGameOver(true);
        setGameRunning(false);
        setWinningPlayer(scores.player1 >= 100 ? "Player 1" : "Player 2");
      }
  
      return {
        ...prevBall,
        x: prevBall.x + newDx,
        y: prevBall.y + newDy,
        dx: newDx,
        dy: newDy,
      };
    });
  };
  
  
  
  
  

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
    setWinningPlayer(null);
  };

  const pauseGame = () => {
    setGameRunning(false);
  };

  return (
    <div className="pong-game-page">
      <canvas ref={canvasRef} width={600} height={400} />
      <div className="controls">
        {gameRunning ? (
          <button onClick={pauseGame}>Pause</button>
        ) : (
          <button onClick={startGame}>Start</button>
        )}
        <button onClick={restartGame}>Restart</button>
      </div>
      {gameOver && (
        <div className="game-over" style={{ color: "#FFFFFF" }}>
          Game Over! {winningPlayer} wins!
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
