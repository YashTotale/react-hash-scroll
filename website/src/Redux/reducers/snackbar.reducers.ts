import { AnyAction } from "redux";
import {
  SET_SNACKBAR_MESSAGE,
  HANDLE_SNACKBAR_CLOSE,
  LOAD_COMPONENTS_ERROR,
  LOAD_README_ERROR,
  LOAD_CHANGELOG_ERROR,
  LOAD_DOCS_ERROR,
} from "../actions";
import { Color } from "@material-ui/lab";

export interface SnackbarState {
  isOpen: boolean;
  message: string;
  severity: Color;
}

export const initialSnackbarState: SnackbarState = {
  isOpen: false,
  message: "",
  severity: "info",
};

export const snackbarReducer = (
  state = initialSnackbarState,
  action: AnyAction
): SnackbarState => {
  const { type, payload } = action;
  switch (type) {
    case SET_SNACKBAR_MESSAGE: {
      const { message, severity } = payload;
      return { ...state, message, severity, isOpen: true };
    }
    case HANDLE_SNACKBAR_CLOSE: {
      return { ...state, isOpen: false };
    }
    case LOAD_COMPONENTS_ERROR:
    case LOAD_README_ERROR:
    case LOAD_CHANGELOG_ERROR:
    case LOAD_DOCS_ERROR: {
      const { error } = payload;
      return {
        ...state,
        isOpen: true,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Error",
        severity: "error",
      };
    }
    default: {
      return state;
    }
  }
};
