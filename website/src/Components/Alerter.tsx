// React Imports
import React, { FC } from "react";
import { alternativeFont } from "../Theme";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/core";
import {} from "@material-ui/icons";
import { Alert, AlertProps } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  alert: {
    fontFamily: alternativeFont,
    fontWeight: 600,
  },
}));

interface AlerterProps extends AlertProps {}

const Alerter: FC<AlerterProps> = (props) => {
  const classes = useStyles();
  return (
    <Alert
      {...props}
      classes={{
        message: classes.alert,
      }}
    ></Alert>
  );
};

export default Alerter;
