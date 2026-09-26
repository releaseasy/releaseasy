import { readPackageJSON, writePackageJSON, runHook } from "../utils/index.js";

export async function bump(options, context) {
  const { version, distTag, packageJsonPath } = context;

  await runHook(options, "before:bump", context);

  const pkg = await readPackageJSON(packageJsonPath);

  // 写入版本号
  pkg.version = version;

  // 写入tag
  pkg.publishConfig = {
    ...pkg.publishConfig,
    tag: distTag,
  };

  await writePackageJSON(packageJsonPath, pkg);

  await runHook(options, "after:bump", context);
}
