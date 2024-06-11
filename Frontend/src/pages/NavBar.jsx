import React from "react";
import { Link } from "react-router-dom";
import "../pages/NavBar.css";

function NavBar({ user }) {
  return (
    <div className="navbar">
      <div className="title">
        <h1>Welcome to Arcade Dayz, {user.fullName}!</h1>
      </div>
      <div>
        <Link to="/HomePage">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signup">Logout</Link>
      </div>
    </div>
  );
}

export default NavBar;
