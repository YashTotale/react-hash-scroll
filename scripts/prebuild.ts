import { exec } from "child_process";

const remover = (dir: string | string[]) => {
  const dirs = Array.isArray(dir) ? dir.join(" ") : dir;

  exec(`rm -rf ${dirs}`, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
      process.exit(1);
    }
    if (stdout.trim().length) console.log(stdout);
  });
};

switch (process.env.BUILD_ENV) {
  case "cjs": {
    remover("cjs");
    break;
  }
  case "umd": {
    remover("umd");
    break;
  }
  default: {
    remover(["cjs", "umd"]);
  }
}
