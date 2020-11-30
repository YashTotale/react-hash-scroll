export const LOAD_DOCS_IN_PROGRESS = "LOAD_DOCS_IN_PROGRESS";
export const loadDocsInProgress = () => ({
  type: LOAD_DOCS_IN_PROGRESS,
  payload: {},
});

export const LOAD_DOCS_SUCCESS = "LOAD_DOCS_SUCCESS";
export const loadDocsSuccess = (
  components: string[],
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
export const loadDocsError = () => ({
  type: LOAD_DOCS_ERROR,
  payload: {},
});
