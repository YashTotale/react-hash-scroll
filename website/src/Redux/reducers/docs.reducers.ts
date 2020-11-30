import { AnyAction } from "redux";
import {
  LOAD_DOCS_IN_PROGRESS,
  LOAD_DOCS_SUCCESS,
  LOAD_DOCS_ERROR,
} from "../actions";

export interface Component {
  text: string;
  url: string;
}

export type Components = Record<string, Component>;

export type DocsState = {
  components?: Components;
  readme?: string;
  changelog?: string;
  isLoading: boolean;
  isError: boolean;
  lastUpdated?: number;
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
      return { ...state, isLoading: true, isError: false };
    }
    case LOAD_DOCS_SUCCESS: {
      const { components, readme, changelog } = payload;
      return {
        ...state,
        components,
        readme,
        changelog,
        isLoading: false,
        isError: false,
        lastUpdated: Date.now(),
      };
    }
    case LOAD_DOCS_ERROR: {
      return { ...state, isError: true, isLoading: false };
    }
    default: {
      return state;
    }
  }
};
