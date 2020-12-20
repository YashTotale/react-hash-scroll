import { RootState } from "../reducers";

export const getSnackbarMessage = (state: RootState) => state.snackbar.message;

export const getIsSnackbarOpen = (state: RootState) => state.snackbar.isOpen;

export const getSnackbarSeverity = (state: RootState) =>
  state.snackbar.severity;
