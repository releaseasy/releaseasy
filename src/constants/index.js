const CLI_NAME = "releaseasy";

const VARIABLE_RE = /\$\{([^}]+)\}/g;

const DEFAULTS = {
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

export default { DEFAULTS, CLI_NAME, VARIABLE_RE };
