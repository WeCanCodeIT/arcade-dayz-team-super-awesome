import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import { useCookies } from 'react-cookie';

import '../pages/NavBar.css';

function NavBar() {
  const [userFullName, setUserFullName] = useState(null);
  const [cookie, getCookie] = useCookies(["user"]);

  
useEffect(() => {
  console.log(cookie.user)
  setUserFullName(cookie.user)

},[]);


  return (
    <div className="navbar">
      <div className="title">
        <h1 className="title-name">Welcome to Arcade Dayz, {userFullName || 'Name unavailable'}!</h1>
      </div>
      <div>
        <Link to="/HomePage">Home</Link>
        <Link to="/AboutPage">About</Link>
        <Link to="/signup">Logout</Link>
      </div>
    </div>
  );
}

export default NavBar;
