import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "path";

import fs from "fs-extra";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

const prompts = vi.hoisted(() => ({
  select: vi.fn(),
  input: vi.fn(),
  confirm: vi.fn(),
}));

// const packageManagerDetector = vi.hoisted(() => ({
//   detect: vi.fn(),
// }));

vi.mock("@inquirer/prompts", () => ({
  select: prompts.select,
  input: prompts.input,
  confirm: prompts.confirm,
}));

// vi.mock("package-manager-detector", () => ({
//   detect: packageManagerDetector.detect,
// }));

vi.mock("../../src/utils/git.js", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    isGitAvailable: vi.fn(),
  };
});
import { release } from "../../src/release.js";
import { isGitAvailable } from "../../src/utils/git.js";

describe("release integration", () => {
  let dir;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "release-cli-test-"));
    console.log(dir);

    prompts.select.mockReset();
    prompts.input.mockReset();
    prompts.confirm.mockReset();

    // packageManagerDetector.detect.mockReset();
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
      // packageManager: "pnpm@10.0.0",// 这里故意不写入该字段它才会抛出异常
    });

    await expect(
      release({
        cwd: dir,
      }),
    ).rejects.toThrow("Could not detect the package manager used by this project.");
  });

  it("Git 未安装应该抛出异常", async () => {
    isGitAvailable.mockResolvedValue(false);
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
    isGitAvailable.mockResolvedValue(true);

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
    // /*
    //  * 第一次 select:
    //  *   selectVersion()
    //  *
    //  * 第二次 select:
    //  *   selectTag()
    //  */
    // prompts.select.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");
    // /*
    //  * 第一次 confirm:
    //  *   confirmChangelog()
    //  *
    //  * 第二次 confirm:
    //  *   summary()
    //  */
    // prompts.confirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
    // const options = await resolveConfig({
    //   cwd,
    //   verbose: 0,
    // });
    // console.log(options);
    // await release(options);
    // // --------------------------------------------------
    // // package.json
    // // --------------------------------------------------
    // const pkg = await readPackage(cwd);
    // expect(pkg.version).toBe("1.0.1");
    // expect(pkg.publishConfig).toEqual({
    //   tag: "latest",
    // });
    // // --------------------------------------------------
    // // CHANGELOG.md
    // // --------------------------------------------------
    // const changelog = await readFile(cwd, "CHANGELOG.md");
    // expect(changelog).toContain("# Changelog");
    // // --------------------------------------------------
    // // Git working tree
    // // --------------------------------------------------
    // const status = await gitStatus(cwd);
    // expect(status).toBe("");
    // // --------------------------------------------------
    // // Git commit
    // // --------------------------------------------------
    // const log = await gitLog(cwd);
    // expect(log.message).toBe("release: v1.0.1");
    // // --------------------------------------------------
    // // Git tag
    // // --------------------------------------------------
    // const tags = await gitTags(cwd);
    // expect(tags).toContain("v1.0.1");
  });
});
