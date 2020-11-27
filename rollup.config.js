import pkg from "./package.json";

import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "react-router-dom": "ReactRouterDOM",
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
      babel({
        exclude: /node_modules/,
        sourceMaps: true,
        rootMode: "upward",
      }),
      nodeResolve(),
      typescript({ declaration: true, declarationDir: "cjs" }),
      replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
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
      babel({
        exclude: /node_modules/,
        sourceMaps: true,
        rootMode: "upward",
      }),
      nodeResolve(),
      typescript(),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      terser(),
    ],
    external: Object.keys(globals),
  },
];

const umd = [
  {
    input: "src/index.tsx",
    output: {
      file: `umd/${pkg.name}.js`,
      format: "umd",
      name: "ReactHashScroll",
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        exclude: /node_modules/,
        babelHelpers: "runtime",
        plugins: [["@babel/transform-runtime", { useESModules: true }]],
        rootMode: "upward",
      }),
      nodeResolve(),
      typescript({ sourceMap: false }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],
  },
  {
    input: "src/index.tsx",
    output: {
      file: `umd/${pkg.name}.min.js`,
      format: "umd",
      name: "ReactHashScroll",
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        exclude: /node_modules/,
        babelHelpers: "runtime",
        plugins: [["@babel/transform-runtime", { useESModules: true }]],
        rootMode: "upward",
      }),
      typescript({ sourceMap: false }),
      nodeResolve(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      terser(),
    ],
  },
];

const createConfig = () => {
  switch (process.env.BUILD_ENV) {
    case "cjs": {
      return [...cjs];
    }
    case "umd": {
      return [...umd];
    }
    default: {
      return [...cjs, ...umd];
    }
  }
};

export default createConfig();
