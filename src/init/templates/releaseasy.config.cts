import type { UserConfig } from "releaseasy";

module.exports = {
  increments: ["patch", "minor", "major"],
  distTags: ["latest", "next"],
  git: {
    changelog: {
      args: "--tag ${version}",
    },
  },
} satisfies UserConfig;
