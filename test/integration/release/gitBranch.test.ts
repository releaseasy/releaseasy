import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { select, confirm } from "@inquirer/prompts";
import fs from "fs-extra";
import type { PackageJson } from "pkg-types";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import { release } from "../../../src/release.ts";
import { isGitAvailable } from "../../../src/utils/git.ts";
import { initGitRepository, readPackage, writePackageJson } from "../../helpers/index.ts";
const mockedSelect = vi.mocked(select);
const mockedConfirm = vi.mocked(confirm);
const mockedIsGitAvailable = vi.mocked(isGitAvailable);

describe("release", () => {
  let dir: string;
  let remoteDir: string;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "release-cli-test-"));
    remoteDir = await mkdtemp(path.join(os.tmpdir(), "release-cli-remote-"));

    // 默认 Git 是可用的。
    // 个别测试再覆盖成 false。
    mockedIsGitAvailable.mockResolvedValue(true);
  });

  afterEach(async () => {
    await fs.remove(dir);
    await fs.remove(remoteDir);
  });

  it("Git branch 不符合 requireBranch 应该抛出异常", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir, cliffConfig: false, branch: "develop" });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Release is only allowed on main, current: develop");
  });

  it("requireBranch=false 时允许任意 branch 发布", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

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

  it("requireBranch 字符串匹配成功", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, {
      remoteDir,
      branch: "main",
    });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      git: {
        requireBranch: "main",
      },
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.0.1");
  });

  it("requireBranch 数组匹配成功", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, {
      remoteDir,
      branch: "main",
    });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      git: {
        requireBranch: ["develop", "main"],
      },
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.0.1");
  });

  it("requireBranch 正则匹配成功", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, {
      remoteDir,
      branch: "main",
    });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      git: {
        requireBranch: /^main$/,
      },
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.0.1");
  });
});
