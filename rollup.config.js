import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "react-router-dom": "ReactRouterDom",
};

const extensions = [".js", ".ts", ".jsx", ".tsx"];

const defaultTS = {
  declaration: true,
  noEmitOnError: true,
};

const cjs = [
  {
    input: "src/index.tsx",
    output: {
      dir: "cjs",
      format: "cjs",
      exports: "named",
      sourcemap: true,
      entryFileNames: "react-hash-scroll.js",
    },
    plugins: [
      replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
      babel({ exclude: "node_modules/**", sourceMaps: true, extensions }),
      typescript({ ...defaultTS, declarationDir: "cjs" }),
    ],
    external: Object.keys(globals),
  },
  {
    input: "src/index.tsx",
    output: {
      file: "cjs/react-hash-scroll.min.js",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    plugins: [
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      babel({ exclude: "node_modules/**", sourceMaps: true, extensions }),
      typescript({ ...defaultTS, declaration: false }),
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
