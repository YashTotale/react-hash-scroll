// React Imports
import React from "react";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import {
  getIsSnackbarOpen,
  getSnackbarMessage,
  getSnackbarSeverity,
} from "../Redux/selectors";
import { handleSnackbarClose } from "../Redux/actions";

// Material UI Imports
import { Snackbar, SnackbarCloseReason, makeStyles } from "@material-ui/core";
import Alerter from "./Alerter";

const useStyles = makeStyles((theme) => ({
  snackbar: {},
}));

interface SnackBarProps {}

const SnackBar: React.FC<SnackBarProps> = () => {
  const dispatch = useDispatch();

  const handleClose = (
    event: React.SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason !== "clickaway") dispatch(handleSnackbarClose());
  };

  const isOpen = useSelector(getIsSnackbarOpen);
  const message = useSelector(getSnackbarMessage);
  const severity = useSelector(getSnackbarSeverity);

  const classes = useStyles();

  return (
    <Snackbar
      autoHideDuration={3000}
      key={message}
      onClose={handleClose}
      open={isOpen}
      message={message}
      className={classes.snackbar}
    >
      <Alerter variant="filled" severity={severity} onClose={handleClose}>
        {message}
      </Alerter>
    </Snackbar>
  );
};

export default SnackBar;
