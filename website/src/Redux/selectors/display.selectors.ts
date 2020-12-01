import { State } from "../reducers";

export const getIsSideBarOpen = (state: State) => state.display.isOpen;
