import { mkdtemp, copyFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import fs from "fs-extra";
import type { PackageJson } from "pkg-types";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import { addGitRemote, git, gitTagExists, readPackage } from "../helpers/git.ts";

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

vi.mock("../../src/utils/git-cliff.ts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/utils/git-cliff.ts")>();

  return {
    ...actual,
    runGitCliff: vi.fn(),
  };
});

import { confirm, input, select } from "@inquirer/prompts";

import { release } from "../../src/release.ts";
import { runGitCliff } from "../../src/utils/git-cliff.ts";
import { isGitAvailable } from "../../src/utils/git.ts";
const mockedSelect = vi.mocked(select);
const mockedInput = vi.mocked(input);
const mockedConfirm = vi.mocked(confirm);
const mockedIsGitAvailable = vi.mocked(isGitAvailable);
const mockedRunGitCliff = vi.mocked(runGitCliff);

describe("release", () => {
  let dir: string;
  let remoteDir: string;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "release-cli-test-"));
    remoteDir = await mkdtemp(path.join(os.tmpdir(), "release-cli-remote-"));

    mockedSelect.mockReset();
    mockedInput.mockReset();
    mockedConfirm.mockReset();
    mockedIsGitAvailable.mockReset();
    mockedRunGitCliff.mockReset();

    // 默认 Git 是可用的。
    // 个别测试再覆盖成 false。
    mockedIsGitAvailable.mockResolvedValue(true);

    // 默认 changelog 生成成功，并创建 CHANGELOG.md。
    mockedRunGitCliff.mockImplementation(async (args) => {
      const outputIndex = args.indexOf("--output");

      const output = outputIndex !== -1 ? args[outputIndex + 1] : undefined;

      if (output) {
        await fs.writeFile(
          path.join(dir, output),
          "# Changelog\n\n## v1.0.1\n\n- Test release\n",
          "utf8",
        );
      }

      return {
        exitCode: 0,
        stdout: "",
        stderr: "",
      } as Awaited<ReturnType<typeof runGitCliff>>;
    });
  });

  afterEach(async () => {
    await fs.remove(dir);
    await fs.remove(remoteDir);
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

  it("Git working tree 不干净应该抛出异常", async () => {
    // 写入json
    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        name: "test-project",
        version: "1.0.0",
        packageManager: "pnpm@10.0.0",
      },
      { spaces: 2 },
    );

    // 初始化git仓库
    await git(dir, ["init", "-b", "main"]);
    await git(dir, ["config", "user.name", "releaseasy-test"]);
    await git(dir, ["config", "user.email", "releaseasy@example.com"]);
    await git(dir, ["add", "."]);
    await git(dir, ["commit", "--no-verify", "-m", "chore: initial commit"]);

    // 写入一个脏数据
    await fs.writeFile(path.join(dir, "dirty.txt"), "dirty", "utf8");

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Working directory is not clean. Please commit your changes.");
  });

  it("没有 Git remote 应该抛出异常", async () => {
    // 写入json
    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        name: "test-project",
        version: "1.0.0",
        packageManager: "pnpm@10.0.0",
      },
      { spaces: 2 },
    );

    // 初始化git仓库
    await git(dir, ["init", "-b", "main"]);
    await git(dir, ["config", "user.name", "releaseasy-test"]);
    await git(dir, ["config", "user.email", "releaseasy@example.com"]);
    await git(dir, ["add", "."]);
    await git(dir, ["commit", "--no-verify", "-m", "chore: initial commit"]);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("No Git remote repository found");
  });

  it("package.json name 为空应该抛出异常", async () => {
    // 写入json
    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        version: "1.0.0",
        packageManager: "pnpm@10.0.0",
      },
      { spaces: 2 },
    );

    // 初始化git仓库
    await git(dir, ["init", "-b", "main"]);
    await git(dir, ["config", "user.name", "releaseasy-test"]);
    await git(dir, ["config", "user.email", "releaseasy@example.com"]);
    await git(dir, ["add", "."]);
    await git(dir, ["commit", "--no-verify", "-m", "chore: initial commit"]);

    // 添加一个远程仓库
    await addGitRemote(dir, remoteDir);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow('package.json "name" must be a non-empty string.');
  });

  it("package.json version 非法应该抛出异常", async () => {
    // 写入json
    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        name: "test-project",
        version: "not-a-version",
        packageManager: "pnpm@10.0.0",
      },
      { spaces: 2 },
    );

    // 初始化git仓库
    await git(dir, ["init", "-b", "main"]);
    await git(dir, ["config", "user.name", "releaseasy-test"]);
    await git(dir, ["config", "user.email", "releaseasy@example.com"]);
    await git(dir, ["add", "."]);
    await git(dir, ["commit", "--no-verify", "-m", "chore: initial commit"]);

    // 添加一个远程仓库
    await addGitRemote(dir, remoteDir);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow('package.json "version" must be a valid semver version.');
  });

  it("Git branch 不符合 requireBranch 应该抛出异常", async () => {
    // 写入json
    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        name: "test-project",
        version: "1.0.0",
        packageManager: "pnpm@10.0.0",
      },
      { spaces: 2 },
    );

    // 初始化git仓库
    await git(dir, ["init", "-b", "develop"]);
    await git(dir, ["config", "user.name", "releaseasy-test"]);
    await git(dir, ["config", "user.email", "releaseasy@example.com"]);
    await git(dir, ["add", "."]);
    await git(dir, ["commit", "--no-verify", "-m", "chore: initial commit"]);

    // 添加一个远程仓库
    await addGitRemote(dir, remoteDir);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Release is only allowed on main, current: develop");
  });

  it("缺少 cliff.toml 应该提前抛出异常", async () => {
    // 写入json
    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        name: "test-project",
        version: "1.0.0",
        packageManager: "pnpm@10.0.0",
      },
      { spaces: 2 },
    );

    // 初始化git仓库
    await git(dir, ["init", "-b", "main"]);
    await git(dir, ["config", "user.name", "releaseasy-test"]);
    await git(dir, ["config", "user.email", "releaseasy@example.com"]);
    await git(dir, ["add", "."]);
    await git(dir, ["commit", "--no-verify", "-m", "chore: initial commit"]);

    // 添加一个远程仓库
    await addGitRemote(dir, remoteDir);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Could not find the Git-cliff configuration file");
  });

  it("requireBranch=false 时允许任意 branch 发布", async () => {
    // 写入json
    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        name: "test-project",
        version: "1.0.0",
        packageManager: "pnpm@10.0.0",
      },
      { spaces: 2 },
    );

    // 初始化git仓库
    await git(dir, ["init", "-b", "develop"]);
    await git(dir, ["config", "user.name", "releaseasy-test"]);
    await git(dir, ["config", "user.email", "releaseasy@example.com"]);

    // 插入一个配置文件
    await copyFile("./test/fixtures/cliff.toml", `${dir}/cliff.toml`);

    await git(dir, ["add", "."]);
    await git(dir, ["commit", "--no-verify", "-m", "chore: initial commit"]);

    // 添加一个远程仓库
    await addGitRemote(dir, remoteDir);

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      git: {
        requireBranch: false,
      },
    });

    const pkg = (await fs.readJSON(path.join(dir, "package.json"))) as PackageJson;

    expect(pkg.version).toBe("1.0.1");
    expect(pkg.publishConfig!.tag).toBe("latest");
  });

  it("应该执行一次完整的 patch 版本发布", async () => {
    // 写入json
    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        name: "test-project",
        version: "1.0.0",
        packageManager: "pnpm@10.0.0",
      },
      { spaces: 2 },
    );

    // 初始化git仓库
    await git(dir, ["init", "-b", "main"]);
    await git(dir, ["config", "user.name", "releaseasy-test"]);
    await git(dir, ["config", "user.email", "releaseasy@example.com"]);

    // 插入一个配置文件
    await copyFile("./test/fixtures/cliff.toml", `${dir}/cliff.toml`);

    await git(dir, ["add", "."]);
    await git(dir, ["commit", "--no-verify", "-m", "chore: initial commit"]);

    // 添加一个远程仓库
    await addGitRemote(dir, remoteDir);

    mockedSelect
      // selectVersion()
      .mockResolvedValueOnce("1.0.1")
      // selectTag()
      .mockResolvedValueOnce("latest");

    mockedConfirm
      // confirmChangelog()
      .mockResolvedValueOnce(true)
      // summary()
      .mockResolvedValueOnce(true);

    await release({
      cwd: dir,
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.0.1");
    expect(pkg.publishConfig).toEqual({
      tag: "latest",
    });

    expect(await fs.pathExists(path.join(dir, "CHANGELOG.md"))).toBe(true);

    expect(await gitTagExists(dir, "v1.0.1")).toBe(true);

    const { stdout: remoteTag } = await git(remoteDir, ["show-ref", "--tags"]);

    expect(remoteTag).toContain("refs/tags/v1.0.1");

    expect(mockedRunGitCliff).toHaveBeenCalledTimes(1);

    // 上一句已经保证：mock.calls.length === 1 所以可以直接!断言
    const cliffArgs = mockedRunGitCliff.mock.calls[0]![0];

    expect(cliffArgs).toContain("--config");
    expect(cliffArgs).toContain(path.join(dir, "cliff.toml"));
    expect(cliffArgs).toContain("--output");
    expect(cliffArgs).toContain("CHANGELOG.md");
  });
});
