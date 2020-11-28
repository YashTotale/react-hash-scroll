import { exec } from "child_process";
import { promisify } from "util";

const execute = promisify(exec);

const remover = async (dir: string | string[]) => {
  const dirs = Array.isArray(dir) ? dir.join(" ") : dir;

  const { stdout } = await execute(`rm -rf ${dirs}`);

  if (stdout.trim().length) console.log(stdout);
};

const prebuild = async () => {
  try {
    switch (process.env.BUILD_ENV) {
      case "cjs": {
        await remover("cjs");
        break;
      }
      case "umd": {
        await remover("umd");
        break;
      }
      default: {
        await remover(["cjs", "umd"]);
      }
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

prebuild();
