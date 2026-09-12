import { input, select } from "@inquirer/prompts";
import { gt, inc, prerelease, valid } from "semver";
import { interpolate } from "../utils/index.js";

export async function selectVersion(options, context) {
  const { git, increments } = options;
  const { latestVersion } = context;
  let targetVersion;
  const isPrerelease = prerelease(latestVersion);

  // 构建版本选项
  const choices = increments.map((type) => ({
    name: `${type} (${inc(latestVersion, type)})`,
    value: inc(latestVersion, type),
  }));

  // 如果当前是预发布版本，插入 prerelease 选项
  if (isPrerelease) {
    choices.unshift({
      name: `prerelease (${inc(latestVersion, "prerelease")})`,
      value: inc(latestVersion, "prerelease"),
    });
  }

  // custom 始终放最后
  choices.push({
    name: "custom",
    value: "custom",
  });

  const release = await select({
    message: "What do you want to release",
    choices,
  });

  targetVersion = release;

  // 自定义版本号
  if (release === "custom") {
    targetVersion = await input({
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

  // 赋值给上下文
  context.version = targetVersion;

  Object.assign(context, {
    tagName: interpolate(git.tagName, context),
    commitMessage: interpolate(git.commitMessage, context),
  });
}
