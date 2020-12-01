// React Imports
import React, { FC } from "react";

//Redux Imports
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../Redux/actions";
import { onDemandDataRequest } from "../Redux/thunks";

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
import { Cached, Menu } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {},
  refresh: {
    marginLeft: "auto",
  },
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
        <Tooltip title="Get Data">
          <IconButton
            className={classes.refresh}
            onClick={() => dispatch(onDemandDataRequest())}
          >
            <Cached />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
