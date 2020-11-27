import { DisplayState } from "./display.reducers";

export { displayReducer as display } from "./display.reducers";

export interface State {
  display: DisplayState;
}
