import React from "react";
import "./Spaceship.css";
import spaceshipImage from "./spaceship.png";

const Spaceship = ({ position }) => {
  return (
    <div
      className="spaceship"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
      }}
    >
      <img src={spaceshipImage} alt="Flying Saucer" />
    </div>
  );
};

export default Spaceship;
