import React from "react";
import "../Monster.css";
import monsterImage from "./monster.png";

const Monster = () => {
  return <img src={monsterImage} alt="Monster" className="monster" />;
};

export default Monster;
