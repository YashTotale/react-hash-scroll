import { promisify } from "util";
import { promises } from "fs";
import { join, parse } from "path";
import { exec } from "child_process";

import simpleGit from "simple-git";
import * as moment from "moment";

export const { readFile, writeFile, readdir: readDir } = promises;

export const execute = promisify(exec);

export { join, parse };

export const getChangedDirs = () => {
  return execute("git diff --dirstat=files,0 HEAD | sed -E 's/^[ 0-9.]+% //g'");
};

export const getChangedFiles = () => {
  return git.diff(["--name-only"]);
};

export const getStagedFiles = () => {
  const git = simpleGit(ROOT_DIR);

  return git.diff(["--name-only", "--cached"]);
};

export const gitAdd = (files: string | string[]) => {
  const git = simpleGit(ROOT_DIR);

  return git.add(files);
};

export const today = moment().format("YYYY-MM-DD");
export const PACKAGE_NAME = "react-hash-scroll";
export const PACKAGE_REPO_NAME = "react-hash-scroll";
export const PACKAGE_REPO_OWNER = "YashTotale";
export const ROOT_DIR = join(__dirname, "..");
export const git = simpleGit(ROOT_DIR);
