import { describe, expect, it } from "vitest";

import { createSpinner } from "../../src/utils/spinner.ts";

describe("spinner", () => {
  it("应该创建禁用状态的加载动画", () => {
    const spinner = createSpinner("hello", {
      verbose: 3,
    } as any);

    expect(spinner).toBeDefined();

    expect(typeof spinner.start).toBe("function");
  });
});
