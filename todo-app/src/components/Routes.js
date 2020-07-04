import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import AuthService from "../services/authService";
import Login from "./Login";
import MainPage from "./MainPage";
import Register from "./Register";
import Error from "./Error";

const RouteResult = {
  Login: () => <Login />,
  MainPage: () => <MainPage />,
  Register: () => <Register />,
  Error: () => <Error />,
};

function Routes() {
  return (
    <Router>
      <Switch>
        <LoginLayouts exact={true} path="/" Component={RouteResult.Login} />
        <LoginLayouts
          exact={true}
          path="/Register"
          Component={RouteResult.Register}
        />
        <ProtectedLayouts path="/Main" Component={RouteResult.MainPage} />
        <Route path="*">{RouteResult.Error}</Route>
      </Switch>
    </Router>
  );
}

const ProtectedLayouts = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.isSignedIn() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

const LoginLayouts = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.isSignedIn() === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/Main", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default Routes;
