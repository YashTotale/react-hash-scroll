import { State } from "../reducers";

export const getDocs = (state: State) => state.docs.docs;
export const getIsDocsLoading = (state: State) => state.docs.isLoading;
export const getIsDocsError = (state: State) => state.docs.isError;
