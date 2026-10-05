const CLI_NAME = "releaseasy";

const CLIFF_FILE = "cliff.toml";

const VERBOSITY = {
  NORMAL: 0,
  VERBOSE: 1,
  DEBUG: 2,
  TRACE: 3,
} as const;

export type Verbosity = (typeof VERBOSITY)[keyof typeof VERBOSITY];

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
  {
    name: "package.json",
    value: "packageJson",
  },
] as const;

const CHANGELOG_FORMAT_CHOICES = [
  {
    name: "Default",
    value: "default",
  },
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
] as const;

const CONFIG_ACTION = {
  CREATED: "Created",
  UPDATED: "Updated",
} as const;

const PKG_SCRIPTS = {
  release: CLI_NAME,
};

export type ConfigFormat = (typeof CONFIG_FORMAT_CHOICES)[number]["value"];

export type ChangelogFormat = (typeof CHANGELOG_FORMAT_CHOICES)[number]["value"];

export type ConfigAction = (typeof CONFIG_ACTION)[keyof typeof CONFIG_ACTION];

export default {
  CONFIG_ACTION,
  CLI_NAME,
  PKG_SCRIPTS,
  VERBOSITY,
  CONFIG_FORMAT_CHOICES,
  CHANGELOG_FORMAT_CHOICES,
  CLIFF_FILE,
};
