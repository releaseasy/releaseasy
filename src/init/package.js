import fs from "node:fs/promises";
import path from "node:path";
import CONSTANTS from "../constants/index.js";
import { hasScripts, readPackageJSON, writePackageJSON } from "../utils/index.js";

export async function addScripts(context) {
  const { packageJsonPath, addScripts } = context;

  // 如果拒绝就直接返回
  if (!addScripts) return;

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
  writePackageJSON(packageJsonPath, packageJson);
}
