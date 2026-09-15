import path from "node:path";
import { detect } from "package-manager-detector/detect";
import {
  exists,
  assertDirectory,
  resolvePackageJSON,
  readPackageJSON,
  isPackageInstalled,
  detectPackageManager,
} from "../utils/index.js";

export async function createContext(options) {
  const { cwd } = options;
  const resolvedCwd = await assertDirectory(cwd);

  const packageJsonPath = await resolvePackageJSON(resolvedCwd);

  const packageManager = await detectPackageManager(resolvedCwd);

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
