import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { select } from "@inquirer/prompts";
import fs from "fs-extra";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import { release } from "../../../src/release.ts";
import { isGitAvailable } from "../../../src/utils/git.ts";
import { initGitRepository, updatePackageJson, writePackageJson } from "../../helpers/index.ts";
const mockedSelect = vi.mocked(select);
const mockedIsGitAvailable = vi.mocked(isGitAvailable);

describe("release-validation", () => {
  let dir: string;
  let remoteDir: string;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "release-cli-test-"));
    remoteDir = await mkdtemp(path.join(os.tmpdir(), "release-cli-remote-"));

    mockedSelect.mockReset();

    mockedIsGitAvailable.mockReset();

    // 默认 Git 是可用的。
    // 个别测试再覆盖成 false。
    mockedIsGitAvailable.mockResolvedValue(true);
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
    await writePackageJson(dir, { packageManager: false });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Could not detect the package manager used by this project.");
  });

  it("Git 未安装应该抛出异常", async () => {
    mockedIsGitAvailable.mockResolvedValue(false);

    await writePackageJson(dir);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow(
      "Git is not installed or not available in your PATH. Please install Git to continue.",
    );
  });

  it("当前目录不是 Git 仓库应该抛出异常", async () => {
    await writePackageJson(dir);

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Current working directory is not a git repository.");
  });

  it("Git working tree 不干净应该抛出异常", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { cliffConfig: false });

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
    await writePackageJson(dir);

    await initGitRepository(dir, { cliffConfig: false });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("No Git remote repository found");
  });

  it("package.json name 为空应该抛出异常", async () => {
    await writePackageJson(dir, { name: false });

    await initGitRepository(dir, { remoteDir, cliffConfig: false });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow('package.json "name" must be a non-empty string.');
  });

  it("package.json version 非法应该抛出异常", async () => {
    await writePackageJson(dir);
    await updatePackageJson(dir, { version: "not-a-version" });

    await initGitRepository(dir, { remoteDir, cliffConfig: false });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow('package.json "version" must be a valid semver version.');
  });

  it("缺少 cliff.toml 应该提前抛出异常", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir, cliffConfig: false });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Could not find the Git-cliff configuration file");
  });
});
