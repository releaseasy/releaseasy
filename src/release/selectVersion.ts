import { input, select } from "@inquirer/prompts";
import { gt, inc, valid, type ReleaseType } from "semver";

import type { ResolvedOptions, ReleaseContext } from "../config/types.ts";
import { interpolate } from "../utils/index.ts";

// "custom" 保留字面量提示，同时允许任意版本号字符串
type ChoiceValue = ReleaseType | "custom" | (string & {});

export async function selectVersion(options: ResolvedOptions, context: ReleaseContext) {
  const { git, increments } = options;
  const { latestVersion } = context;

  const choices = increments
    .map((type) => {
      const version = inc(latestVersion, type);

      if (version === null) {
        return {
          name: `${type}`,
          value: "",
          disabled: true as const,
        };
      }

      return {
        name: `${type} (${version})`,
        value: version,
      };
    })
    .concat([
      {
        name: "custom",
        value: "custom",
      },
    ]);

  let nextVersion = await select<ChoiceValue>({
    message: "Select release type",
    choices,
    loop: false,
  });

  if (nextVersion === "custom") {
    nextVersion = await input({
      message: "Input custom version",
      default: latestVersion,
      validate(value) {
        const v = value.trim();

        if (!valid(v)) {
          return "Invalid semver version";
        }

        if (!gt(v, latestVersion)) {
          return `Version must be greater than current version: ${latestVersion}`;
        }

        return true;
      },
    });
  }

  // 保存到上下文中
  context.version = nextVersion;
  context.tagName = interpolate(git.tagName, context);
  context.commitMessage = interpolate(git.commitMessage, context);
}
