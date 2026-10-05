import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./test/setup.ts"],
    clearMocks: true,
    environment: "node",
    include: ["test/**/*.test.ts"],
    coverage: {
      include: ["src/**/*.ts"],
      exclude: [...configDefaults.exclude, "src/run.ts"],
      provider: "v8",
    },
  },
});
