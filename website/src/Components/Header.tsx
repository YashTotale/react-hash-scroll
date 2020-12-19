// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";

//Redux Imports
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../Redux/actions";
import { onDemandDataRequest } from "../Redux/thunks";
import { DocType } from "../Redux/reducers/docs.reducers";

// Material UI Imports
import {
  makeStyles,
  AppBar,
  Toolbar,
  useMediaQuery,
  Theme,
  Tooltip,
  IconButton,
  capitalize,
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

  const { pathname } = useLocation();

  const root = pathname.split("/")[1];

  let page: DocType | null = null;

  if (root === "readme" || root === "home" || root === "") page = "readme";
  else if (root === "components") page = "components";
  else if (root === "changelog") page = "changelog";

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
        {page && (
          <Tooltip title={`Get Data${page && ` - ${capitalize(page)}`}`}>
            <IconButton
              className={classes.refresh}
              onClick={() => {
                dispatch(onDemandDataRequest(page));
              }}
            >
              <Cached />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
