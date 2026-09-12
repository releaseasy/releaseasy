import fs from "node:fs/promises";
import path from "node:path";
import { writePackageJSON } from "pkg-types";
import CONSTANTS from "../constants/index.js";

export async function addScripts(context) {
  const { packageJson, packageJsonPath } = context;

  // const scripts = packageJson.scripts ?? {};

  // const additions = {
  //   // 刚好默认的命令就是cli的名称
  //   release: `${CONSTANTS.CLI_NAME} release`,
  // };

  // const conflicts = Object.keys(additions).filter((name) => name in scripts);

  // if (conflicts.length > 0) {
  //   context.changed = false;
  //   return;
  // }

  // packageJson.scripts = {
  //   ...scripts,
  //   ...additions,
  // };

  // // 写入pkg.json
  // writePackageJSON(packageJsonPath, packageJson);

  // context.changed = true;
}
