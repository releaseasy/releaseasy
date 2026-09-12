import { readPackageJSON, writePackageJSON } from "../utils/index.js";

export async function bump(context) {
  const { version, tag, packageJsonPath } = context;

  const pkg = await readPackageJSON(packageJsonPath);

  // 写入版本号
  pkg.version = version;

  // 写入tag
  pkg.publishConfig = {
    ...pkg.publishConfig,
    tag,
  };

  await writePackageJSON(packageJsonPath, pkg);
}
