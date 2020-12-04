import simpleGit from "simple-git";
import {
  getFilesChangedInCommit,
  ROOT_DIR,
  join,
  readDir,
  readFile,
  parse,
  writeFile,
  getBranches,
  remove,
} from "./helpers";

const postcommit = async () => {
  try {
    if ((await getBranches()).current.includes("main")) {
      const { stdout: changed } = await getFilesChangedInCommit("HEAD");

      const docsDir = join(ROOT_DIR, "docs");

      const docsPath = "docs/";

      const replacements = [
        "behavior",
        "position",
        "requiredpathname",
        "scrollfunc",
      ];

      if (changed.includes(docsPath)) {
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
          const path = docsPath + name;

          if (changed.includes(path)) {
            if (isFile) await buildFile(name, docsDir);
            else {
              const dir = join(docsDir, name);

              const files = await readDir(dir);

              for (const file of files) {
                if (changed.includes(`${path}/${file}`)) {
                  await buildFile(file, dir);
                }
              }
            }
          }
        };

        await buildWiki("Components");

        await buildWiki("Hooks");

        await buildWiki("ReusedProps.md", true);

        await git.add(wikiPath);
        await git.commit("Changes");
        await git.push();

        await remove(wikiPath);
      }
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

postcommit();
