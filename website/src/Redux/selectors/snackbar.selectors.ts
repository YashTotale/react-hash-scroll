import { State } from "../reducers";

export const getSnackbarMessage = (state: State) => state.snackbar.message;

export const getIsSnackbarOpen = (state: State) => state.snackbar.isOpen;

export const getSnackbarSeverity = (state: State) => state.snackbar.severity;
