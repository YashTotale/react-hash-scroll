import { State } from "../reducers";

export const getComponents = (state: State) => state.docs.info.components;
export const getReadme = (state: State) => state.docs.info.readme;
export const getChangelog = (state: State) => state.docs.info.changelog;

export const getIsComponentsLoading = (state: State) =>
  state.docs.loading.components;
export const getIsReadmeLoading = (state: State) => state.docs.loading.readme;
export const getIsChangelogLoading = (state: State) =>
  state.docs.loading.changelog;

export const getIsComponentsError = (state: State) =>
  state.docs.errors.components;
export const getIsReadmeError = (state: State) => state.docs.errors.readme;
export const getIsChangelogError = (state: State) =>
  state.docs.errors.changelog;

export const getLastComponentsUpdate = (state: State) =>
  state.docs.updates.components;
export const getLastReadmeUpdate = (state: State) => state.docs.updates.readme;
export const getLastChangelogUpdate = (state: State) =>
  state.docs.updates.changelog;
