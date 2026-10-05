import { describe, expect, it } from "vitest";

import { defineConfig } from "../src/index.ts";

describe("defineConfig", () => {
  it("应该返回相同的配置对象", () => {
    const config = {
      verbose: 2,
      dryRun: true,
    };

    const result = defineConfig(config as any);

    expect(result).toBe(config);
  });

  it("应该保留配置中的值", () => {
    const config = {
      increments: ["patch", "minor"],
      distTags: ["latest"],
    };

    expect(defineConfig(config as any)).toEqual(config);
  });
});
