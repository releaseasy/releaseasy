import * as v from "valibot";

const configSchema = v.object({
  cwd: v.string(),

  dryRun: v.boolean(),

  verbose: v.pipe(v.number(), v.integer(), v.minValue(0)),

  /**
   * increments
   *
   * 允许：
   * ["patch"]
   * ["patch", "minor"]
   * ["patch", "minor", "major"]
   */
  increments: v.array(
    v.picklist([
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease",
      "release",
    ]),
  ),

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
    addArgs: v.array(v.string()),
    commitArgs: v.array(v.string()),
    tagName: v.string(),

    changelog: v.union([
      v.literal(false),
      v.object({
        output: v.string(),
        configFile: v.string(),
        args: v.string(),
      }),
    ]),
  }),

  // hooks
  hooks: v.optional(
    v.record(
      v.picklist([
        "before:init",
        "before:changelog",
        "after:changelog",
        "before:bump",
        "after:bump",
        "after:release",
      ]),
      v.union([v.string(), v.array(v.string())]),
    ),
  ),
});

export type Config = v.InferOutput<typeof configSchema>;

export function validateConfig(config: unknown): Config {
  try {
    return v.parse(configSchema, config, {
      abortEarly: true,
    });
  } catch (error: unknown) {
    if (error instanceof v.ValiError) {
      throw new Error(formatConfigError(error), {
        cause: error,
      });
    }

    throw error;
  }
}

function formatConfigError(error: v.ValiError<typeof configSchema>): string {
  const issues = flattenIssues(error);
  const issue = mergeUnionIssues(issues);

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

type ConfigIssue = v.BaseIssue<unknown> & {
  path: PropertyKey[];
};

function flattenIssues(
  error: v.ValiError<typeof configSchema>,
  parentPath: PropertyKey[] = [],
): ConfigIssue[] {
  const result: ConfigIssue[] = [];

  for (const issue of error.issues) {
    const currentPath = [...parentPath, ...(issue.path ?? []).map((item) => item.key)];

    if (issue.issues) {
      result.push(...flattenIssues(issue as v.ValiError, currentPath));
    } else {
      result.push({
        ...issue,
        path: currentPath,
      });
    }
  }

  return result;
}

function mergeUnionIssues(issues: ConfigIssue[]): ConfigIssue {
  const issue = issues.at(-1);

  if (!issue) {
    throw new Error("Expected at least one validation issue.");
  }

  const matched = issues.filter(
    (item) => item.path.join(".") === issue.path.join(".") && item.received === issue.received,
  );

  if (matched.length === 1) {
    return issue;
  }

  return {
    ...issue,
    expected: matched.map((item) => item.expected).join(" | "),
  };
}
