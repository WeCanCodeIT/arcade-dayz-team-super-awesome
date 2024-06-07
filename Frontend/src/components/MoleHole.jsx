import React from "react";
import "./MoleHole.css";
import Mole from "./Mole";
import Monster from "./Monster";

const MoleHole = ({ index, isActive, isHit, activeCharacter, isGameOver }) => {
  return (
    <div className={`mole-hole hole-${index} ${isGameOver} ? "game-over" : ""}`}>
      {isActive && !isHit && activeCharacter === "mole" && <Mole />}
      {isActive && !isHit && activeCharacter === "monster" && <Monster />}
      {isHit && activeCharacter === "mole" && (
        <img src="/burst.png" alt="Pow!" className="burst-image" />
      )}
      {isHit && activeCharacter === "monster" && (
        <img src="/green-splat.png" alt="Splat!" className="splat-image" />
      )}
    </div>
  );
};

export default MoleHole;
