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
  execute,
} from "./helpers";

const postcommit = async () => {
  try {
    if ((await getBranches()).current.includes("main")) {
      const { stdout } = await getFilesChangedInCommit("HEAD");

      const docsDir = join(ROOT_DIR, "docs");

      const componentsPath = "docs/Components/";

      if (stdout.includes(componentsPath)) {
        const rootGit = simpleGit(ROOT_DIR);

        const wikiPath = join(ROOT_DIR, "wiki");

        await rootGit.clone(
          "https://github.com/YashTotale/react-hash-scroll.wiki.git",
          wikiPath
        );

        const git = simpleGit(wikiPath);

        const componentsDir = join(docsDir, "Components");

        const files = await readDir(join(componentsDir));

        const replacements = [
          "behavior",
          "position",
          "requiredpathname",
          "scrollfunc",
        ];

        for (const file of files) {
          if (stdout.includes(`${componentsPath}${file}`)) {
            let fileContents = await readFile(
              join(componentsDir, file),
              "utf-8"
            );
            if (parse(file).name !== "ReusedProps") {
              replacements.forEach((r) => {
                fileContents = fileContents.replace(
                  new RegExp(`(#${r})`, "g"),
                  `https://github.com/YashTotale/react-hash-scroll/wiki/ReusedProps#${r}`
                );
              });
            }
            await writeFile(join(wikiPath, file), fileContents);
          }
        }

        git.add(wikiPath);
        git.commit("Changes");
        git.push();

        await execute(`rm -rf ${wikiPath}`);
      }
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

postcommit();
