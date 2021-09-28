import typescript from "rollup-plugin-typescript2";
import cleaner from "rollup-plugin-cleaner";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.tsx",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    cleaner({
      targets: ["dist"],
    }),
    typescript(),
    json(),
  ],
};
