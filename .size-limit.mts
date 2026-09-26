import type { SizeLimitConfig } from "size-limit";

export default [
  {
    limit: "0.15KB",
    path: "./dist/index.mjs",
  },
  // {
  //   limit: "5KB",
  //   path: "./dist/cli.js",
  // },
] satisfies SizeLimitConfig;
