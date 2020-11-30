import { ReposGetContentResponseData } from "@octokit/types";

export const LOAD_DOCS_IN_PROGRESS = "LOAD_DOCS_IN_PROGRESS";
export const loadDocsInProgress = () => ({
  type: LOAD_DOCS_IN_PROGRESS,
  payload: {},
});

export const LOAD_DOCS_SUCCESS = "LOAD_DOCS_SUCCESS";
export const loadDocsSuccess = (docs: ReposGetContentResponseData) => ({
  type: LOAD_DOCS_SUCCESS,
  payload: {
    docs,
  },
});

export const LOAD_DOCS_ERROR = "LOAD_DOCS_ERROR";
export const loadDocsError = () => ({
  type: LOAD_DOCS_ERROR,
  payload: {},
});
