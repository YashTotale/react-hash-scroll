import { Components } from "../reducers/docs.reducers";

export const LOAD_DOCS_IN_PROGRESS = "LOAD_DOCS_IN_PROGRESS";
export const loadDocsInProgress = () => ({
  type: LOAD_DOCS_IN_PROGRESS,
  payload: {},
});

export const LOAD_DOCS_SUCCESS = "LOAD_DOCS_SUCCESS";
export const loadDocsSuccess = (
  components: Components,
  readme: string,
  changelog: string
) => ({
  type: LOAD_DOCS_SUCCESS,
  payload: {
    components,
    readme,
    changelog,
  },
});

export const LOAD_DOCS_ERROR = "LOAD_DOCS_ERROR";
export const loadDocsError = (error: string) => ({
  type: LOAD_DOCS_ERROR,
  payload: { error },
});
