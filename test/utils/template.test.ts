import { describe, expect, it } from "vitest";

import type { ReleaseContext } from "../../src/config/types.ts";
import { interpolate, sprintf } from "../../src/utils/template.ts";

describe("template", () => {
  describe("interpolate", () => {
    it("应该替换上下文变量", () => {
      const result = interpolate("v${version}", {
        version: "1.2.3",
      } satisfies Partial<ReleaseContext>);

      expect(result).toBe("v1.2.3");
    });

    it("访问非对象路径时应该返回 undefined", () => {
      expect(() =>
        interpolate("${version.foo}", {
          version: "1.2.3",
        }),
      ).toThrow("Unknown template variable: version.foo");
    });

    it("变量不存在时应该抛错", () => {
      expect(() =>
        interpolate("${unknown}", {
          version: "1.2.3",
        }),
      ).toThrow("Unknown template variable: unknown");
    });
  });

  describe("sprintf", () => {
    it("应该替换%s占位符", () => {
      const result = sprintf("release %s %s", "v1.0.0", "latest");

      expect(result).toBe("release v1.0.0 latest");
    });

    it("参数不足应该抛错", () => {
      expect(() => sprintf("release %s %s", "v1.0.0")).toThrow("Missing template argument");
    });

    it("参数过多应该抛错", () => {
      expect(() => sprintf("release %s", "v1.0.0", "extra")).toThrow("Too many template arguments");
    });
  });
});
