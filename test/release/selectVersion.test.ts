import { select } from "@inquirer/prompts";
import { describe, expect, it, vi } from "vitest";

import type { ResolvedOptions, ReleaseContext } from "../../src/config/types.ts";
import { selectVersion } from "../../src/release/selectVersion.ts";
import type { Choice } from "../integration/release.test.ts";

export type VersionChoice = Choice<string>;

const mockedSelect = vi.mocked(select);

describe("selectVersion", () => {
  it("当package.json的version本身非预发布版本时,increments启用release时会为null，则生成disabled选项", async () => {
    const options = {
      increments: [
        "major",
        "premajor",
        "minor",
        "preminor",
        "patch",
        "prepatch",
        "prerelease",
        "release",
      ],
      git: {
        tagName: "v${version}",
        commitMessage: "release: v${version}",
      },
    } as ResolvedOptions;

    const context = {
      latestVersion: "1.0.0",
    } as ReleaseContext;

    mockedSelect.mockImplementationOnce(async (config) => {
      const choices = config.choices as readonly VersionChoice[];

      const releaseChoice = choices.find((choice) => choice.value === "");

      expect(releaseChoice).toEqual({
        name: "release",
        value: "",
        disabled: true,
      });

      return "1.0.1";
    });

    await selectVersion(options, context);

    expect(mockedSelect).toHaveBeenCalledTimes(1);
  });
});
