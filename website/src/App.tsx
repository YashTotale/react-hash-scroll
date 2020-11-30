//React Imports
import { hot } from "react-hot-loader";
import React, { useEffect } from "react";
import "./markdown.css";

//Redux Imports
import { useDispatch } from "react-redux";
import { getDocsRequest } from "./Redux/thunks";

//Page Imports
import Home from "./Pages/Home";
import Component from "./Pages/Component";
import NotFound from "./Pages/404";

//Component Imports
import Header from "./Components/Header";
import SideBar from "./Components/Sidebar";

//Material UI Imports
import Theme from "./Theme";

//Utils
import { SIDEBAR_WIDTH } from "./Utils/constants";

//Router Imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: SIDEBAR_WIDTH,
    [theme.breakpoints.down("md")]: {
      paddingLeft: "initial",
    },
  },
}));

const App: React.FC = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    console.log("Yay");
    dispatch(getDocsRequest());
  }, [dispatch]);

  return (
    <Router>
      <Theme>
        <Header />
        <SideBar />
        <div className={classes.container}>
          <Routes />
        </div>
      </Theme>
    </Router>
  );
};

const Routes: React.FC = (props) => {
  return (
    <Switch>
      <Route exact path="/components/:id">
        <Component />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/">
        <NotFound />
      </Route>
    </Switch>
  );
};

//Hot Loader reloads the app when you save changes
export default hot(module)(App);
