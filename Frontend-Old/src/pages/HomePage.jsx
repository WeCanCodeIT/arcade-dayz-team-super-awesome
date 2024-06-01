import React from "react";
import { Link } from "react-router-dom";
import "../home-page.css";

function HomePage() {
  return (
    <div className="">
      <div className="">
        <h1>Welcome to the Virtual Pet Zoo</h1>
        <div className="links-container">
          <Link to="/tic-tac-toe" className="">View Giraffes</Link>
          <Link to="/goats" className="">View Goats</Link>
          <Link to="/jellyfish" className="">View Jellyfish</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
