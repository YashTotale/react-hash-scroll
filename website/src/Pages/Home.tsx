//React Imports
import React from "react";

//Material UI Imports
import { makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  home: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.home}></div>;
};

export default Home;
