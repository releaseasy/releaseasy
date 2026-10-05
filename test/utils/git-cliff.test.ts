import { describe, it, expect, vi, beforeEach } from "vitest";

const execMock = vi.fn();

vi.mock("tinyexec", () => ({
  x: (...args: any[]) => {
    return execMock(...args);
  },
}));

import { runGitCliff } from "../../src/utils/git-cliff.ts";

vi.unmock("../../src/utils/git-cliff.ts");

describe("git-cliff", () => {
  beforeEach(async () => {
    vi.resetModules();
  });

  it("应该执行git cliff", async () => {
    execMock.mockResolvedValue({
      exitCode: 0,
    });

    const result = await runGitCliff(["--version"]);

    expect(execMock).toHaveBeenCalled();

    expect(result.exitCode).toBe(0);
  });
});
