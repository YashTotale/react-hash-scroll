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
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  alert: {},
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
    >
      <Alert
        className={classes.alert}
        variant="filled"
        severity={severity}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
