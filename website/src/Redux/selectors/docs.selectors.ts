import { RootState } from "../reducers";

export const getComponents = (state: RootState) => state.docs.info.components;
export const getHooks = (state: RootState) => state.docs.info.hooks;
export const getReadme = (state: RootState) => state.docs.info.readme;
export const getChangelog = (state: RootState) => state.docs.info.changelog;

export const getIsComponentsLoading = (state: RootState) =>
  state.docs.loading.components;
export const getIsHooksLoading = (state: RootState) => state.docs.loading.hooks;
export const getIsReadmeLoading = (state: RootState) =>
  state.docs.loading.readme;
export const getIsChangelogLoading = (state: RootState) =>
  state.docs.loading.changelog;

export const getIsComponentsError = (state: RootState) =>
  state.docs.errors.components;
export const getIsHooksError = (state: RootState) => state.docs.errors.hooks;
export const getIsReadmeError = (state: RootState) => state.docs.errors.readme;
export const getIsChangelogError = (state: RootState) =>
  state.docs.errors.changelog;

export const getLastComponentsUpdate = (state: RootState) =>
  state.docs.updates.components;
export const getLastHooksUpdate = (state: RootState) =>
  state.docs.updates.hooks;
export const getLastReadmeUpdate = (state: RootState) =>
  state.docs.updates.readme;
export const getLastChangelogUpdate = (state: RootState) =>
  state.docs.updates.changelog;
