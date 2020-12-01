import { State } from "../reducers";

export const getComponents = (state: State) => state.docs.components;
export const getReadme = (state: State) => state.docs.readme;
export const getChangelog = (state: State) => state.docs.changelog;

export const getAreComponentsLoading = (state: State) =>
  state.docs.areComponentsLoading;
export const getIsReadmeLoading = (state: State) => state.docs.isReadmeLoading;
export const getIsChangelogLoading = (state: State) =>
  state.docs.isReadmeLoading;

export const getIsComponentsError = (state: State) =>
  state.docs.isComponentsError;
export const getIsReadmeError = (state: State) => state.docs.isReadmeError;
export const getIsChangelogError = (state: State) =>
  state.docs.isChangelogError;

export const getLastComponentsUpdate = (state: State) =>
  state.docs.lastComponentsUpdate;
export const getLastReadmeUpdate = (state: State) =>
  state.docs.lastReadmeUpdate;
export const getLastChangelogUpdate = (state: State) =>
  state.docs.lastChangelogUpdate;
