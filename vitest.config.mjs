import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    environment: "node",
    include: ["test/**/*.test.js"],
    coverage: {
      include: ["src/**/*.js"],
      exclude: [...configDefaults.exclude],
      provider: "v8",
    },
  },
});
