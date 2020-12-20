//React Imports
import { hot } from "react-hot-loader";
import React, { useEffect } from "react";
import "./markdown.css";

//Redux Imports
import { useDispatch } from "react-redux";
import { getAllDocs } from "./Redux/thunks";

//Page Imports
import Readme from "./Pages/Readme";
import Changelog from "./Pages/Changelog";
import Doc from "./Pages/Doc";
import NotFound from "./Pages/404";

//Component Imports
import Header from "./Components/Header";
import SideBar from "./Components/Sidebar";
import SnackBar from "./Components/Snackbar";

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
    dispatch(getAllDocs());
  });

  return (
    <Router>
      <Theme>
        <Header />
        <SideBar />
        <SnackBar />
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
        <Doc type="components" />
      </Route>
      <Route exact path="/hooks/:id">
        <Doc type="hooks" />
      </Route>
      <Route exact path="/changelog">
        <Changelog />
      </Route>
      <Route exact path="/home">
        <Readme />
      </Route>
      <Route exact path="/readme">
        <Readme />
      </Route>
      <Route exact path="/">
        <Readme />
      </Route>
      <Route exact path="/404">
        <NotFound />
      </Route>
      <Route path="/">
        <NotFound />
      </Route>
    </Switch>
  );
};

//Hot Loader reloads the app when you save changes
export default hot(module)(App);
