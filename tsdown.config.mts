import { copyFiles } from "rolldown-plugin-copy-files";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/{index,run}.ts"],
  format: ["esm"],
  dts: {
    compilerOptions: {
      stripInternal: true,
    },
  },
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
