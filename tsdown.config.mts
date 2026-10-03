import { copyFiles } from "rolldown-plugin-copy-files";
import { defineConfig } from "tsdown";

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
});
