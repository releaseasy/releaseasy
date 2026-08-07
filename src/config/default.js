export const defaultConfig = {
  increments: ["patch", "minor", "major"],
  distTags: ["latest", "next"],
  git: {
    requireBranch: "main",
    commitMessage: "release: v${version}",
    tagName: "v${version}",
    changelog: {
      configFile: "cliff.toml",
      extraArgs: "-o --tag ${version}",
    },
  },
};
