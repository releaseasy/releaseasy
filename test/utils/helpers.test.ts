import { describe, expect, it, vi } from "vitest";

import {
  formatDuration,
  hasVerbosity,
  isChangelogEnabled,
  runSideEffect,
  logCommand,
  isPackageInstalled,
} from "../../src/utils/helpers.ts";

describe("helpers", () => {
  it("应该格式化毫秒时间", () => {
    expect(formatDuration(100)).toBe("100ms");
  });

  it("应该格式化秒级时间", () => {
    expect(formatDuration(1500)).toBe("1.50s");
  });

  it("应该格式化分钟级时间", () => {
    expect(formatDuration(61000)).toBe("1m 1.0s");
  });

  it("应该正确判断日志详细级别", () => {
    expect(hasVerbosity(2)).toBe(true);

    expect(hasVerbosity(0)).toBe(false);
  });

  it("dry run 模式下应该跳过副作用操作", async () => {
    const action = vi.fn();

    const result = await runSideEffect(
      {
        dryRun: true,
      } as any,
      "test",
      action,
    );

    expect(action).not.toHaveBeenCalled();

    expect(result).toBeUndefined();
  });

  it("正常模式下应该执行副作用操作", async () => {
    const result = await runSideEffect(
      {
        dryRun: false,
      } as any,
      "",
      () => 123,
    );

    expect(result).toBe(123);
  });

  it("启用变更日志时应该返回 true", () => {
    expect(
      isChangelogEnabled({
        git: {
          changelog: {},
        },
      } as any),
    ).toBe(true);
  });

  it("禁用变更日志时应该返回 false", () => {
    expect(
      isChangelogEnabled({
        git: {
          changelog: false,
        },
      } as any),
    ).toBe(false);
  });

  it("非 verbose 模式下记录命令不应该抛出异常", () => {
    expect(() => {
      logCommand(
        {
          verbose: 0,
        } as any,
        "git",
        ["commit"],
      );
    }).not.toThrow();
  });

  it("包检测缓存应该正常工作", () => {
    const first = isPackageInstalled("vitest", process.cwd());

    const second = isPackageInstalled("vitest", process.cwd());

    expect(second).toBe(first);
  });
});
