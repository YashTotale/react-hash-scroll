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

const alternativeFont = "Arial, sans-serif";

const Theme: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const isDarkMode = useSelector(getIsDarkMode);

  if (isDarkMode === null && prefersDarkMode) {
    dispatch(toggleDarkMode(prefersDarkMode));
  }

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        arrow: {
          color: "rgb(0, 0, 0, 0.76)",
        },
        tooltip: {
          fontFamily: alternativeFont,
          fontWeight: 600,
          fontSize: "0.72rem",
          backgroundColor: "rgb(0, 0, 0, 0.76)",
        },
      },
      MuiButton: {
        label: {
          fontFamily: alternativeFont,
          fontWeight: 500,
        },
      },
    },
    palette: {
      type: isDarkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: "Palatino, Georgia, Serif",
      fontWeightBold: 600,
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
