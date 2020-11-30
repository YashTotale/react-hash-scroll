// React Imports
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

// Material UI Imports
import { makeStyles, AppBar, Toolbar, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "center",
  },
}));

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();

  return (
    <AppBar elevation={2} color="transparent" position="static">
      <Toolbar className={classes.toolbar}></Toolbar>
    </AppBar>
  );
};

export default Header;
