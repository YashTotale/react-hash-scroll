// React Imports
import React, { FC } from "react";

// Redux Imports
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../Redux/actions";

// Material UI Imports
import {
  makeStyles,
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import { Brightness7, Brightness4 } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "flex-end",
  },
}));

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const isDarkMode = theme.palette.type === "dark";

  return (
    <AppBar elevation={2} color="transparent" position="static">
      <Toolbar className={classes.toolbar}>
        <Tooltip title={`Toggle ${isDarkMode ? "Light" : "Dark"} Theme`}>
          <IconButton
            onClick={() => {
              dispatch(toggleDarkMode());
            }}
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
