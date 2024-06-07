import React from "react";
import "./Spaceship.css";
import spaceshipImage from "./spaceship.png";

const Spaceship = () => {
  return <img src={spaceshipImage} alt="Flying Saucer" className="spaceship" />;
};

export default Spaceship;