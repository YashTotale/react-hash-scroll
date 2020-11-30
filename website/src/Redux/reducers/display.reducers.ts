import { AnyAction } from "redux";

export interface DisplayState {}

export const initialDisplayState: DisplayState = {};

export const displayReducer = (
  state = initialDisplayState,
  action: AnyAction
): DisplayState => {
  const { type } = action;
  switch (type) {
    default: {
      return state;
    }
  }
};
