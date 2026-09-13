/** @type { import('releaseasy').UserConfig } */
module.exports = {
  increments: ["patch", "minor", "major"],
  distTags: ["latest", "next"],
  git: {
    changelog: {
      output: "CHANGELOG.md",
      configFile: "cliff.toml",
      args: "--tag ${version}",
    },
  },
};
