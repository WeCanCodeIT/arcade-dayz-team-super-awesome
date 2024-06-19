import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useCookies } from "react-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    setLoading(true);
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
        alert(data);
        setCookie("user", username);
        navigate(`/HomePage`);
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      alert("Error logging in");
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
        <div className=".login-title">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="username">
            <label className="login-label">Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </div>
          <div className="password">
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>
          <div className="login-buttons">
            <button type="submit" disabled={loading} className="login-button">
              {loading ? "Logging in..." : "Login"}
            </button>
            <button onClick={handleSignup} className="signup-button">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
