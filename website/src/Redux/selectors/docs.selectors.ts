import { State } from "../reducers";

export const getComponents = (state: State) => state.docs.components;
export const getReadme = (state: State) => state.docs.readme;
export const getChangelog = (state: State) => state.docs.changelog;
export const getIsDocsLoading = (state: State) => state.docs.isLoading;
export const getIsDocsError = (state: State) => state.docs.isError;
