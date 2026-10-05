import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import fs from "fs-extra";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { loadConfig } from "../../src/config/load.ts";
import type { InlineConfig } from "../../src/config/types.ts";

describe("loadConfig", () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "releaseasy-"));
  });

  afterEach(async () => {
    await fs.remove(dir);
  });

  it("配置不存在时应该返回空对象", async () => {
    const result = await loadConfig(undefined, dir);

    expect(result).toEqual({});
  });

  it("应该通过搜索加载 JSON 配置文件", async () => {
    await fs.outputJSON(path.join(dir, "releaseasy.config.json"), {
      increments: ["patch"],
    } satisfies InlineConfig);

    const result = await loadConfig(undefined, dir);

    expect(result).toEqual({
      increments: ["patch"],
    } satisfies InlineConfig);
  });

  it("应该通过指定文件路径加载配置文件", async () => {
    await fs.outputJSON(path.join(dir, "custom.json"), {
      verbose: 2,
    } satisfies InlineConfig);

    const result = await loadConfig("custom.json", dir);

    expect(result).toEqual({
      verbose: 2,
    } satisfies InlineConfig);
  });

  it("应该加载 TS 配置文件的默认导出", async () => {
    const file = path.join(dir, "releaseasy.config.ts");

    await writeFile(
      file,
      `
      export default {
        increments:["minor"]
      }
      `,
    );

    const result = await loadConfig(file, dir);

    expect(result).toEqual({
      increments: ["minor"],
    } satisfies InlineConfig);
  });
});
