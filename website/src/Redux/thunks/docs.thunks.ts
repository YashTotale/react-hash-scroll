import { Octokit } from "@octokit/rest";
import { ReposGetContentResponseData } from "@octokit/types";
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

    const { data: componentsData } = await octokit.repos.getContent({
      owner: "YashTotale",
      repo: "react-hash-scroll",
      path: "docs/Components",
    });

    const components: string[] = [];

    for (const component of (componentsData as unknown) as ReposGetContentResponseData[]) {
      const res = await fetch(component.download_url);
      const text = await res.text();
      components.push(text);
    }

    const { data: readmeData } = await octokit.repos.getContent({
      owner: "YashTotale",
      repo: "react-hash-scroll",
      path: "README.md",
    });

    const { data: changelogData } = await octokit.repos.getContent({
      owner: "YashTotale",
      repo: "react-hash-scroll",
      path: "CHANGELOG.md",
    });

    const readmeRes = await fetch(readmeData.download_url);
    const readmeText = await readmeRes.text();
    const { data: readme } = await octokit.markdown.render({
      text: readmeText,
      mode: "gfm",
      context: "YashTotale/react-hash-scroll",
      mediaType: { format: "html" },
    });

    const changelogRes = await fetch(changelogData.download_url);
    const changelogText = await changelogRes.text();
    const { data: changelog } = await octokit.markdown.render({
      text: changelogText,
      mode: "gfm",
      context: "YashTotale/react-hash-scroll",
      mediaType: { format: "html" },
    });

    dispatch(loadDocsSuccess(components, readme, changelog));
  } catch (e) {
    dispatch(loadDocsError());
  }
};
