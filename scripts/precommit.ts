import { JSDOM } from "jsdom";
import * as marked from "marked";

import * as pkg from "../package.json";
import {
  readFile,
  ROOT_DIR,
  today,
  readDir,
  join,
  parse,
  writeFile,
  gitAdd,
  getStagedFiles,
} from "./helpers";

const changelogDest = join(ROOT_DIR, "CHANGELOG.md");

const readmeDest = join(ROOT_DIR, "README.md");

const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

const getChangelog = async () => {
  const str = await readFile(changelogDest, "utf-8");

  return marked(str, { headerIds: true, gfm: true });
};

const getReadme = () => {
  return readFile(readmeDest, "utf-8");
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

const checkChangelog = async () => {
  try {
    const errors: string[] = [];

    const changelog = await getChangelog();

    const versions = getNextVersions();

    const { document } = createDom(changelog);

    const mostRecent = document.getElementsByTagName("h2").item(1)?.innerHTML;

    if (versions.find((v) => mostRecent?.includes(v)) === undefined)
      errors.push("Please update the CHANGELOG with the next planned release");

    const date = mostRecent?.match(/\((.*)\)/)?.[1];

    if (date !== today)
      errors.push(
        "Please update the upcoming release in the CHANGELOG with today's date"
      );

    const mostRecentTOC = document.getElementsByTagName("a").item(3)?.innerHTML;

    if (versions.find((v) => mostRecentTOC?.includes(v)) === undefined)
      errors.push(
        "Please update the CHANGELOG Table of Contents with the next planned release"
      );

    const dateTOC = mostRecentTOC?.match(/\((.*)\)/)?.[1];

    if (dateTOC !== today)
      errors.push(
        "Please update the upcoming release in the CHANGELOG Table of Contents with today's date"
      );

    if (errors.length) throw errors;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const checkReadme = async () => {
  try {
    const errors: string[] = [];

    const staged = await getStagedFiles();

    const docsDir = join(ROOT_DIR, "docs");

    const componentsPath = "docs/Components/";

    if (staged.includes(componentsPath)) {
      const componentsDir = join(docsDir, "Components");

      const files = await readDir(join(componentsDir));

      for (const file of files) {
        if (staged.includes(`${componentsPath}${file}`)) {
          const readme = await getReadme();

          const titleIndex = readme.indexOf(`### ${parse(file).name}`);

          const endIndex = readme.indexOf("---", titleIndex);

          const fileContents = await readFile(
            join(componentsDir, file),
            "utf-8"
          );

          const newReadme =
            readme.substring(0, titleIndex) +
            fileContents +
            "\n" +
            readme.substring(endIndex);

          await writeFile(readmeDest, newReadme);
        }
      }
      await gitAdd(readmeDest);
    }

    if (errors.length) throw errors;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const precommit = async () => {
  try {
    checkChangelog();
    checkReadme();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

precommit();
