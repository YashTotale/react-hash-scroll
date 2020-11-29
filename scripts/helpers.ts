import { promisify } from "util";
import { promises } from "fs";
import { join } from "path";
import { exec } from "child_process";
import * as moment from "moment";

export const { readFile } = promises;

export const execute = promisify(exec);

export { join };

export const today = moment().format("YYYY-MM-DD");
export const PACKAGE_NAME = "react-hash-scroll";
export const PACKAGE_REPO_NAME = "react-hash-scroll";
export const PACKAGE_REPO_OWNER = "YashTotale";
export const ROOT_DIR = join(__dirname, "..");
