import { DisplayState } from "./display.reducers";
import { DocsState } from "./docs.reducers";

export { displayReducer as display } from "./display.reducers";
export { docsReducer as docs } from "./docs.reducers";

export interface State {
  display: DisplayState;
  docs: DocsState;
}
