import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "react-router-dom": "ReactRouterDom",
};

const extensions = [".js", ".ts", ".jsx", ".tsx"];

const defaultPlugins = [
  babel({ exclude: "node_modules/**", extensions }),
  terser(),
];

const config = [
  {
    input: "src/index.tsx",
    output: [
      {
        dir: "dist",
        format: "cjs",
        exports: "named",
        sourcemap: true,
        strict: true,
      },
    ],
    plugins: [...defaultPlugins, typescript()],
    external: Object.keys(globals),
  },
];

export default config;
