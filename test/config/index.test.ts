import { describe, expect, it } from "vitest";

import { resolveConfig } from "../../src/config/index.ts";

describe("resolveConfig", () => {
  it("应该合并默认配置", async () => {
    const result = await resolveConfig({
      cwd: process.cwd(),
    });

    expect(result.cwd).toBe(process.cwd());

    expect(result.git.tagName).toBe("v${version}");
  });

  // it("应该规范化当前工作目录", async () => {
  //   const result = await resolveConfig({
  //     cwd: ".",
  //   });

  //   expect(result.cwd).toBe(process.cwd());
  // });

  it("应该覆盖默认配置", async () => {
    const result = await resolveConfig({
      dryRun: true,
      verbose: 2,
    });

    expect(result.dryRun).toBe(true);

    expect(result.verbose).toBe(2);
  });
});
