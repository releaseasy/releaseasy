import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import fs from "fs-extra";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@inquirer/prompts", () => ({
  select: vi.fn(),
  input: vi.fn(),
  confirm: vi.fn(),
}));

vi.mock("../../src/utils/git.ts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/utils/git.ts")>();

  return {
    ...actual,
    isGitAvailable: vi.fn<typeof actual.isGitAvailable>(),
  };
});

import { confirm, input, select } from "@inquirer/prompts";

import { release } from "../../src/release.ts";
import { isGitAvailable } from "../../src/utils/git.ts";

const mockedSelect = vi.mocked(select);
const mockedInput = vi.mocked(input);
const mockedConfirm = vi.mocked(confirm);
const mockedIsGitAvailable = vi.mocked(isGitAvailable);

describe("release integration", () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "release-cli-test-"));

    mockedSelect.mockReset();
    mockedInput.mockReset();
    mockedConfirm.mockReset();
    mockedIsGitAvailable.mockReset();
  });

  afterEach(async () => {
    await fs.remove(dir);
  });

  it("目录不存在应该抛出异常", async () => {
    await expect(
      release({
        cwd: "foo/bar",
      }),
    ).rejects.toThrow(`Directory does not exist: ${path.resolve("foo/bar")}`);
  });

  it("package.json不存在应该抛出异常", async () => {
    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow(`No package.json found in ${path.resolve(dir)}`);
  });

  it("检测不到包管理器应该抛出异常", async () => {
    await fs.writeJson(path.join(dir, "package.json"), {
      name: "test-project",
      version: "1.0.0",
    });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Could not detect the package manager used by this project.");
  });

  it("Git 未安装应该抛出异常", async () => {
    mockedIsGitAvailable.mockResolvedValue(false);

    await fs.writeJson(path.join(dir, "package.json"), {
      name: "test-project",
      version: "1.0.0",
      packageManager: "pnpm@10.0.0",
    });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow(
      "Git is not installed or not available in your PATH. Please install Git to continue.",
    );
  });

  it("当前目录不是 Git 仓库应该抛出异常", async () => {
    mockedIsGitAvailable.mockResolvedValue(true);

    await fs.writeJson(path.join(dir, "package.json"), {
      name: "test-project",
      version: "1.0.0",
      packageManager: "pnpm@10.0.0",
    });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Current working directory is not a git repository.");
  });

  it("应该执行一次完整的 patch 版本发布", async () => {
    // 第一次 select:
    //   selectVersion()
    //
    // 第二次 select:
    //   selectTag()
    // mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");
    // 第一次 confirm:
    //   confirmChangelog()
    //
    // 第二次 confirm:
    //   summary()
    // mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
    // 后续补充完整 release 流程断言
  });
});
