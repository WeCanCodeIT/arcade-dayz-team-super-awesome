import React from "react";
import Alien from "../components/Alien";
import Platform from "../components/Platform";
import Spaceship from "../components/Spaceship";
import "./AlienGame.css";

const platforms = [
  { left: 85, top: 225, width: 100, height: 20 },
  { left: 275, top: 225, width: 100, height: 20 },
  { left: -65, top: 310, width: 100, height: 20 },
  { left: -225, top: 400, width: 100, height: 20, isMoving:true, range:  { start: 135, end: 300}, speed: 2 },
  { left: -435, top: 475, width: 100, height: 20 },
  { left: -655, top: 555, width: 100, height: 20 },
  { left: -515, top: 630, width: 100, height: 20 },
  { left: -650, top: 695, width: 100, height: 20 },
];

const AlienGame = () => {
  return (
    <div className="alien-game">
    <Spaceship />
      <Alien platforms={platforms} />
      {platforms.map((platform, index) => (
        <Platform
          key={index}
          position={{ left: platform.left, top: platform.top }}
          isMoving={platform.isMoving}
          range={platform.range}
          speed={platform.speed}
    
        />
        
      ))}
    </div>
  );
};

export default AlienGame;
