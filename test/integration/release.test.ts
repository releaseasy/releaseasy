import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { confirm, input, select } from "@inquirer/prompts";
import fs from "fs-extra";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import type { DistTag } from "../../src/config/types.ts";
import { release } from "../../src/release.ts";
import { runGitCliff } from "../../src/utils/git-cliff.ts";
import { isGitAvailable } from "../../src/utils/git.ts";
import {
  git,
  gitTagExists,
  initGitRepository,
  readPackage,
  writePackageJson,
} from "../helpers/index.ts";
const mockedSelect = vi.mocked(select);
const mockedInput = vi.mocked(input);
const mockedConfirm = vi.mocked(confirm);
const mockedIsGitAvailable = vi.mocked(isGitAvailable);
const mockedRunGitCliff = vi.mocked(runGitCliff);

export type Choice<T> = {
  name: string;
  value: T;
  disabled?: boolean;
};

type TagChoice = Choice<DistTag>;

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

  it("应该执行一次完整的 patch 版本发布", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

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

  it("应该支持自定义版本号", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("custom").mockResolvedValueOnce("latest");

    mockedInput.mockResolvedValueOnce("1.2.3");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.2.3");
    expect(mockedInput).toHaveBeenCalledTimes(1);
  });

  it("应该支持 minor release", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("1.1.0").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.1.0");
  });

  it("应该支持 major release", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("2.0.0").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("2.0.0");
  });

  it("prerelease 版本应该允许选择非 latest tag", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("1.1.0-beta.1").mockResolvedValueOnce("next");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.1.0-beta.1");
    expect(pkg.publishConfig!.tag).toBe("next");

    const tagCall = mockedSelect.mock.calls[1]![0] as {
      choices: readonly TagChoice[];
    };

    const latestChoice = tagCall.choices.find((choice) => choice.value === "latest");

    expect(latestChoice?.disabled).toBe(true);
  });

  it("应该支持自定义 dist-tag", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("canary");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      distTags: ["latest", "next", "canary"],
    });

    const pkg = await readPackage(dir);

    expect(pkg.publishConfig!.tag).toBe("canary");
  });

  it("git.changelog=false 时不应该生成 changelog", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir, cliffConfig: false });

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

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.0.1");
    expect(pkg.publishConfig!.tag).toBe("latest");
    expect(await fs.pathExists(path.join(dir, "CHANGELOG.md"))).toBe(false);
  });

  it("用户拒绝 changelog 后应该取消 release", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(false);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Release cancelled by user");

    const pkg = await readPackage(dir);

    // bump 尚未执行
    expect(pkg.version).toBe("1.0.0");

    // git tag 也不应该创建
    expect(await gitTagExists(dir, "v1.0.1")).toBe(false);
  });

  it("git-cliff 失败应该阻止 release", async () => {
    await writePackageJson(dir);
    await initGitRepository(dir, { remoteDir });

    mockedRunGitCliff.mockRejectedValueOnce(new Error("git-cliff failed"));

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Failed to generate changelog");

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.0.0");
    expect(await gitTagExists(dir, "v1.0.1")).toBe(false);
  });

  it("dry-run 不应该修改 package.json", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      dryRun: true,
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.0.0");
    expect(pkg.publishConfig).toBeUndefined();

    // Generate changelog 和 bump/git 都属于 side effect。
    expect(mockedRunGitCliff).not.toHaveBeenCalled();

    expect(await gitTagExists(dir, "v1.0.1")).toBe(false);
  });

  it("summary 确认失败应该取消 release", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

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

    const pkg = await readPackage(dir);

    // bump 在 summary 之后，所以 package.json 不应该被修改。
    expect(pkg.version).toBe("1.0.0");

    expect(await gitTagExists(dir, "v1.0.1")).toBe(false);
  });

  it("Git push 失败后应该 rollback package.json 和 tag", async () => {
    // 不配置真正可用的 remote。
    // 但 remote URL 存在，所以 createContext 能通过。
    // 写入json
    await writePackageJson(dir);

    await initGitRepository(dir);

    const invalidRemote = path.join(
      os.tmpdir(),
      `releaseasy-non-existent-remote-${Date.now()}.git`,
    );

    await git(dir, ["remote", "add", "origin", invalidRemote]);

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Release failed");

    const pkg = await readPackage(dir);

    // rollback reset --hard initialCommitSha
    expect(pkg.version).toBe("1.0.0");

    // tag 创建过，但 rollback 应该删除
    expect(await gitTagExists(dir, "v1.0.1")).toBe(false);

    // changelog 是 untracked file，也应该被 git clean -fd 删除
    expect(await fs.pathExists(path.join(dir, "CHANGELOG.md"))).toBe(false);

    // 应该回到初始 commit
    const { stdout } = await git(dir, ["log", "-1", "--pretty=%s"]);

    expect(stdout.trim()).toBe("chore: initial commit");
  });

  it("应该使用自定义 tagName 和 commitMessage", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      git: {
        tagName: "release-${version}",
        commitMessage: "chore(release): ${version}",
      },
    });

    expect(await gitTagExists(dir, "release-1.0.1")).toBe(true);

    const { stdout } = await git(dir, ["log", "-1", "--pretty=%s"]);

    expect(stdout.trim()).toBe("chore(release): 1.0.1");

    const { stdout: remoteTag } = await git(remoteDir, ["show-ref", "--tags"]);

    expect(remoteTag).toContain("refs/tags/release-1.0.1");
  });

  it("自定义版本输入非法 semver 应该提示错误", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("custom");

    const inputCall = mockedInput.mockImplementationOnce(async (options) => {
      const validate = options.validate as (value: string) => string | boolean;

      expect(validate("abc")).toBe("Invalid semver version");

      expect(validate("0.1.0")).toBe("Version must be greater than current version: 1.0.0");

      expect(validate("1.0.1")).toBe(true);

      return "1.0.1";
    });

    mockedSelect.mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
    });

    expect(inputCall).toBeDefined();
  });

  it("verbose=0 不应该添加 v 参数", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, {
      remoteDir,
    });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      verbose: 0,
    });

    const args = mockedRunGitCliff.mock.calls[0]![0];

    expect(args.join(" ")).not.toContain("-v");
  });
});
