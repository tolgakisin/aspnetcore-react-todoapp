import React, { useState } from "react";
import { error } from "jquery";
import Auth from "../stores/Auth.js";
import { useHistory, Link } from "react-router-dom";
import Helper from "../stores/Helper";

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
    fetch(
      Helper.API_URL + Helper.LOGIN_URL,
      Helper.RequestOptions("POST", JSON.stringify({ username, password }))
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          Auth.removeToken();
          alert("Username or password is wrong.");
          error();
        }
      })
      .then((data) => {
        Auth.setToken(data);
        history.push("/Main");
      })
      .catch((error) => {
        console.log("An error occured", error);
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
