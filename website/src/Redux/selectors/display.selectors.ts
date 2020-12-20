import { RootState } from "../reducers";

export const getIsSideBarOpen = (state: RootState) => state.display.isOpen;
