import path from "node:path";

import fs from "fs-extra";
import type { PackageJson } from "pkg-types";

export async function readPackage(cwd: string) {
  return (await fs.readJSON(path.join(cwd, "package.json"))) as PackageJson;
}

export async function writePackageJson(
  dir: string,
  options: {
    name?: boolean;
    version?: boolean;
    packageManager?: boolean;
  } = {},
) {
  const { name = true, version = true, packageManager = true } = options;

  const packageJson: PackageJson = {};

  if (name) {
    packageJson.name = "test-project";
  }

  if (version) {
    packageJson.version = "1.0.0";
  }

  if (packageManager) {
    packageJson.packageManager = "pnpm@10.0.0";
  }

  await fs.writeJson(path.join(dir, "package.json"), packageJson, { spaces: 2 });
}

export async function updatePackageJson(dir: string, updates: Partial<PackageJson>) {
  const file = path.join(dir, "package.json");

  const packageJson = (await fs.readJson(file)) as PackageJson;

  Object.assign(packageJson, updates);

  await fs.writeJson(file, packageJson, { spaces: 2 });
}
