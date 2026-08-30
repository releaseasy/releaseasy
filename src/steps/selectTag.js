import { select } from "@inquirer/prompts";
import { prerelease } from "semver";

export default async function selectTag(options, context) {
  const isPrerelease = Boolean(prerelease(context.version));

  const enabled = [];
  const disabled = [];

  for (const tag of options.distTags) {
    const item = {
      name: tag,
      value: tag,
      disabled: isPrerelease && tag === "latest",
    };
    (item.disabled ? disabled : enabled).push(item);
  }

  const choices = [...enabled, ...disabled];

  const tag = await select({
    message: "What do you want to tag",
    choices: choices,
  });

  // 赋值给上下文
  context.tag = tag;
}
