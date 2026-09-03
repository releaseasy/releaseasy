import { defineConfig } from "./src/index.js";

export default defineConfig({
  increments: ["patch", "minor", "major"],
  distTags: ["latest", "next"],
  git: {
    requireBranch: "main",
    commitMessage: "release: v${version}",
    tagName: "v${version}",
    changelog: {
      configFile: "cliff.toml",
      args: "--tag ${version}",
    },
  },
});
