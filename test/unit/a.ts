import { execFile } from "node:child_process";
import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import fs from "fs-extra";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const execFileAsync = promisify(execFile);

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

describe("release integration", () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "release-cli-test-"));

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

      if (outputIndex !== -1 && args[outputIndex + 1]) {
        const output = args[outputIndex + 1];

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
  });

  /**
   * --------------------------------------------------------------------------
   * 基础工具
   * --------------------------------------------------------------------------
   */

  async function git(...args: string[]) {
    return await execFileAsync("git", args, {
      cwd: dir,
      encoding: "utf8",
    });
  }

  async function gitAt(cwd: string, ...args: string[]) {
    return await execFileAsync("git", args, {
      cwd,
      encoding: "utf8",
    });
  }

  async function initGitRepository(
    options: {
      remote?: boolean;
      branch?: string;
      cliff?: boolean;
      name?: string;
      version?: string;
    } = {},
  ) {
    const {
      remote = true,
      branch = "main",
      cliff = true,
      name = "test-project",
      version = "1.0.0",
    } = options;

    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        name,
        version,
        packageManager: "pnpm@10.0.0",
      },
      { spaces: 2 },
    );

    // 让 package-manager-detector 有明确的 pnpm 信息。
    await fs.writeFile(path.join(dir, "pnpm-lock.yaml"), "lockfileVersion: '9.0'\n");

    if (cliff) {
      await fs.writeFile(
        path.join(dir, "cliff.toml"),
        `
[changelog]
header = "# Changelog"
`,
        "utf8",
      );
    }

    await git("init", "-b", branch);

    await git("config", "user.name", "releaseasy-test");
    await git("config", "user.email", "releaseasy@example.com");

    await git("add", ".");

    await git("commit", "--no-verify", "-m", "chore: initial commit");

    if (remote) {
      const remoteDir = await mkdtemp(path.join(os.tmpdir(), "release-cli-remote-"));

      await gitAt(remoteDir, "init", "--bare");

      await git("remote", "add", "origin", remoteDir);

      return remoteDir;
    }

    return undefined;
  }

  async function readPackage() {
    return await fs.readJson(path.join(dir, "package.json"));
  }

  async function gitTagExists(tag: string) {
    try {
      await git("rev-parse", `refs/tags/${tag}`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * createContext 基础校验
   * --------------------------------------------------------------------------
   */

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
    await initGitRepository();

    await fs.writeFile(path.join(dir, "dirty.txt"), "dirty", "utf8");

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Working directory is not clean. Please commit your changes.");
  });

  it("没有 Git remote 应该抛出异常", async () => {
    await initGitRepository({
      remote: false,
    });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("No Git remote repository found");
  });

  it("package.json name 为空应该抛出异常", async () => {
    await initGitRepository({
      name: "",
    });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow('package.json "name" must be a non-empty string.');
  });

  it("package.json version 非法应该抛出异常", async () => {
    await initGitRepository({
      version: "not-a-version",
    });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow('package.json "version" must be a valid semver version.');
  });

  it("Git branch 不符合 requireBranch 应该抛出异常", async () => {
    await initGitRepository({
      branch: "develop",
    });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Release is only allowed on main, current: develop");
  });

  it("requireBranch=false 时允许任意 branch 发布", async () => {
    await initGitRepository({
      branch: "develop",
    });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      git: {
        requireBranch: false,
      },
    });

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.0.1");
    expect(pkg.publishConfig.tag).toBe("latest");
  });

  it("缺少 cliff.toml 应该提前抛出异常", async () => {
    await initGitRepository({
      cliff: false,
    });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Could not find the Git-cliff configuration file");
  });

  /**
   * --------------------------------------------------------------------------
   * selectVersion / selectTag
   * --------------------------------------------------------------------------
   */

  it("应该执行一次完整的 patch 版本发布", async () => {
    const remoteDir = await initGitRepository();

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

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.0.1");
    expect(pkg.publishConfig).toEqual({
      tag: "latest",
    });

    expect(await fs.pathExists(path.join(dir, "CHANGELOG.md"))).toBe(true);

    expect(await gitTagExists("v1.0.1")).toBe(true);

    const { stdout: remoteTag } = await gitAt(remoteDir!, "show-ref", "--tags");

    expect(remoteTag).toContain("refs/tags/v1.0.1");

    expect(mockedRunGitCliff).toHaveBeenCalledTimes(1);

    const cliffArgs = mockedRunGitCliff.mock.calls[0][0];

    expect(cliffArgs).toContain("--config");
    expect(cliffArgs).toContain(path.join(dir, "cliff.toml"));
    expect(cliffArgs).toContain("--output");
    expect(cliffArgs).toContain("CHANGELOG.md");
  });

  it("应该支持自定义版本号", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("custom").mockResolvedValueOnce("latest");

    mockedInput.mockResolvedValueOnce("1.2.3");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
    });

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.2.3");
    expect(mockedInput).toHaveBeenCalledTimes(1);
  });

  it("应该支持 minor release", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("1.1.0").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
    });

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.1.0");
  });

  it("应该支持 major release", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("2.0.0").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
    });

    const pkg = await readPackage();

    expect(pkg.version).toBe("2.0.0");
  });

  /**
   * --------------------------------------------------------------------------
   * prerelease / dist-tag
   * --------------------------------------------------------------------------
   */

  it("prerelease 版本应该允许选择非 latest tag", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("1.1.0-beta.1").mockResolvedValueOnce("next");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
    });

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.1.0-beta.1");
    expect(pkg.publishConfig.tag).toBe("next");

    const tagCall = mockedSelect.mock.calls[1][0];

    const latestChoice = tagCall.choices.find((choice) => choice.value === "latest");

    expect(latestChoice?.disabled).toBe(true);
  });

  it("应该支持自定义 dist-tag", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("canary");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      distTags: ["latest", "next", "canary"],
    });

    const pkg = await readPackage();

    expect(pkg.publishConfig.tag).toBe("canary");
  });

  /**
   * --------------------------------------------------------------------------
   * changelog
   * --------------------------------------------------------------------------
   */

  it("git.changelog=false 时不应该生成 changelog", async () => {
    await initGitRepository({
      cliff: false,
    });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    // changelog confirm 不应该发生。
    // 这里只有 summary confirm。
    mockedConfirm.mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      git: {
        changelog: false,
      },
    });

    expect(mockedRunGitCliff).not.toHaveBeenCalled();
    expect(mockedConfirm).toHaveBeenCalledTimes(1);

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.0.1");
    expect(pkg.publishConfig.tag).toBe("latest");
    expect(await fs.pathExists(path.join(dir, "CHANGELOG.md"))).toBe(false);
  });

  it("用户拒绝 changelog 后应该取消 release", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(false);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Release cancelled by user");

    const pkg = await readPackage();

    // bump 尚未执行
    expect(pkg.version).toBe("1.0.0");

    // git tag 也不应该创建
    expect(await gitTagExists("v1.0.1")).toBe(false);
  });

  it("git-cliff 失败应该阻止 release", async () => {
    await initGitRepository();

    mockedRunGitCliff.mockRejectedValueOnce(new Error("git-cliff failed"));

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Failed to generate changelog");

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.0.0");
    expect(await gitTagExists("v1.0.1")).toBe(false);
  });

  /**
   * --------------------------------------------------------------------------
   * dry-run
   * --------------------------------------------------------------------------
   */

  it("dry-run 不应该修改 package.json", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      dryRun: true,
    });

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.0.0");
    expect(pkg.publishConfig).toBeUndefined();

    // Generate changelog 和 bump/git 都属于 side effect。
    expect(mockedRunGitCliff).not.toHaveBeenCalled();

    expect(await gitTagExists("v1.0.1")).toBe(false);
  });

  /**
   * --------------------------------------------------------------------------
   * summary / cancellation
   * --------------------------------------------------------------------------
   */

  it("summary 确认失败应该取消 release", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm
      // changelog
      .mockResolvedValueOnce(true)
      // summary
      .mockResolvedValueOnce(false);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Release cancelled by user");

    const pkg = await readPackage();

    // bump 在 summary 之后，所以 package.json 不应该被修改。
    expect(pkg.version).toBe("1.0.0");

    expect(await gitTagExists("v1.0.1")).toBe(false);
  });

  /**
   * --------------------------------------------------------------------------
   * hooks
   * --------------------------------------------------------------------------
   */

  it("应该执行 before:init 和 after:release hooks", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      hooks: {
        "before:init": `echo before-init`,
        "after:release": `echo after-release`,
      },
    });

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.0.1");
  });

  it("应该执行 before/after changelog hooks", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      hooks: {
        "before:changelog": "echo before-changelog",
        "after:changelog": "echo after-changelog",
      },
    });

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.0.1");
  });

  it("应该执行 before/after bump hooks", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      hooks: {
        "before:bump": "echo before-bump",
        "after:bump": "echo after-bump",
      },
    });

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.0.1");
  });

  it("hook 可以使用 ReleaseContext 插值变量", async () => {
    await initGitRepository();

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      hooks: {
        "before:bump": "echo ${version}",
      },
    });

    const pkg = await readPackage();

    expect(pkg.version).toBe("1.0.1");
  });

  /**
   * --------------------------------------------------------------------------
   * rollback
   * --------------------------------------------------------------------------
   */

  it("Git push 失败后应该 rollback package.json 和 tag", async () => {
    // 不配置真正可用的 remote。
    // 但 remote URL 存在，所以 createContext 能通过。
    await initGitRepository({
      remote: false,
    });

    const invalidRemote = path.join(
      os.tmpdir(),
      `releaseasy-non-existent-remote-${Date.now()}.git`,
    );

    await git("remote", "add", "origin", invalidRemote);

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Release failed");

    const pkg = await readPackage();

    // rollback reset --hard initialCommitSha
    expect(pkg.version).toBe("1.0.0");

    // tag 创建过，但 rollback 应该删除
    expect(await gitTagExists("v1.0.1")).toBe(false);

    // changelog 是 untracked file，也应该被 git clean -fd 删除
    expect(await fs.pathExists(path.join(dir, "CHANGELOG.md"))).toBe(false);

    // 应该回到初始 commit
    const { stdout } = await git("log", "-1", "--pretty=%s");

    expect(stdout.trim()).toBe("chore: initial commit");
  });

  /**
   * --------------------------------------------------------------------------
   * config 覆盖
   * --------------------------------------------------------------------------
   */

  it("应该使用自定义 tagName 和 commitMessage", async () => {
    const remoteDir = await initGitRepository();

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      git: {
        tagName: "release-${version}",
        commitMessage: "chore(release): ${version}",
      },
    });

    expect(await gitTagExists("release-1.0.1")).toBe(true);

    const { stdout } = await git("log", "-1", "--pretty=%s");

    expect(stdout.trim()).toBe("chore(release): 1.0.1");

    const { stdout: remoteTag } = await gitAt(remoteDir!, "show-ref", "--tags");

    expect(remoteTag).toContain("refs/tags/release-1.0.1");
  });
});
