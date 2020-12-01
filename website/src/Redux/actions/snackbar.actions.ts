import { Color } from "@material-ui/lab";

export const SET_SNACKBAR_MESSAGE = "SET_SNACKBAR_MESSAGE";
export const setSnackbarMessage = (message: string, severity: Color) => ({
  type: SET_SNACKBAR_MESSAGE,
  payload: { message, severity },
});

export const HANDLE_SNACKBAR_CLOSE = "HANDLE_SNACKBAR_CLOSE";
export const handleSnackbarClose = () => ({
  type: HANDLE_SNACKBAR_CLOSE,
  payload: {},
});
