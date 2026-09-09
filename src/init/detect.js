import path from "node:path";
import { readPackageJSON } from "pkg-types";
import { isDirectory, isFile, exists } from "../utils/fs.js";

export async function detectEnvironment(cwd) {
  const resolvedCwd = path.resolve(cwd);

  if (!(await isDirectory(resolvedCwd))) {
    throw new Error(`Directory does not exist: ${resolvedCwd}`);
  }

  const packageJsonPath = path.join(resolvedCwd, "package.json");

  if (!(await isFile(packageJsonPath))) {
    throw new Error(`No package.json found in ${resolvedCwd}`);
  }

  const packageJson = await readPackageJSON(resolvedCwd);

  return {
    cwd: resolvedCwd,
    packageJson,
    hasTsConfig: await exists(path.join(resolvedCwd, "tsconfig.json")),
    moduleFormat: packageJson.type === "module" ? "esm" : "commonjs",
  };
}
