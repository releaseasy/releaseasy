import { readPackageJSON, writePackageJSON } from "../utils/index.js";

export async function bump(options, context) {
  const { cwd } = options;

  const pkg = await readPackageJSON(cwd);

  // 写入版本号
  pkg.version = context.version;

  // 写入tag
  pkg.publishConfig = {
    ...pkg.publishConfig,
    tag: context.tag,
  };

  await writePackageJSON(`${cwd}/package.json`, pkg);
}
