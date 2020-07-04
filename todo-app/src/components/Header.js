import React from "react";
import AuthService from "../services/authService.js";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();

  function logout() {
    AuthService.signOut();
    history.push("/");
  }

  return (
    <div>
      <ul>
        {!AuthService.isSignedIn() ? (
          <li>
            <Link to="/">Sign In</Link>
          </li>
        ) : (
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
