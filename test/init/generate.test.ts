import { describe, expect, it } from "vitest";

import { resolveConfigExtension } from "../../src/init/generate.ts";

describe("resolveConfigExtension", () => {
  it("esm javascript 返回 mjs", () => {
    expect(
      resolveConfigExtension({
        configFormat: "javascript",
        moduleFormat: "esm",
      } as any),
    ).toBe("mjs");
  });

  it("commonjs typescript 返回 cts", () => {
    expect(
      resolveConfigExtension({
        configFormat: "typescript",
        moduleFormat: "commonjs",
      } as any),
    ).toBe("cts");
  });

  it("未知类型抛错", () => {
    expect(() =>
      resolveConfigExtension({
        configFormat: "xxx",
      } as any),
    ).toThrow();
  });
});
