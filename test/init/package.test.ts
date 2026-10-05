import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import fs from "fs-extra";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { addScripts } from "../../src/init/package.ts";
import { readPackage } from "../helpers/index.ts";

describe("addScripts", () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "release-cli-test-add-script"));
  });

  afterEach(async () => {
    await fs.remove(dir);
  });

  it("已有 release script 时不覆盖", async () => {
    await fs.writeJson(path.join(dir, "package.json"), {
      name: "test",
      version: "1.0.0",
      scripts: {
        release: "old-command",
      },
    });

    const context = {
      packageJsonPath: path.join(dir, "package.json"),
      shouldAddScripts: true,
    } as any;

    await addScripts(context);

    const pkg = await readPackage(dir);

    expect(pkg.scripts!.release).toBe("old-command");
  });
});
