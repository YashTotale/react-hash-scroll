// React Imports
import React, { FC } from "react";

// Material UI Imports
import { makeStyles, AppBar, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "flex-end",
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
