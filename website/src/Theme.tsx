//React Imports
import React from "react";

//Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { getIsDarkMode } from "./Redux/selectors";
import { toggleDarkMode } from "./Redux/actions";

//Material UI Imports
import {
  createMuiTheme,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
} from "@material-ui/core";

const Theme: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDarkMode = useSelector(getIsDarkMode);
  if (isDarkMode === null && prefersDarkMode) {
    dispatch(toggleDarkMode(prefersDarkMode));
  }
  const theme = createMuiTheme({
    palette: {
      type: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
