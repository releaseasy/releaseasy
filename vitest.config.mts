import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    environment: "node",
    include: ["test/**/*.test.ts"],
    coverage: {
      include: ["src/**/*.ts"],
      exclude: [...configDefaults.exclude],
      provider: "v8",
    },
  },
});
