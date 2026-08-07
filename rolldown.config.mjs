import { defineConfig } from "rolldown";
import pkg from "./package.json" with { type: "json" };

const deps = Object.keys(pkg.dependencies ?? {});

// const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  input: {
    index: "src/index.js",
    cli: "src/cli.js",
  },

  platform: "node",

  transform: {
    target: "node20",
  },

  output: {
    dir: "dist",
    format: "esm",
  },

  external(id) {
    return deps.some((dep) => id === dep || id.startsWith(dep + "/"));
  },
});
