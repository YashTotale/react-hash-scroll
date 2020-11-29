import * as dotenv from "dotenv-safe";
import { Octokit } from "@octokit/rest";
import * as pkg from "../package.json";

import {
  PACKAGE_REPO_NAME,
  PACKAGE_REPO_OWNER,
  readFile,
  join,
  ROOT_DIR,
  today,
} from "./helpers";

dotenv.config();

const getChangeLogSection = async (version: string) => {
  const str = await readFile(join(ROOT_DIR, "CHANGELOG.md"), "utf-8");

  const sectionTitle = `## [${version}] - (${today})`;

  const titleIndex = str.indexOf(sectionTitle);

  if (titleIndex < 0) return "";

  const endIndex = str.indexOf("---", titleIndex);

  if (endIndex < 0) return "";

  const section = str.substring(titleIndex, endIndex).trim();

  return section;
};

const postversion = async () => {
  try {
    const { repos } = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const { data } = await repos.getLatestRelease({
      owner: PACKAGE_REPO_OWNER,
      repo: PACKAGE_REPO_NAME,
    });

    const version = `v${pkg.version}`;

    await repos.updateRelease({
      owner: PACKAGE_REPO_OWNER,
      repo: PACKAGE_REPO_NAME,
      release_id: data.id,
      name: version,
      tag_name: version,
      body: await getChangeLogSection(version),
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

postversion();
