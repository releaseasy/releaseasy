import path from "node:path";
import { detect } from "package-manager-detector/detect";
import {
  exists,
  assertDirectory,
  resolvePackageJSON,
  readPackageJSON,
  isPackageInstalled,
} from "../utils/index.js";

export async function createContext(options) {
  const { cwd } = options;
  const resolvedCwd = await assertDirectory(cwd);

  const packageJsonPath = await resolvePackageJSON(resolvedCwd);

  const packageManager = await detect({ cwd: resolvedCwd });
  if (!packageManager) {
    throw new Error("Could not detect the package manager used by this project.");
  }

  const packageJson = await readPackageJSON(packageJsonPath);

  return {
    cwd: resolvedCwd,
    packageManager,
    packageJsonPath,
    isTypeScriptProject: await isTypeScriptProject(resolvedCwd),
    moduleFormat: packageJson.type === "module" ? "esm" : "commonjs",
  };
}

async function isTypeScriptProject(cwd) {
  return (await exists(path.join(cwd, "tsconfig.json"))) || isPackageInstalled(cwd, "typescript");
}
