import { writeFileSync } from "fs";
import { join } from "path";

const rootDir = join(__dirname, "..");

const cjs = () => {
  const js = `"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./react-hash-scroll.min.js");
} else {
  module.exports = require("./react-hash-scroll.js");
}`;

  writeFileSync(join(rootDir, "cjs", "index.js"), js);
};

switch (process.env.BUILD_ENV) {
  case "cjs": {
    cjs();
    break;
  }
  default: {
    cjs();
  }
}
