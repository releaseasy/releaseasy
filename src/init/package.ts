import CONSTANTS from "../constants/index.js";
import { readPackageJSON, writePackageJSON } from "../utils/index.js";

export async function addScripts(context) {
  const { packageJsonPath, shouldAddScripts } = context;

  // 如果拒绝就直接返回
  if (!shouldAddScripts) return;

  const packageJson = await readPackageJSON(packageJsonPath);
  const scripts = packageJson.scripts ?? {};

  const conflicts = Object.keys(CONSTANTS.DEFAULT_SCRIPTS).filter((name) => name in scripts);

  if (conflicts.length > 0) {
    return;
  }

  packageJson.scripts = {
    ...scripts,
    ...CONSTANTS.DEFAULT_SCRIPTS,
  };

  // 写入pkg.json
  await writePackageJSON(packageJsonPath, packageJson);
}
