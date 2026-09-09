import type { UserConfig } from "releaseasy";

export default {
  increments: ["patch", "minor", "major"],
  distTags: ["latest", "next"],
  git: {
    changelog: {
      args: "--tag ${version}",
    },
  },
} satisfies UserConfig;
