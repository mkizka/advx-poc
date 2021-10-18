import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: {
    dir: "dist",
    format: "esm",
  },
  external: Object.keys(pkg.dependencies),
  plugins: [typescript(), json()],
};
