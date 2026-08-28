import { defineConfig } from "rolldown";
import pkg from "./package.json" with { type: "json" };
import { copyFiles } from "rolldown-plugin-copy-files";

const externalDeps = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.optionalDependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]);

function isExternal(id) {
  return [...externalDeps].some((dep) => id === dep || id.startsWith(`${dep}/`));
}

export default defineConfig({
  input: {
    index: "src/index.js",
    cli: "src/cli.js",
  },

  platform: "node",

  output: {
    dir: "dist",
    format: "esm",
  },

  external: isExternal,
  plugins: [
    copyFiles({
      targets: [
        {
          src: "src/*.d.ts",
          dest: "dist",
          options: { up: 1 },
        },
      ],
    }),
  ],
});
