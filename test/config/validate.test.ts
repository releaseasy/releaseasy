import { describe, expect, it } from "vitest";

import type { InlineConfig } from "../../src/config/types.ts";
import { validateConfig } from "../../src/config/validate.ts";

const validConfig = {
  cwd: process.cwd(),
  dryRun: false,
  verbose: 0,

  increments: ["patch", "minor", "major"],

  distTags: ["latest", "next"],

  git: {
    requireBranch: "main",
    commitMessage: "release",
    addArgs: ["."],
    commitArgs: ["-m"],
    tagName: "v${version}",

    changelog: {
      output: "CHANGELOG.md",
      configFile: "cliff.toml",
      args: "",
    },
  },
} satisfies InlineConfig;

describe("validateConfig", () => {
  it("应该校验有效配置", () => {
    expect(validateConfig(validConfig)).toEqual(validConfig);
  });

  it("应该拒绝无效的 verbose 配置", () => {
    expect(() =>
      validateConfig({
        ...validConfig,
        verbose: -1,
      } satisfies InlineConfig),
    ).toThrow(/Invalid configuration/);
  });

  it("应该拒绝无效的版本递增类型", () => {
    expect(() =>
      validateConfig({
        ...validConfig,
        // @ts-expect-error: 测试非法版本类型
        increments: ["xxx"],
      } satisfies InlineConfig),
    ).toThrow(/Invalid configuration/);
  });

  it("应该支持 requireBranch 设置为 false", () => {
    expect(
      validateConfig({
        ...validConfig,
        git: {
          ...validConfig.git,
          requireBranch: false,
        },
      } satisfies InlineConfig).git.requireBranch,
    ).toBe(false);
  });

  it("应该支持使用正则表达式匹配分支", () => {
    expect(
      validateConfig({
        ...validConfig,

        git: {
          ...validConfig.git,
          requireBranch: /main/,
        },
      } satisfies InlineConfig).git.requireBranch,
    ).toEqual(/main/);
  });

  it("应该支持禁用变更日志生成", () => {
    const result = validateConfig({
      ...validConfig,

      git: {
        ...validConfig.git,
        changelog: false,
      },
    } satisfies InlineConfig);

    expect(result.git.changelog).toBe(false);
  });

  it("应该格式化嵌套配置错误路径", () => {
    expect(() =>
      validateConfig({
        ...validConfig,

        git: {
          ...validConfig.git,
          // @ts-expect-error: 测试非法的git的提交信息类型
          commitMessage: 123,
        },
      } satisfies InlineConfig),
    ).toThrow(/git.commitMessage/);
  });
});
