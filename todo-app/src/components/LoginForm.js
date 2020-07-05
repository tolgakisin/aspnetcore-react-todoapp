import React, { useState } from "react";
import Auth from "../stores/Auth.js";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../services/authService.js";

function LoginForm(props) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    login();
  }

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function login() {
    AuthService.signIn(username, password).then((token) => {
      if (token) {
        Auth.setToken(token);
        history.push("/Main");
      }
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!validateForm()}
        >
          Login
        </button>
      </form>
      <div>
        Don't you have a account? <Link to="/Register">Register</Link>
      </div>
    </div>
  );
}

export default LoginForm;
