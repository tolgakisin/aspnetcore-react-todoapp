import React, { useState } from "react";
import Helper from "../stores/Helper";
import { useHistory, Link } from "react-router-dom";

function RegisterForm(props) {
  const history = useHistory();

  const [fields, setFields] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegistered, setIsRegistered] = useState("");
  const [isExist, setIsExist] = useState(false);

  function validateForm() {
    return (
      fields.username.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFields({
      username: "",
      password: "",
      confirmPassword: "",
    });
    setIsRegistered("");
    setIsExist(false);

    fetch(
      Helper.API_URL + Helper.REGISTER_URL,
      Helper.RequestOptions(
        "POST",
        JSON.stringify({ Username: fields.username, Password: fields.password })
      )
    )
      .then((response) => {
        if (response.status === 200) {
          setIsRegistered(true);
          setTimeout(() => {
            history.push("/");
          }, 2000);
        } else if (response.status === 409) {
          setIsExist(true);
        } else {
          setIsRegistered(false);
        }
      })
      .catch((error) => alert("An unexpected error occured."));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div>
      {isRegistered === true && (
        <div className="alert alert-success">
          You have registered successfully. You are redirecting to login page in
          2 seconds.
        </div>
      )}

      {isRegistered === false && (
        <div className="alert alert-danger">
          An error occured. Please try again later.
        </div>
      )}

      {isExist === true && (
        <div className="alert alert-danger">The username is exist.</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={fields.username}
            onChange={handleChange}
            name="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            value={fields.password}
            onChange={handleChange}
            name="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Enter Password Again"
            value={fields.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!validateForm()}
        >
          Register
        </button>
      </form>
      <div>
        Already registered? <Link to="/">Sign in</Link>
      </div>
    </div>
  );
}

export default RegisterForm;
