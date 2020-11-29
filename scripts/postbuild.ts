import { join, execute, ROOT_DIR, writeFile } from "./helpers";

const cjs = async () => {
  try {
    const dir = join(ROOT_DIR, "cjs");

    await writeFile(
      join(dir, "index.js"),
      "'use strict';\n\nif (process.env.NODE_ENV === 'production') {\n  module.exports = require('./react-hash-scroll.min.js');" +
        "\n} else {\n  module.exports = require('./react-hash-scroll.js');\n}"
    );

    const { stdout } = await execute(
      `rm ${join(dir, "Utils", "messages.d.ts")}`
    );

    console.log(stdout);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const postbuild = async () => {
  switch (process.env.BUILD_ENV) {
    case "cjs": {
      await cjs();
      break;
    }
    case "umd": {
      break;
    }
    default: {
      cjs();
    }
  }
};

postbuild();
