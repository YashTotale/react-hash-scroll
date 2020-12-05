import simpleGit from "simple-git";
import {
  ROOT_DIR,
  join,
  readDir,
  readFile,
  parse,
  writeFile,
  remove,
} from "./helpers";

const buildWiki = async () => {
  try {
    const docsDir = join(ROOT_DIR, "docs");

    const replacements = [
      "behavior",
      "position",
      "requiredpathname",
      "scrollfunc",
    ];

    const wikiPath = join(ROOT_DIR, "wiki");

    const rootGit = simpleGit(ROOT_DIR);

    await rootGit.clone(
      "https://github.com/YashTotale/react-hash-scroll.wiki.git",
      wikiPath
    );

    const git = simpleGit(wikiPath);

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

    await git.add(wikiPath);
    await git.addConfig("user.name", "Yash Totale");
    await git.addConfig("user.email", "totaleyash@gmail.com");
    await git.commit("Changes");
    await git.push();

    await remove(wikiPath);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

buildWiki();
