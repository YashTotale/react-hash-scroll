//React Imports
import React from "react";

//Material UI Imports
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  home: {},
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.home}></div>;
};

export default Home;
