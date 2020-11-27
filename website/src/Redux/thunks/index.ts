//Redux Thunks

/*

Example:

import { Dispatch } from "react";
import { RootStateOrAny } from "react-redux";
import { AnyAction } from "redux";

export const testThunk = () => async (
  dispatch: Dispatch<AnyAction>,
  getState: () => RootStateOrAny
) => {
  try {
    dispatch(aLoadingAction());
    const response = await fetch(aURL);
    const json = await response.json();
    dispatch(aSuccessAction(json));
  } catch (e) {
    dispatch(aFailureAction(e));
  }
};

*/

export {};
