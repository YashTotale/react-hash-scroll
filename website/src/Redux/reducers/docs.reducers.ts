import { AnyAction } from "redux";
import {
  LOAD_DOCS_IN_PROGRESS,
  LOAD_DOCS_SUCCESS,
  LOAD_DOCS_ERROR,
} from "../actions";

import { ReposGetContentResponseData } from "@octokit/types";

export type DocsState = {
  docs?: ReposGetContentResponseData;
  isLoading: boolean;
  isError: boolean;
};

export const initialDocsState: DocsState = {
  isLoading: false,
  isError: false,
};

export const docsReducer = (
  state = initialDocsState,
  action: AnyAction
): DocsState => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DOCS_IN_PROGRESS: {
      return { ...state, isLoading: true };
    }
    case LOAD_DOCS_SUCCESS: {
      const { docs } = payload;
      return { ...state, docs, isLoading: false };
    }
    case LOAD_DOCS_ERROR: {
      return { ...state, isError: true, isLoading: false };
    }
    default: {
      return state;
    }
  }
};
