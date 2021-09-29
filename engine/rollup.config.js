import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.tsx",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [typescript(), json()],
};
