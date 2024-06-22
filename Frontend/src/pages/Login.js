import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useCookies } from "react-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Please enter both username and password");
      setHasError(true);
      return;
    }
    setLoading(true);
    setMessage(""); 
    setHasError(false);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.text();
        setMessage(data); 
        setCookie("user", username);
        navigate(`/HomePage`);
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`); 
        setHasError(true);
      }
    } catch (error) {
      setMessage("Error logging in"); 
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-title">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="username">
            <label className="login-label">Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`login-input ${hasError ? 'error' : ''}`}
            />
          </div>
          <div className="password">
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`login-input ${hasError ? 'error' : ''}`}
            />
          </div>
          {message && <div className="err-message">{message}</div>} 
          <div className="login-buttons">
            <button type="submit" disabled={loading} className="login-button">
              {loading ? "Logging in..." : "Login"}
            </button>
            <button type="button" onClick={handleSignup} className="signup-button">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
