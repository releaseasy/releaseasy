import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import fs from "fs-extra";
import { x } from "tinyexec";
import { describe, it, beforeEach, afterEach } from "vitest";

describe("hello", () => {
  let dir;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "release-cli-test-"));
    console.log(dir);

    await fs.outputJson(
      path.join(dir, "packagea.json"),
      {
        name: "fixture-project",
        version: "1.0.0",
      },
      { spaces: 2 },
    );

    await x("git", ["init"], {
      nodeOptions: {
        cwd: dir,
      },
    });

    await x("git", ["config", "user.name", "Vitest"], {
      nodeOptions: {
        cwd: dir,
      },
    });

    await x("git", ["config", "user.email", "vitest@example.com"], {
      nodeOptions: {
        cwd: dir,
      },
    });

    await x("git", ["add", "."], {
      nodeOptions: {
        cwd: dir,
      },
    });

    await x("git", ["commit", "-m", "Initial commit"], {
      nodeOptions: {
        cwd: dir,
      },
    });

    // 创建一个假的 remote
    await x("git", ["remote", "add", "origin", "https://github.com/example/fixture.git"], {
      nodeOptions: {
        cwd: dir,
      },
    });
  });

  afterEach(async () => {
    await fs.remove(dir);
  });
  it("returns a greeting", () => {});
});
