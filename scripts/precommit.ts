import { promises } from "fs";
import { join } from "path";

import { JSDOM } from "jsdom";
import * as marked from "marked";
import * as moment from "moment";

import * as pkg from "../package.json";

const { readFile } = promises;

const root = join(__dirname, "..");

const changelogDest = join(root, "CHANGELOG.md");

const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

const getChangelog = async () => {
  const str = await readFile(changelogDest, "utf-8");

  return marked(str, { headerIds: true, gfm: true });
};

const getNextVersions = () => {
  const currentVersion = pkg.version;

  const match = currentVersion.match(semverRegex) as RegExpMatchArray;

  const major = parseInt(match[1]),
    minor = parseInt(match[2]),
    patch = parseInt(match[3]);

  return [
    `${major + 1}.0.0`,
    `${major}.${minor + 1}.0`,
    `${major}.${minor}.${patch + 1}`,
  ];
};

const createDom = (changelog: string) => {
  const dom = new JSDOM(changelog);

  const window = dom.window;

  const document = window.document;

  return { dom, window, document };
};

const precommit = async () => {
  try {
    const changelog = await getChangelog();

    const versions = getNextVersions();

    const { document } = createDom(changelog);

    const mostRecent = document.getElementsByTagName("h2").item(1)?.innerHTML;

    if (versions.find((v) => mostRecent?.includes(v)) === undefined) {
      throw new Error(
        "Please update the CHANGELOG with the next planned release"
      );
    }

    const date = mostRecent?.match(/\((.*)\)/)?.[1];

    const today = moment().format("YYYY-MM-DD");

    if (date !== today) {
      throw new Error(
        "Please update the upcoming release in the CHANGELOG with today's date"
      );
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

precommit();
