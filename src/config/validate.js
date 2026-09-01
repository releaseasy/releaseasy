import * as v from "valibot";

const configSchema = v.object({
  cwd: v.string(),

  dryRun: v.boolean(),

  verbose: v.number([v.integer(), v.minValue(0)]),
  /**
   * increments
   *
   * 允许：
   * ["patch"]
   * ["patch", "minor"]
   * ["patch", "minor", "major"]
   */
  increments: v.array(v.picklist(["patch", "minor", "major"])),

  /**
   * distTags
   *
   * 例如：
   * ["latest", "next"]
   */
  distTags: v.optional(v.array(v.string())),

  git: v.object({
    /**
     * git.requireBranch
     *
     * 支持：
     * false
     * "main"
     * ["main", "develop"]
     * /^(main|develop)$/
     */
    requireBranch: v.union([v.literal(false), v.string(), v.array(v.string()), v.instance(RegExp)]),

    commitMessage: v.string(),

    commitArgs: v.array(v.string()),

    tagName: v.string(),

    /**
     * git.changelog
     *
     * false
     *
     * 或：
     *
     * {
     *   configFile: "cliff.toml",
     *   args: "-o --tag ${version}"
     * }
     */
    changelog: v.union([
      v.literal(false),
      v.object({
        configFile: v.string(),
        args: v.string(),
      }),
    ]),
  }),
});

export function validateConfig(config) {
  try {
    return v.parse(configSchema, config);
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw new Error(formatConfigError(error));
    }

    throw error;
  }
}

function getIssuePath(issue) {
  return (
    issue.path
      ?.map((item) => item.key)
      .filter((key) => key !== undefined)
      .map((key) => (typeof key === "number" ? `[${key}]` : key))
      .join(".") || "<root>"
  );
}

function formatValue(value) {
  if (value === undefined) {
    return "undefined";
  }

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "function") {
    return "[Function]";
  }

  try {
    return JSON.stringify(value);
  } catch {
    return `[${typeof value}]`;
  }
}

function formatConfigError(error) {
  const messages = error.issues.map((issue) => {
    const path = getIssuePath(issue);

    return [
      `  ${path}`,
      "",
      `  Expected: ${issue.expected}`,
      `  Received: ${formatValue(issue.input)} (${issue.received})`,
    ].join("\n");
  });

  return `Invalid configuration\n\n${messages.join("\n\n")}`;
}
