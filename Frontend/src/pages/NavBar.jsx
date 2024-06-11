import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import '../pages/NavBar.css';

function NavBar() {
  const [userFullName, setUserFullName] = useState(null);

  const handleUserFetch = (user) => {
    setUserFullName(user.fullName);
  };

  return (
    <div className="navbar">
      <div className="title">
        <h1>Welcome to Arcade Dayz, {userFullName || 'Name unavailable'}!</h1>
      </div>
      <div>
        <Link to="/HomePage">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signup">Logout</Link>
      </div>
      <UserInfo onUserFetch={handleUserFetch} />
    </div>
  );
}

export default NavBar;
