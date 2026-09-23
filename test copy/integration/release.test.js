import path from "node:path";

import fs from "fs-extra";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import {
  createProjectFixture,
  cleanupProject,
  readPackage,
  readFile,
  git,
  gitLog,
  gitTags,
  gitStatus,
} from "./helpers.js";

const prompts = vi.hoisted(() => ({
  select: vi.fn(),
  input: vi.fn(),
  confirm: vi.fn(),
}));

vi.mock("@inquirer/prompts", () => ({
  select: prompts.select,
  input: prompts.input,
  confirm: prompts.confirm,
}));

import { resolveConfig } from "../../src/config/index.js";
import { release } from "../../src/release.js";

describe("release integration", () => {
  let cwd;

  beforeEach(async () => {
    cwd = await createProjectFixture();

    prompts.select.mockReset();
    prompts.input.mockReset();
    prompts.confirm.mockReset();
  });

  afterEach(async () => {
    if (cwd) {
      await cleanupProject(cwd);
    }
  });

  it("should perform a complete patch release", async () => {
    /*
     * 第一次 select:
     *   selectVersion()
     *
     * 第二次 select:
     *   selectTag()
     */
    prompts.select.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    /*
     * 第一次 confirm:
     *   confirmChangelog()
     *
     * 第二次 confirm:
     *   summary()
     */
    prompts.confirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    const options = await resolveConfig({
      cwd,
      verbose: 0,
    });

    await release(options);

    // --------------------------------------------------
    // package.json
    // --------------------------------------------------

    const pkg = await readPackage(cwd);

    expect(pkg.version).toBe("1.0.1");

    expect(pkg.publishConfig).toEqual({
      tag: "latest",
    });

    // --------------------------------------------------
    // CHANGELOG.md
    // --------------------------------------------------

    const changelog = await readFile(cwd, "CHANGELOG.md");

    expect(changelog).toContain("# Changelog");

    // --------------------------------------------------
    // Git working tree
    // --------------------------------------------------

    const status = await gitStatus(cwd);

    expect(status).toBe("");

    // --------------------------------------------------
    // Git commit
    // --------------------------------------------------

    const log = await gitLog(cwd);

    expect(log.message).toBe("release: v1.0.1");

    // --------------------------------------------------
    // Git tag
    // --------------------------------------------------

    const tags = await gitTags(cwd);

    expect(tags).toContain("v1.0.1");
  });

  it("should release with next dist-tag", async () => {
    prompts.select.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("next");

    prompts.confirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    const options = await resolveConfig({
      cwd,
      verbose: 0,
    });

    await release(options);

    const pkg = await readPackage(cwd);

    expect(pkg.version).toBe("1.0.1");
    expect(pkg.publishConfig.tag).toBe("next");

    const tags = await gitTags(cwd);

    expect(tags).toContain("v1.0.1");

    const log = await gitLog(cwd);

    expect(log.message).toBe("release: v1.0.1");
  });

  it("should support a minor release", async () => {
    prompts.select.mockResolvedValueOnce("1.1.0").mockResolvedValueOnce("latest");

    prompts.confirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    const options = await resolveConfig({
      cwd,
      verbose: 0,
    });

    await release(options);

    const pkg = await readPackage(cwd);

    expect(pkg.version).toBe("1.1.0");

    expect(await gitTags(cwd)).toContain("v1.1.0");
  });

  it("should support a major release", async () => {
    prompts.select.mockResolvedValueOnce("2.0.0").mockResolvedValueOnce("latest");

    prompts.confirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    const options = await resolveConfig({
      cwd,
      verbose: 0,
    });

    await release(options);

    const pkg = await readPackage(cwd);

    expect(pkg.version).toBe("2.0.0");

    expect(await gitTags(cwd)).toContain("v2.0.0");
  });

  it("should execute release hooks", async () => {
    // const marker = path.join(cwd, "hook.log");

    await fs.writeJson(
      path.join(cwd, "releaseasy.config.json"),
      {
        increments: ["patch"],
        distTags: ["latest"],
        git: {
          requireBranch: "main",
          changelog: {
            output: "CHANGELOG.md",
            configFile: "cliff.toml",
            args: "--tag ${version}",
          },
        },
        hooks: {
          "before:init": `node -e "require('fs').appendFileSync('hook.log', 'before:init\\n')"`,
          "after:bump": `node -e "require('fs').appendFileSync('hook.log', 'after:bump\\n')"`,
          "after:release": `node -e "require('fs').appendFileSync('hook.log', 'after:release\\n')"`,
        },
      },
      {
        spaces: 2,
      },
    );

    await git(cwd, ["add", "."]);
    await git(cwd, ["commit", "-m", "chore: add release config"]);

    prompts.select.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    prompts.confirm.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    const options = await resolveConfig({
      cwd,
      verbose: 0,
    });

    await release(options);

    const hookLog = await readFile(cwd, "hook.log");

    expect(hookLog).toContain("before:init");
    expect(hookLog).toContain("after:bump");
    expect(hookLog).toContain("after:release");

    expect(await gitTags(cwd)).toContain("v1.0.1");
  });

  it("should cancel the release when changelog confirmation is rejected", async () => {
    prompts.select.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    prompts.confirm.mockResolvedValueOnce(false);

    const options = await resolveConfig({
      cwd,
      verbose: 0,
    });

    await expect(release(options)).rejects.toThrow("Release cancelled by user");

    /*
     * rollback() 会恢复到 initialCommitSha，
     * 因此 package.json 应该仍然是 1.0.0。
     */
    const pkg = await readPackage(cwd);

    expect(pkg.version).toBe("1.0.0");

    const tags = await gitTags(cwd);

    expect(tags).toEqual([]);

    const status = await gitStatus(cwd);

    expect(status).toBe("");
  });

  it("should cancel the release at final confirmation", async () => {
    prompts.select.mockResolvedValueOnce("1.0.1").mockResolvedValueOnce("latest");

    prompts.confirm.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

    const options = await resolveConfig({
      cwd,
      verbose: 0,
    });

    await expect(release(options)).rejects.toThrow("Release cancelled by user");

    const pkg = await readPackage(cwd);

    expect(pkg.version).toBe("1.0.0");

    expect(await gitTags(cwd)).toEqual([]);

    expect(await gitStatus(cwd)).toBe("");
  });
});
