import path from "node:path";
import { readPackageJSON } from "pkg-types";
import { detect } from "package-manager-detector/detect";
import { isDirectory, isFile, exists } from "../utils/fs.js";

export async function createContext(options) {
  const { cwd } = options;
  const resolvedCwd = path.resolve(cwd);

  if (!(await isDirectory(resolvedCwd))) {
    throw new Error(`Directory does not exist: ${resolvedCwd}`);
  }

  const packageJsonPath = path.join(resolvedCwd, "package.json");
  if (!(await isFile(packageJsonPath))) {
    throw new Error(`No package.json found in ${resolvedCwd}`);
  }

  const packageManager = await detect({ cwd: resolvedCwd });
  if (!packageManager) {
    throw new Error("Could not detect the package manager used by this project.");
  }

  const packageJson = await readPackageJSON(resolvedCwd);

  return {
    cwd: resolvedCwd,
    packageManager,
    packageJsonPath,
    packageJson,
    hasTsConfig: await exists(path.join(resolvedCwd, "tsconfig.json")),
    moduleFormat: packageJson.type === "module" ? "esm" : "commonjs",
  };
}
