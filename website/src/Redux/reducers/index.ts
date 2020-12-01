import { DisplayState } from "./display.reducers";
import { DocsState } from "./docs.reducers";
import { SnackbarState } from "./snackbar.reducers";

export { displayReducer as display } from "./display.reducers";
export { docsReducer as docs } from "./docs.reducers";
export { snackbarReducer as snackbar } from "./snackbar.reducers";

export interface State {
  display: DisplayState;
  docs: DocsState;
  snackbar: SnackbarState;
}
