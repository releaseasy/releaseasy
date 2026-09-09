import { input, select } from "@inquirer/prompts";
import { gt, inc, prerelease, valid } from "semver";
import { interpolate } from "../utils/interpolate";

export default async function selectVersion(options, context) {
  let targetVersion;
  const isPrerelease = prerelease(context.latestVersion);

  // 构建版本选项
  const choices = options.increments.map((type) => ({
    name: `${type} (${inc(context.latestVersion, type)})`,
    value: inc(context.latestVersion, type),
  }));

  // 如果当前是预发布版本，插入 prerelease 选项
  if (isPrerelease) {
    choices.unshift({
      name: `prerelease (${inc(context.latestVersion, "prerelease")})`,
      value: inc(context.latestVersion, "prerelease"),
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
      default: context.latestVersion,
      validate(value) {
        const v = value.trim();

        if (!valid(v)) {
          return "Invalid semver version";
        }

        if (!gt(v, context.latestVersion)) {
          return `Version must be greater than current version: ${context.latestVersion}`;
        }

        return true;
      },
    });
  }

  // 赋值给上下文
  context.version = targetVersion;

  context.git.tagName = interpolate(options.git.tagName, context);
  context.git.commitMessage = interpolate(options.git.commitMessage, context);
}
