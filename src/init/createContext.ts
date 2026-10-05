import path from "node:path";

import type { InitContext, ResolvedInitOptions } from "../config/types.ts";
import {
  exists,
  assertDirectory,
  resolvePackageJSON,
  readPackageJSON,
  isPackageInstalled,
  detectPackageManager,
} from "../utils/index.ts";

export async function createContext(options: ResolvedInitOptions): Promise<InitContext> {
  const { cwd } = options;
  const resolvedCwd = await assertDirectory(cwd);

  const packageJsonPath = await resolvePackageJSON(resolvedCwd);

  const packageManager = await detectPackageManager(resolvedCwd);

  const packageJson = await readPackageJSON(packageJsonPath);

  const context: InitContext = Object.create(null);

  context.resolvedCwd = resolvedCwd;
  context.packageManager = packageManager;
  context.packageJsonPath = packageJsonPath;
  context.isTypeScriptProject = await isTypeScriptProject(resolvedCwd);
  context.moduleFormat = packageJson.type === "module" ? "esm" : "commonjs";
  return context;
}

async function isTypeScriptProject(cwd: string) {
  return (await exists(path.join(cwd, "tsconfig.json"))) || isPackageInstalled(cwd, "typescript");
}
