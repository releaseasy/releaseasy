import { describe, expect, it, vi } from "vitest";

vi.mock("../src/release.ts", () => ({
  release: vi.fn(),
}));
vi.mock("../src/init.ts", () => ({
  init: vi.fn(),
}));

vi.mock("../src/utils/index.ts", () => ({
  runGitCliff: vi.fn().mockResolvedValue({
    exitCode: 0,
  }),
}));
import { program } from "../src/cli.ts";
import { init } from "../src/init.ts";
import { release } from "../src/release.ts";
import { runGitCliff } from "../src/utils/index.ts";

describe("CLI 命令", () => {
  it("应该注册 release 命令", () => {
    const command = program.commands.find((item) => item.name() === "release");

    expect(command).toBeDefined();
  });

  it("应该注册 init 命令", () => {
    const command = program.commands.find((item) => item.name() === "init");

    expect(command).toBeDefined();
  });

  it("应该注册 changelog 命令", () => {
    const command = program.commands.find((item) => item.name() === "changelog");

    expect(command).toBeDefined();
  });

  it("默认命令应该执行 release", async () => {
    await program.parseAsync(["node", "releaseasy"]);

    expect(release).toHaveBeenCalled();
  });

  it("release 命令应该传递 dryRun 参数", async () => {
    await program.parseAsync(["node", "releaseasy", "release", "--dry-run"]);

    expect(release).toHaveBeenCalledWith(
      expect.objectContaining({
        dryRun: true,
      }),
    );
  });

  it("verbose 参数应该支持累加", async () => {
    await program.parseAsync(["node", "releaseasy", "release", "-vvv"]);

    expect(release).toHaveBeenCalledWith(
      expect.objectContaining({
        verbose: 3,
      }),
    );
  });

  it("init 命令应该调用 init", async () => {
    await program.parseAsync(["node", "releaseasy", "init", "--force"]);

    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        force: true,
      }),
    );
  });

  it("changelog 命令应该透传参数给 runGitCliff", async () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);

    await program.parseAsync([
      "node",
      "releaseasy",
      "changelog",
      "--tag",
      "v1.0.0",
      "--output",
      "CHANGELOG.md",
    ]);

    expect(runGitCliff).toHaveBeenCalledWith(["--tag", "v1.0.0", "--output", "CHANGELOG.md"], {
      throwOnError: false,
    });

    expect(exitSpy).toHaveBeenCalledWith(0);

    exitSpy.mockRestore();
  });
});
