import * as v from "valibot";

/** 单个路径片段：属性键，剔除了 symbol */
type PathKey = Extract<PropertyKey, string | number>;

/** 完整路径 */
type Path = PathKey[];

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
  distTags: v.array(v.string()),

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
  hooks: v.exactOptional(
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

/** 从 schema 自动推导的配置输出类型 */
export type Config = v.InferOutput<typeof configSchema>;

/**
 * Valibot issue 的最小结构描述。
 * 我们只关心 path / expected / received / issues，避免依赖 Valibot 内部复杂的联合类型。
 */
interface IssueLike {
  path?: readonly { key: PathKey }[];
  expected?: string;
  received?: string;
  issues?: readonly IssueLike[];
}

/** 展平后供格式化使用的 issue */
interface FlatIssue {
  path: Path;
  expected: string;
  received: string;
}

/** 验证配置，成功时返回类型化的 Config，失败时抛出格式化的错误 */
export function validateConfig(config: unknown): Config {
  try {
    return v.parse(configSchema, config, { abortEarly: true });
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw new Error(formatConfigError(error as unknown as IssueLike), {
        cause: error,
      });
    }
    throw error;
  }
}

function formatConfigError(error: IssueLike): string {
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

/** 递归展平嵌套的 issues，并补全完整路径 */
function flattenIssues(error: IssueLike, parentPath: Path = []): FlatIssue[] {
  const result: FlatIssue[] = [];

  for (const issue of error.issues ?? []) {
    const currentPath: Path = [...parentPath, ...(issue.path ?? []).map((item) => item.key)];

    if (issue.issues && issue.issues.length > 0) {
      result.push(...flattenIssues(issue, currentPath));
    } else {
      result.push({
        path: currentPath,
        expected: issue.expected ?? "unknown",
        received: issue.received ?? "unknown",
      });
    }
  }

  return result;
}

/** 合并同路径的 union 校验错误，将 expected 用 | 连接 */
function mergeUnionIssues(issues: FlatIssue[]): FlatIssue {
  const issue = issues.at(-1);

  if (!issue) {
    throw new Error("No issues to merge");
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
