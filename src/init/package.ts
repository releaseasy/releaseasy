import type { InitContext } from "../config/types.ts";
import CONSTANTS from "../constants/index.ts";
import { readPackageJSON, writePackageJSON } from "../utils/index.ts";

export async function addScripts(context: InitContext) {
  const { packageJsonPath, shouldAddScripts } = context;

  // 如果拒绝就直接返回
  if (!shouldAddScripts) return;

  const packageJson = await readPackageJSON(packageJsonPath);
  const scripts = packageJson.scripts ?? {};

  const conflicts = Object.keys(CONSTANTS.PKG_SCRIPTS).filter((name) => name in scripts);

  if (conflicts.length > 0) {
    return;
  }

  packageJson.scripts = {
    ...scripts,
    ...CONSTANTS.PKG_SCRIPTS,
  };

  // 写入pkg.json
  await writePackageJSON(packageJsonPath, packageJson);
}
