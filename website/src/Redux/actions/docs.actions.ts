import { Components, DocType } from "../reducers/docs.reducers";

export const LOAD_DOCS_IN_PROGRESS = "LOAD_DOCS_IN_PROGRESS";

export const loadDocsInProgress = (docType: DocType) => ({
  type: LOAD_DOCS_IN_PROGRESS,
  payload: {
    docType,
  },
});

export const LOAD_DOCS_SUCCESS = "LOAD_DOCS_SUCCESS";
export const loadDocsSuccess = (
  docType: DocType,
  docs: string | Components
) => ({
  type: LOAD_DOCS_SUCCESS,
  payload: {
    docType,
    docs,
  },
});

export const LOAD_DOCS_ERROR = "LOAD_DOCS_ERROR";
export const loadDocsError = (docType: DocType | null, error: string) => ({
  type: LOAD_DOCS_ERROR,
  payload: {
    docType,
    error,
  },
});
