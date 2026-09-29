import fs from "node:fs/promises";
import path from "node:path";

import type { PackageJson } from "pkg-types";

import { isFile } from "./fs.ts";

export async function resolvePackageJSON(cwd: string): Promise<string> {
  const packageJsonPath = path.join(cwd, "package.json");

  if (!(await isFile(packageJsonPath))) {
    throw new Error(`No package.json found in ${cwd}`);
  }

  return packageJsonPath;
}

export async function readPackageJSON(packageJsonPath: string): Promise<PackageJson> {
  const content = await fs.readFile(packageJsonPath, "utf8");

  return JSON.parse(content) as PackageJson;
}

export async function writePackageJSON(
  packageJsonPath: string,
  packageJson: PackageJson,
): Promise<void> {
  await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
}

export async function updatePackageJSON(
  packageJsonPath: string,
  callback: (packageJson: PackageJson) => void | Promise<void>,
): Promise<PackageJson> {
  const packageJson = await readPackageJSON(packageJsonPath);

  await callback(packageJson);

  await writePackageJSON(packageJsonPath, packageJson);

  return packageJson;
}
