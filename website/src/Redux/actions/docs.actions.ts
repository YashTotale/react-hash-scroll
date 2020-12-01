import { Components } from "../reducers/docs.reducers";

export const LOAD_COMPONENTS_IN_PROGRESS = "LOAD_COMPONENTS_IN_PROGRESS";
export const loadComponentsInProgress = () => ({
  type: LOAD_COMPONENTS_IN_PROGRESS,
  payload: {},
});

export const LOAD_README_IN_PROGRESS = "LOAD_README_IN_PROGRESS";
export const loadReadmeInProgress = () => ({
  type: LOAD_README_IN_PROGRESS,
  payload: {},
});

export const LOAD_CHANGELOG_IN_PROGRESS = "LOAD_CHANGELOG_IN_PROGRESS";
export const loadChangelogInProgress = () => ({
  type: LOAD_CHANGELOG_IN_PROGRESS,
  payload: {},
});

export const LOAD_COMPONENTS_SUCCESS = "LOAD_COMPONENTS_SUCCESS";
export const loadComponentsSuccess = (components: Components) => ({
  type: LOAD_COMPONENTS_SUCCESS,
  payload: {
    components,
  },
});

export const LOAD_README_SUCCESS = "LOAD_README_SUCCESS";
export const loadReadmeSuccess = (readme: string) => ({
  type: LOAD_README_SUCCESS,
  payload: {
    readme,
  },
});

export const LOAD_CHANGELOG_SUCCESS = "LOAD_CHANGELOG_SUCCESS";
export const loadChangelogSuccess = (changelog: string) => ({
  type: LOAD_CHANGELOG_SUCCESS,
  payload: {
    changelog,
  },
});

export const LOAD_DOCS_ERROR = "LOAD_DOCS_ERROR";
export const loadDocsError = (error: string) => ({
  type: LOAD_DOCS_ERROR,
  payload: { error },
});

export const LOAD_COMPONENTS_ERROR = "LOAD_COMPONENTS_ERROR";
export const loadComponentsError = (error: string) => ({
  type: LOAD_COMPONENTS_ERROR,
  payload: { error },
});

export const LOAD_README_ERROR = "LOAD_README_ERROR";
export const loadReadmeError = (error: string) => ({
  type: LOAD_README_ERROR,
  payload: { error },
});

export const LOAD_CHANGELOG_ERROR = "LOAD_CHANGELOG_ERROR";
export const loadChangelogError = (error: string) => ({
  type: LOAD_CHANGELOG_ERROR,
  payload: { error },
});
