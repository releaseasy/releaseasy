import { readPackageJSON, writePackageJSON } from "pkg-types";

export default async function bump(options, context) {
  const pkg = await readPackageJSON(options.cwd);

  // 写入版本号
  pkg.version = context.version;

  // 写入tag
  pkg.publishConfig = {
    ...pkg.publishConfig,
    tag: context.tag,
  };

  await writePackageJSON(`${options.cwd}/package.json`, pkg);
}
