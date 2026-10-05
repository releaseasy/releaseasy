import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["dist/**", "coverage/**", "vendor/**", "test/snapshots/**", "test/unit/**"],
  plugins: ["typescript", "unicorn", "oxc"],
  categories: {
    correctness: "error",
    suspicious: "warn",
  },
  rules: {
    "unicorn/no-empty-file": "off",
    "no-unused-vars": [
      "error",
      {
        fix: {
          imports: "fix",
          variables: "off",
        },
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "no-underscore-dangle": [
      "error",
      {
        allow: ["__dirname", "__filename"],
      },
    ],
  },
  env: {
    builtin: true,
  },
});
