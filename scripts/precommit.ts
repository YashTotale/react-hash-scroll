import { JSDOM } from "jsdom";
import marked from "marked";
import axios from "axios";

import pkg from "../package.json";
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

const getNextVersions = async () => {
  try {
    const { data } = await axios.get(
      "http://registry.npmjs.org/-/package/react-hash-scroll/dist-tags"
    );

    const currentVersion = data.latest ?? pkg.version;

    const match = currentVersion.match(semverRegex) as RegExpMatchArray;

    const major = parseInt(match[1]),
      minor = parseInt(match[2]),
      patch = parseInt(match[3]);

    return [
      `${major + 1}.0.0`,
      `${major}.${minor + 1}.0`,
      `${major}.${minor}.${patch + 1}`,
    ];
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
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

    const versions = await getNextVersions();

    const { document } = createDom(changelog);

    const mostRecentHeading = document.getElementsByTagName("h2").item(1);

    const mostRecentSubheadings: string[] = [];

    let nextSibling: Element | null | undefined = mostRecentHeading;

    while (true) {
      nextSibling = nextSibling?.nextElementSibling;
      const tag = nextSibling?.tagName;
      if (tag === "H2") break;
      if (tag !== "H3") continue;

      mostRecentSubheadings.push(nextSibling?.innerHTML ?? "");
    }

    const mostRecentTOC = document.getElementsByTagName("li").item(1);

    const mostRecentTOCLink = mostRecentTOC
      ?.getElementsByTagName?.("a")
      ?.item?.(0);

    const mostRecentTOCChildren = Array.from(
      mostRecentTOC?.getElementsByTagName("ul")?.item(0)?.children ?? []
    );

    const mostRecentHeadingTitle = mostRecentHeading?.innerHTML;

    if (versions.find((v) => mostRecentHeadingTitle?.includes(v)) === undefined)
      errors.push("Please update the CHANGELOG with the next planned release");

    const date = mostRecentHeadingTitle?.match(/\((.*)\)/)?.[1];

    if (date !== today)
      errors.push(
        "Please update the upcoming release in the CHANGELOG with today's date"
      );

    const mostRecentTOCTitle = mostRecentTOCLink?.innerHTML;

    if (versions.find((v) => mostRecentTOCTitle?.includes(v)) === undefined)
      errors.push(
        "Please update the CHANGELOG Table of Contents with the next planned release"
      );

    const dateTOC = mostRecentTOCTitle?.match(/\((.*)\)/)?.[1];

    if (dateTOC !== today)
      errors.push(
        "Please update the upcoming release in the CHANGELOG Table of Contents with today's date"
      );

    mostRecentSubheadings.forEach((heading, i) => {
      const child = mostRecentTOCChildren[i];
      const name = child?.getElementsByTagName("a")?.item(0)?.innerHTML;

      if (name !== heading) {
        errors.push(
          `Please update the Changelog Table of Contents with subsection "${heading}" of the next planned release`
        );
      }
    });

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

    const docsPath = "docs/";

    if (staged.includes(docsPath)) {
      const buildFile = async (file: string, dir: string, hashCount = 3) => {
        const readme = await getReadme();

        const hashes = "#".repeat(hashCount);

        let titleIndex = readme.indexOf(`${hashes} ${parse(file).name}`);

        if (titleIndex < 0)
          titleIndex = readme.indexOf(
            `${hashes} ${parse(file)
              .name.match(/[A-Z][a-z]+|[0-9]+/g)
              ?.join(" ")}`
          );

        const endIndex = readme.indexOf("---", titleIndex);

        const fileContents = await readFile(join(dir, file), "utf-8");

        const newReadme =
          readme.substring(0, titleIndex) +
          fileContents +
          "\n" +
          readme.substring(endIndex);

        await writeFile(readmeDest, newReadme);
      };
      const buildReadme = async (name: string, isFile?: boolean) => {
        const path = docsPath + name;

        if (staged.includes(path)) {
          if (isFile) await buildFile(name, docsDir, 2);
          else {
            const dir = join(docsDir, name);

            const files = await readDir(dir);

            for (const file of files) {
              if (staged.includes(`${path}/${file}`)) {
                await buildFile(file, dir);
              }
            }
          }
        }
      };

      await buildReadme("Components");

      await buildReadme("Hooks");

      await buildReadme("ReusedProps.md", true);

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
