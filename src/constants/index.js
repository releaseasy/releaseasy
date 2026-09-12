const CLI_NAME = "releaseasy";

const VARIABLE_RE = /\$\{([^}]+)\}/g;

const DEFAULTS = {
  increments: ["patch", "minor", "major"],
  distTags: ["latest", "next"],
  git: {
    requireBranch: "main",
    commitMessage: "release: v${version}",
    addArgs: ["."],
    commitArgs: ["-s"],
    tagName: "v${version}",
    changelog: {
      output: "CHANGELOG.md",
      configFile: "cliff.toml",
      args: "--tag ${version}",
    },
  },
};

const LOG_LEVEL = {
  NORMAL: 0,
  VERBOSE: 1,
  DEBUG: 2,
};

const CLIFF_FILE = "cliff.toml";

const CONFIG_FORMAT_CHOICES = [
  {
    name: "JavaScript",
    value: "javascript",
  },
  {
    name: "TypeScript",
    value: "typescript",
  },
  {
    name: "JSON",
    value: "json",
  },
];

const CHANGELOG_FORMAT_CHOICES = [
  {
    name: "Keep a Changelog",
    value: "keepachangelog",
  },
  {
    name: "GitHub",
    value: "github",
  },
  {
    name: "GitHub Keep a Changelog",
    value: "github-keepachangelog",
  },
  {
    name: "GitLab",
    value: "gitlab",
  },
  {
    name: "GitLab Keep a Changelog",
    value: "gitlab-keepachangelog",
  },
  {
    name: "Detailed",
    value: "detailed",
  },
  {
    name: "Minimal",
    value: "minimal",
  },
  {
    name: "Scoped",
    value: "scoped",
  },
  {
    name: "Scope Sorted",
    value: "scopesorted",
  },
  {
    name: "Cocogitto",
    value: "cocogitto",
  },
  {
    name: "Unconventional",
    value: "unconventional",
  },
];

const DEFAULT_SCRIPTS = {
  release: CLI_NAME,
};

export default {
  DEFAULT_SCRIPTS,
  DEFAULTS,
  CLI_NAME,
  VARIABLE_RE,
  LOG_LEVEL,
  CONFIG_FORMAT_CHOICES,
  CHANGELOG_FORMAT_CHOICES,
  CLIFF_FILE,
};
