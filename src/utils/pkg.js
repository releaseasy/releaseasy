import fs from "node:fs/promises";
import path from "node:path";

import { isFile } from "./fs.js";

export async function resolvePackageJSON(cwd) {
  const packageJsonPath = path.join(cwd, "package.json");

  if (!(await isFile(packageJsonPath))) {
    throw new Error(`No package.json found in ${cwd}`);
  }
  return packageJsonPath;
}

export async function readPackageJSON(packageJsonPath) {
  const content = await fs.readFile(packageJsonPath, "utf8");

  return JSON.parse(content);
}

export async function writePackageJSON(packageJsonPath, packageJson) {
  await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
}

export async function updatePackageJSON(packageJsonPath, callback) {
  const packageJson = await readPackageJSON(packageJsonPath);

  await callback(packageJson);

  await writePackageJSON(packageJsonPath, packageJson);

  return packageJson;
}
