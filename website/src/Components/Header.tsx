// React Imports
import React, { FC } from "react";

//Redux Imports
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../Redux/actions";

// Material UI Imports
import {
  makeStyles,
  AppBar,
  Toolbar,
  useMediaQuery,
  Theme,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {},
}));

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSizeSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <AppBar elevation={2} color="transparent" position="static">
      <Toolbar className={classes.toolbar}>
        {isSizeSmall && (
          <Tooltip title="Toggle Sidebar">
            <IconButton onClick={() => dispatch(toggleSidebar())}>
              <Menu />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
