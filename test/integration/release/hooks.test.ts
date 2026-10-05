import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { select, confirm } from "@inquirer/prompts";
import fs from "fs-extra";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import { release } from "../../../src/release.ts";
import { isGitAvailable } from "../../../src/utils/git.ts";
import { initGitRepository, readPackage, writePackageJson } from "../../helpers/index.ts";
const mockedSelect = vi.mocked(select);
const mockedConfirm = vi.mocked(confirm);
const mockedIsGitAvailable = vi.mocked(isGitAvailable);

describe("release-hooks", () => {
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

  it("应该执行 before:init 和 after:release hooks", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      hooks: {
        "before:init": `echo before-init`,
        "after:release": `echo after-release`,
      },
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.0.1");
  });

  it("应该执行 before/after changelog hooks", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      hooks: {
        "before:changelog": "echo before-changelog",
        "after:changelog": "echo after-changelog",
      },
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.0.1");
  });

  it("应该执行 before/after bump hooks", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      hooks: {
        "before:bump": "echo before-bump",
        "after:bump": "echo after-bump",
      },
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.0.1");
  });

  it("hook 可以使用 ReleaseContext 插值变量", async () => {
    await writePackageJson(dir);

    await initGitRepository(dir, { remoteDir });

    mockedSelect.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    mockedConfirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    await release({
      cwd: dir,
      hooks: {
        "before:bump": "echo ${version}",
      },
    });

    const pkg = await readPackage(dir);

    expect(pkg.version).toBe("1.0.1");
  });
});
