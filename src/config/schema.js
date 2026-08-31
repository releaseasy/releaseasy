import * as v from "valibot";

/**
 * Release CLI 配置
 */
export const configSchema = v.object({
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
