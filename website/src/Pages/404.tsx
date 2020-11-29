// React Imports
import React, { FC } from "react";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import {} from "@material-ui/icons";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  notFound: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10vh",
  },
  heading: {
    fontFamily: "Cabin, 'sans-serif'",
    letterSpacing: 3,
    textTransform: "uppercase",
    fontSize: "2rem",
  },
  "404": {
    fontFamily: "Montserrat, 'sans-serif'",
    fontSize: "12rem",
    fontWeight: 900,
    letterSpacing: -40,
  },
  subheading: {
    fontFamily: "Cabin, 'sans-serif'",
    fontSize: "3rem",
  },
  number: {
    textShadow: `-8px 0px 0px ${
      theme.palette.common[theme.palette.type === "dark" ? "black" : "white"]
    }`,
  },
  homeBtn: {
    margin: "10px auto",
  },
}));

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState<string | null>(null);

  if (redirect !== null) return <Redirect to={redirect} />;

  return (
    <div className={classes.notFound}>
      <Typography align="center" variant="h3" className={classes.heading}>
        Oops! Page not found
      </Typography>
      <Typography align="center" variant="h1" className={classes["404"]}>
        <Number>4</Number>
        <Number>0</Number>
        <Number>4</Number>
      </Typography>
      <Typography variant="h2" align="center" className={classes.subheading}>
        The page you requested was not found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setRedirect("home")}
        className={classes.homeBtn}
      >
        Go to Home
      </Button>
    </div>
  );
};

const Number: FC = ({ children }) => {
  const classes = useStyles();
  return <span className={classes.number}>{children}</span>;
};

export default NotFound;
