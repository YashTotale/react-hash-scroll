import simpleGit from "simple-git";
import { ROOT_DIR, join, readDir, readFile, parse, writeFile } from "./helpers";

const buildWiki = async () => {
  const docsDir = join(ROOT_DIR, "docs");

  const wikiPath = join(ROOT_DIR, "wiki");

  const replacements = [
    "behavior",
    "position",
    "requiredpathname",
    "scrollfunc",
  ];

  try {
    const rootGit = simpleGit(ROOT_DIR);

    await rootGit.clone(
      "git@github.com:YashTotale/react-hash-scroll.wiki.git",
      wikiPath
    );

    const buildFile = async (file: string, dir: string) => {
      let fileContents = await readFile(join(dir, file), "utf-8");
      if (parse(file).name !== "ReusedProps") {
        replacements.forEach((r) => {
          fileContents = fileContents.replace(
            new RegExp(`(#${r})`, "g"),
            `https://github.com/YashTotale/react-hash-scroll/wiki/ReusedProps#${r}`
          );
        });
      }
      await writeFile(join(wikiPath, file), fileContents);
    };

    const buildWiki = async (name: string, isFile?: boolean) => {
      if (isFile) await buildFile(name, docsDir);
      else {
        const dir = join(docsDir, name);

        const files = await readDir(dir);

        await Promise.all(files.map((file) => buildFile(file, dir)));
      }
    };

    await Promise.all([
      buildWiki("Components"),
      buildWiki("Hooks"),
      buildWiki("ReusedProps.md", true),
    ]);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

buildWiki();
