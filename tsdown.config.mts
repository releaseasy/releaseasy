import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/{index,cli}.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  minify: false,
  clean: true,
});
