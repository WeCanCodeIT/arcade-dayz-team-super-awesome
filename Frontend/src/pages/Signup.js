import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, fullName }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.text();
        alert(data);
        navigate(`/userinfo?username=${username}`);
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      alert("Error signing up");
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <div className="signup-title">
          <h2>Sign up</h2>
        </div>
        <form onSubmit={handleSignup}>
          <div className="signup-fields">
            <div className="signup-fullname">
              <label className="signup-label">Full Name: </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="signup-input"
              />
            </div>
            <div className="signup-username">
              <label className="signup-label">Username: </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="signup-input"
              />
            </div>
            <div className="signup-password">
              <label className="signup-label">Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup-input"
              />
            </div>
          </div>
          <div className="signup-buttons">
            <button type="submit" className="signup-button">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
