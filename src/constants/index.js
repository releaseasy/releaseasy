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
      args: "-o --tag ${version}",
    },
  },
};

const LOG_LEVEL = {
  NORMAL: 0,
  VERBOSE: 1,
  DEBUG: 2,
};

export default { DEFAULTS, CLI_NAME, VARIABLE_RE, LOG_LEVEL };
