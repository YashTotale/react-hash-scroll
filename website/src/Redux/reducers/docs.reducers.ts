import { AnyAction } from "redux";
import mapValues from "lodash.mapvalues";
import {
  LOAD_DOCS_IN_PROGRESS,
  LOAD_DOCS_SUCCESS,
  LOAD_DOCS_ERROR,
} from "../actions";

export interface NestedDoc {
  text: string;
  url: string;
}

export type NestedDocs = Record<string, NestedDoc>;

export type DocType = "components" | "readme" | "changelog" | "hooks";

export const DOC_TYPES: DocType[] = [
  "components",
  "readme",
  "changelog",
  "hooks",
];

type DocsState = {
  info: {
    components: NestedDocs;
    hooks: NestedDocs;
    readme: string;
    changelog: string;
  };
  loading: Record<DocType, boolean>;
  errors: Record<DocType, boolean | string>;
  updates: Record<DocType, number | undefined>;
};

const initialDocsState: DocsState = {
  info: {
    components: {},
    hooks: {},
    readme: "",
    changelog: "",
  },
  loading: {
    components: false,
    hooks: false,
    readme: false,
    changelog: false,
  },
  errors: {
    components: false,
    hooks: false,
    readme: false,
    changelog: false,
  },
  updates: {
    components: undefined,
    hooks: undefined,
    readme: undefined,
    changelog: undefined,
  },
};

export const docsReducer = (
  state = initialDocsState,
  action: AnyAction
): DocsState => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DOCS_IN_PROGRESS: {
      const { docType } = payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [docType]: true,
        },
      };
    }
    case LOAD_DOCS_SUCCESS: {
      const { docType, docs } = payload;
      return {
        ...state,
        info: {
          ...state.info,
          [docType]: docs,
        },
        errors: {
          ...state.errors,
          [docType]: false,
        },
        updates: {
          ...state.updates,
          [docType]: Date.now(),
        },
        loading: {
          ...state.loading,
          [docType]: false,
        },
      };
    }
    case LOAD_DOCS_ERROR: {
      const { docType, error } = payload;
      return {
        ...state,
        errors:
          docType === null
            ? mapValues(state.errors, () => error)
            : {
                ...state.errors,
                [docType]: error,
              },
        loading:
          docType === null
            ? mapValues(state.loading, () => false)
            : {
                ...state.loading,
                [docType]: false,
              },
      };
    }
    default: {
      return state;
    }
  }
};
