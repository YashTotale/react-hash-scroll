//React Imports
import React from "react";

//Material UI Imports
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

const alternativeFont = "Arial, sans-serif";

const Theme: React.FC = ({ children }) => {
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
      type: "light",
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
