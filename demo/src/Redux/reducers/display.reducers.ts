import { AnyAction } from "redux";
import { TOGGLE_DARK_MODE } from "../actions";

export interface DisplayState {
  isDarkMode: boolean | null;
}

export const initialDisplayState: DisplayState = {
  isDarkMode: null,
};

export const displayReducer = (
  state = initialDisplayState,
  action: AnyAction
): DisplayState => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_DARK_MODE: {
      const { isDarkMode } = payload;
      return { ...state, isDarkMode: isDarkMode ?? !state.isDarkMode };
    }
    default: {
      return state;
    }
  }
};
