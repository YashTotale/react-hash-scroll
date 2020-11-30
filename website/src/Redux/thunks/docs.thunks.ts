import { Octokit } from "@octokit/rest";
import { loadDocsError, loadDocsSuccess, loadDocsInProgress } from "../actions";

import { Dispatch } from "react";
import { AnyAction } from "redux";
import { State } from "../reducers";

export const getDocsRequest = () => async (
  dispatch: Dispatch<AnyAction>,
  getState: () => State
) => {
  try {
    dispatch(loadDocsInProgress());
    const octokit = new Octokit();

    const { data } = await octokit.repos.getContent({
      owner: "YashTotale",
      repo: "react-hash-scroll",
      path: "docs",
    });

    dispatch(loadDocsSuccess(data));
  } catch (e) {
    dispatch(loadDocsError());
  }
};
