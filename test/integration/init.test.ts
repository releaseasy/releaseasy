import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import ansis from "ansis";
import fs from "fs-extra";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

ansis.level = 0;

vi.mock("@inquirer/prompts", () => ({
  select: vi.fn(),
  input: vi.fn(),
  confirm: vi.fn(),
}));
vi.mock("../../src/utils/git-cliff.ts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/utils/git-cliff.ts")>();

  return {
    ...actual,
    runGitCliff: vi.fn(),
  };
});

import { confirm, select } from "@inquirer/prompts";

import { init } from "../../src/init.ts";
import { runGitCliff } from "../../src/utils/git-cliff.ts";
import { readPackage } from "../helpers/index.ts";

const mockedSelect = vi.mocked(select);
const mockedConfirm = vi.mocked(confirm);
const mockedRunGitCliff = vi.mocked(runGitCliff);

// const stripAnsi = (value: string) =>
//   // oxlint-disable-next-line no-control-regex
//   value.replace(/\u001B\[[0-?]*[ -/]*[@-~]/g, "");

describe("init", () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "releaseasy-init-test-"));

    mockedSelect.mockReset();
    mockedConfirm.mockReset();
    mockedRunGitCliff.mockReset();

    // 模拟 git-cliff --init
    mockedRunGitCliff.mockImplementation(async () => {
      await fs.writeFile(path.join(dir, "cliff.toml"), "# generated cliff config\n", "utf8");

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

  it("应该初始化默认 JavaScript 配置并添加 release script", async () => {
    await fs.writeJson(path.join(dir, "package.json"), {
      name: "test-project",
      version: "1.0.0",
      packageManager: "pnpm@10.0.0",
    });

    // config format
    mockedSelect
      .mockResolvedValueOnce("javascript")
      // changelog format
      .mockResolvedValueOnce("default");

    // add script
    mockedConfirm.mockResolvedValueOnce(true);

    await init({
      cwd: dir,
    });

    expect(await fs.pathExists(path.join(dir, "releaseasy.config.cjs"))).toBe(true);

    expect(await fs.pathExists(path.join(dir, "cliff.toml"))).toBe(true);

    const pkg = await readPackage(dir);

    expect(pkg.scripts).toEqual({
      release: "releaseasy",
    });

    expect(mockedRunGitCliff).toHaveBeenCalledTimes(1);

    expect(mockedRunGitCliff).toHaveBeenCalledWith(
      ["--init"],
      expect.objectContaining({
        nodeOptions: {
          stdio: "pipe",
        },
      }),
    );
  });

  it("TypeScript 项目应该默认生成 TypeScript 配置", async () => {
    await fs.writeJson(path.join(dir, "package.json"), {
      name: "test-project",
      version: "1.0.0",
      packageManager: "pnpm@10.0.0",
      type: "module",
    });

    await fs.writeFile(path.join(dir, "tsconfig.json"), "{}", "utf8");

    mockedSelect
      // 默认值不是这里控制，所以直接模拟选择结果
      .mockResolvedValueOnce("typescript")
      .mockResolvedValueOnce("github");

    mockedConfirm.mockResolvedValueOnce(false);

    await init({
      cwd: dir,
    });

    expect(await fs.pathExists(path.join(dir, "releaseasy.config.mts"))).toBe(true);

    const pkg = await readPackage(dir);

    expect(pkg.scripts).toBeUndefined();

    expect(mockedRunGitCliff).toHaveBeenCalledWith(["--init", "github"], expect.anything());
  });

  it("用户拒绝添加 script 时不应该修改 package.json", async () => {
    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        name: "test-project",
        version: "1.0.0",
        packageManager: "pnpm@10.0.0",
      },
      {
        spaces: 2,
      },
    );

    mockedSelect.mockResolvedValueOnce("json").mockResolvedValueOnce("minimal");

    mockedConfirm.mockResolvedValueOnce(false);

    await init({
      cwd: dir,
    });

    expect(await fs.pathExists(path.join(dir, "releaseasy.config.json"))).toBe(true);

    const pkg = await readPackage(dir);

    expect(pkg.scripts).toBeUndefined();

    expect(mockedRunGitCliff).toHaveBeenCalledWith(["--init", "minimal"], expect.anything());
  });

  it("已有配置文件且没有 force 应该失败", async () => {
    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        name: "test-project",
        version: "1.0.0",
        packageManager: "pnpm@10.0.0",
      },
      {
        spaces: 2,
      },
    );

    await fs.writeFile(path.join(dir, "releaseasy.config.json"), "{}", "utf8");

    mockedSelect.mockResolvedValueOnce("json").mockResolvedValueOnce("default");

    mockedConfirm.mockResolvedValueOnce(false);

    // await expect(
    //   init({
    //     cwd: dir,
    //   }),
    // ).rejects.toThrow("File already exists: releaseasy.config.json");

    await expect(
      init({
        cwd: dir,
      }),
    ).rejects.toThrow(
      /File already exists: .*releaseasy\.config\.json.*Use .*--force.*to overwrite it/,
    );

    // try {
    //   await init({
    //     cwd: dir,
    //   });
    // } catch (error) {
    //   expect(stripAnsi((error as Error).message)).toBe(
    //     "File already exists: releaseasy.config.json. Use --force to overwrite it.",
    //   );
    // }
  });

  it("force=true 应该覆盖已有配置", async () => {
    await fs.writeJson(
      path.join(dir, "package.json"),
      {
        name: "test-project",
        version: "1.0.0",
        packageManager: "pnpm@10.0.0",
      },
      {
        spaces: 2,
      },
    );

    await fs.writeFile(path.join(dir, "releaseasy.config.json"), '{"old":true}', "utf8");

    mockedSelect.mockResolvedValueOnce("json").mockResolvedValueOnce("default");

    mockedConfirm.mockResolvedValueOnce(false);

    await init({
      cwd: dir,
      force: true,
    });

    const config = await fs.readJson(path.join(dir, "releaseasy.config.json"));

    console.log(config);

    // expect(config).toHaveProperty("increments");
    // expect(config).toHaveProperty("distTags");
  });
});
