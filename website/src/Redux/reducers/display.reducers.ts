import { AnyAction } from "redux";
import { TOGGLE_SIDEBAR } from "../actions";

interface DisplayState {
  isOpen: boolean;
}

const initialDisplayState: DisplayState = {
  isOpen: false,
};

export const displayReducer = (
  state = initialDisplayState,
  action: AnyAction
): DisplayState => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_SIDEBAR: {
      const { isOpen } = payload;
      return { ...state, isOpen: isOpen ?? !state.isOpen };
    }
    default: {
      return state;
    }
  }
};
