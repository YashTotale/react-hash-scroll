import pkg from "./package.json";

import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "react-router-dom": "ReactRouterDom",
};

const cjs = [
  {
    input: "src/index.tsx",
    output: {
      dir: "cjs",
      format: "cjs",
      sourcemap: true,
      esModule: false,
      entryFileNames: `${pkg.name}.js`,
    },
    plugins: [
      replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
      babel({
        exclude: /node_modules/,
        sourceMaps: true,
        rootMode: "upward",
      }),
      typescript({ declaration: true, declarationDir: "cjs" }),
    ],
    external: Object.keys(globals),
  },
  {
    input: "src/index.tsx",
    output: {
      file: `cjs/${pkg.name}.min.js`,
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      babel({
        exclude: /node_modules/,
        sourceMaps: true,
        rootMode: "upward",
      }),
      typescript(),
      terser(),
    ],
    external: Object.keys(globals),
  },
];

const createConfig = () => {
  switch (process.env.BUILD_ENV) {
    case "cjs": {
      return [...cjs];
    }
    default: {
      return [...cjs];
    }
  }
};

export default createConfig();
