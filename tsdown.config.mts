import path from "node:path";
import { fileURLToPath } from "node:url";

import { copyFiles } from "rolldown-plugin-copy-files";
import { defineConfig } from "tsdown";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: ["./src/{index,cli}.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  minify: false,
  clean: true,
  plugins: [
    copyFiles({
      targets: [
        {
          src: "src/init/templates",
          dest: "dist",
          options: { up: 2 },
        },
      ],
    }),
  ],
  alias: {
    "@": path.resolve(__dirname, "src"),
  },
});
