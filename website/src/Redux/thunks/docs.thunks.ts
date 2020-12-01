import { Octokit } from "@octokit/rest";
import { ReposGetContentResponseData } from "@octokit/types";
import {
  loadDocsError,
  loadChangelogError,
  loadChangelogInProgress,
  loadChangelogSuccess,
  loadComponentsError,
  loadComponentsInProgress,
  loadComponentsSuccess,
  loadReadmeError,
  loadReadmeInProgress,
  loadReadmeSuccess,
} from "../actions";

import { Dispatch } from "react";
import { AnyAction } from "redux";
import { State } from "../reducers";
import { Components } from "../reducers/docs.reducers";
import { ThunkAction } from "redux-thunk";
import {
  getLastChangelogUpdate,
  getLastComponentsUpdate,
  getLastReadmeUpdate,
} from "../selectors";

export const getDocs = () => async (
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
      dispatch(getReadmeRequest());

    if (!lastChangelogUpdate || getDiff(lastChangelogUpdate) > 24)
      dispatch(getChangelogRequest());
  } catch (e) {
    dispatch(loadDocsError("Docs could not be fetched. Please try again"));
  }
};

export const getComponentsRequest = () => async (
  dispatch: Dispatch<AnyAction | ThunkAction<void, State, any, any>>,
  getState: () => State
) => {
  try {
    dispatch(loadComponentsInProgress());
    const octokit = new Octokit();

    const { data: componentsData } = await octokit.repos.getContent({
      owner: "YashTotale",
      repo: "react-hash-scroll",
      path: "docs/Components",
    });

    const components: Components = {};

    for (const component of (componentsData as unknown) as ReposGetContentResponseData[]) {
      const { name, download_url } = component;

      const res = await fetch(download_url);
      const text = await res.text();

      const id = name.slice(0, -3);

      const { data: html } = await octokit.markdown.render({
        text,
        mode: "gfm",
        context: "YashTotale/react-hash-scroll",
        mediaType: { format: "html" },
      });

      components[id] = {
        text: html,
        url: id.toLowerCase(),
      };
    }

    dispatch(loadComponentsSuccess(components));
  } catch (e) {
    dispatch(
      loadComponentsError("Components could not be fetched. Please try again")
    );
  }
};

export const getReadmeRequest = () => async (
  dispatch: Dispatch<AnyAction | ThunkAction<void, State, any, any>>,
  getState: () => State
) => {
  try {
    dispatch(loadReadmeInProgress());
    const octokit = new Octokit();

    const { data: readmeData } = await octokit.repos.getContent({
      owner: "YashTotale",
      repo: "react-hash-scroll",
      path: "README.md",
    });

    const readmeRes = await fetch(readmeData.download_url);
    const readmeText = await readmeRes.text();
    const { data: readme } = await octokit.markdown.render({
      text: readmeText,
      mode: "gfm",
      context: "YashTotale/react-hash-scroll",
      mediaType: { format: "html" },
    });

    dispatch(loadReadmeSuccess(readme));
  } catch (e) {
    dispatch(loadReadmeError("README could not be fetched. Please try again"));
  }
};

export const getChangelogRequest = () => async (
  dispatch: Dispatch<AnyAction | ThunkAction<void, State, any, any>>,
  getState: () => State
) => {
  try {
    dispatch(loadChangelogInProgress());
    const octokit = new Octokit();

    const { data: changelogData } = await octokit.repos.getContent({
      owner: "YashTotale",
      repo: "react-hash-scroll",
      path: "CHANGELOG.md",
    });

    const changelogRes = await fetch(changelogData.download_url);
    const changelogText = await changelogRes.text();
    const { data: changelog } = await octokit.markdown.render({
      text: changelogText,
      mode: "gfm",
      context: "YashTotale/react-hash-scroll",
      mediaType: { format: "html" },
    });

    dispatch(loadChangelogSuccess(changelog));
  } catch (e) {
    dispatch(
      loadChangelogError("Changelog could not be fetched. Please try again")
    );
  }
};

export type Page = "readme" | "changelog" | "components";

export const onDemandDataRequest = (page: Page) => async (
  dispatch: Dispatch<AnyAction | ThunkAction<void, State, any, any>>,
  getState: () => State
) => {
  let getLastUpdate;
  let request;
  let error;
  if (page === "readme") {
    getLastUpdate = getLastReadmeUpdate;
    request = getReadmeRequest;
    error = loadReadmeError;
  } else if (page === "changelog") {
    getLastUpdate = getLastChangelogUpdate;
    request = getChangelogRequest;
    error = loadChangelogError;
  } else {
    getLastUpdate = getLastComponentsUpdate;
    request = getComponentsRequest;
    error = loadComponentsError;
  }
  try {
    const lastUpdated = getLastUpdate(getState());

    if (lastUpdated) {
      const current = new Date().getTime();
      const last = new Date(lastUpdated).getTime();

      const diff = current - last;

      const diffInMinutes = diff / (1000 * 60);

      if (diffInMinutes < 10) {
        throw new Error(
          `Please wait at least 10 minutes between requests (${(
            10 - diffInMinutes
          ).toFixed(2)} remaining)`
        );
      }

      dispatch(request());
    }
  } catch (e) {
    dispatch(error(e));
  }
};
