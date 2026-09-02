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
    return v.parse(configSchema, config, { abortEarly: true });
  } catch (error) {
    if (error instanceof v.ValiError) {
      // throw new Error(formatConfigError(error));
      throw new Error(v.summarize(error.issues));
    }
    throw error;
  }
}

function flattenIssues(error, parentPath = []) {
  const result = [];

  for (const issue of error.issues) {
    const currentPath = [...parentPath, ...(issue.path ?? []).map((item) => item.key)];

    if (issue.issues) {
      result.push(...flattenIssues(issue, currentPath));
    } else {
      result.push({
        ...issue,
        path: currentPath,
      });
    }
  }
  return result;
}

function formatConfigError(error) {
  const issues = flattenIssues(error);

  console.log(issues);

  const issue = issues.at(-1);

  const path = issue.path.join(".");

  return [
    "Invalid configuration",
    "",
    `  ${path}`,
    "",
    `  Expected: ${issue.expected}`,
    `  Received: ${issue.received}`,
  ].join("\n");
}
