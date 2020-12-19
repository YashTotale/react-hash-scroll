import { Octokit } from "@octokit/rest";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { State } from "../reducers";
import { Components, DocType, DOC_TYPES } from "../reducers/docs.reducers";
import {
  loadDocsError,
  setSnackbarMessage,
  loadDocsInProgress,
  loadDocsSuccess,
} from "../actions";
import {
  getIsChangelogError,
  getIsComponentsError,
  getIsReadmeError,
  getLastChangelogUpdate,
  getLastComponentsUpdate,
  getLastReadmeUpdate,
} from "../selectors";
import { capitalize } from "@material-ui/core";

export const getAllDocs = () => async (
  dispatch: Dispatch<AnyAction | ThunkAction<void, State, any, any>>,
  getState: () => State
) => {
  try {
    const getDiff = (lastUpdated: number) => {
      const current = new Date().getTime();
      const last = new Date(lastUpdated).getTime();

      const diff = current - last;

      return diff / (1000 * 60 * 60);
    };

    const lastComponentsUpdate = getLastComponentsUpdate(getState());
    const lastReadmeUpdate = getLastReadmeUpdate(getState());
    const lastChangelogUpdate = getLastChangelogUpdate(getState());

    if (!lastComponentsUpdate || getDiff(lastComponentsUpdate) > 24)
      dispatch(getComponentsRequest());

    if (!lastReadmeUpdate || getDiff(lastReadmeUpdate) > 24)
      dispatch(getDocs("readme"));

    if (!lastChangelogUpdate || getDiff(lastChangelogUpdate) > 24)
      dispatch(getDocs("changelog"));
  } catch (e) {
    dispatch(
      loadDocsError(null, "Docs could not be fetched. Please try again")
    );
  }
};

export const getDocs = (docType: DocType) => async (
  dispatch: Dispatch<AnyAction | ThunkAction<void, State, any, any>>,
  getState: () => State
) => {
  try {
    if (docType === "components") {
      return dispatch(getComponentsRequest());
    }
    dispatch(loadDocsInProgress(docType));

    const octokit = new Octokit();

    const { data } = await octokit.repos.getContent({
      owner: "YashTotale",
      repo: "react-hash-scroll",
      path: docType === "readme" ? "README.md" : "CHANGELOG.md",
    });

    const res = await fetch(data.download_url);
    const text = await res.text();
    const docs = await markdownToHtml(text);

    dispatch(loadDocsSuccess(docType, docs));
  } catch (e) {
    dispatch(
      loadDocsError(
        docType,
        `${capitalize(docType)} could not be fetched. Please try again`
      )
    );
  }
};

const getComponentsRequest = () => async (
  dispatch: Dispatch<AnyAction | ThunkAction<void, State, any, any>>,
  getState: () => State
) => {
  try {
    dispatch(loadDocsInProgress("components"));
    const octokit = new Octokit();

    const { data } = await octokit.repos.getContent({
      owner: "YashTotale",
      repo: "react-hash-scroll",
      path: "docs/Components",
    });

    const components: Components = {};

    ((data as unknown) as typeof data[]).forEach(async (component) => {
      const { name, download_url } = component;

      const res = await fetch(download_url);
      const text = await res.text();

      const html = await markdownToHtml(text);

      const id = name.slice(0, -3);

      components[id] = {
        text: html,
        url: id.toLowerCase(),
      };
    });

    dispatch(loadDocsSuccess("components", components));
  } catch (e) {
    dispatch(
      loadDocsError(
        "components",
        "Components could not be fetched. Please try again"
      )
    );
  }
};

export const onDemandDataRequest = (page: DocType | null) => async (
  dispatch: Dispatch<AnyAction | ThunkAction<void, State, any, any>>,
  getState: () => State
) => {
  if (page === null)
    return DOC_TYPES.forEach((docType) => onDemandDataRequest(docType));

  const { docRequest, getLastUpdate, isError } = getFuncsForDocType(page);

  try {
    const lastUpdated = getLastUpdate(getState());

    if (lastUpdated) {
      const current = new Date().getTime();
      const last = new Date(lastUpdated).getTime();

      const diff = current - last;

      const diffInMinutes = diff / (1000 * 60);

      if (diffInMinutes < 10 && !isError(getState())) {
        throw new Error(
          `Please wait at least 10 minutes between requests (${(
            10 - diffInMinutes
          ).toFixed(2)} remaining)`
        );
      }

      dispatch(docRequest);
    }
  } catch (e) {
    dispatch(setSnackbarMessage(e.message, "error"));
  }
};

const markdownToHtml = async (md: string) => {
  const octokit = new Octokit();

  const { data } = await octokit.markdown.render({
    text: md,
    mode: "gfm",
    context: "YashTotale/react-hash-scroll",
    mediaType: { format: "html" },
  });

  return data;
};

const getFuncsForDocType = (docType: DocType) => {
  switch (docType) {
    case "readme": {
      return {
        getLastUpdate: getLastReadmeUpdate,
        docRequest: getDocs("readme"),
        isError: getIsReadmeError,
      };
    }
    case "components": {
      return {
        getLastUpdate: getLastComponentsUpdate,
        docRequest: getDocs("components"),
        isError: getIsComponentsError,
      };
    }
    case "changelog": {
      return {
        getLastUpdate: getLastChangelogUpdate,
        docRequest: getDocs("changelog"),
        isError: getIsChangelogError,
      };
    }
  }
};
