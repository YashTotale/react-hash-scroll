//React Imports
import { hot } from "react-hot-loader";
import React from "react";
import Home from "./Pages/Home";

//Material UI Imports
import Theme from "./Theme";

//Router Imports
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = (props) => {
  return (
    <Router>
      <Theme>
        <Routes />
      </Theme>
    </Router>
  );
};

const Routes: React.FC = (props) => {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

//Hot Loader reloads the app when you save changes
export default hot(module)(App);
