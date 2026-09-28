import path from "node:path";

import ansis from "ansis";
import { resolveCommand } from "package-manager-detector/commands";
import { valid } from "semver";

import type { ReleaseContext, ResolvedOptions } from "../config/types.ts";
import CONSTANTS from "../constants/index.ts";
import {
  isGitAvailable,
  isGitRepository,
  isWorkingTreeClean,
  getRemoteUrl,
  assertDirectory,
  resolvePackageJSON,
  getCurrentCommitSha,
  getCurrentBranch,
  readPackageJSON,
  detectPackageManager,
  exists,
  formatCommand,
  isChangelogEnabled,
} from "../utils/index.ts";

export async function createContext(options: ResolvedOptions): Promise<ReleaseContext> {
  const { cwd, git } = options;

  // 判断目录
  const resolvedCwd = await assertDirectory(cwd);
  const packageJsonPath = await resolvePackageJSON(cwd);
  const packageManager = await detectPackageManager(resolvedCwd);

  if (!(await isGitAvailable(options))) {
    throw new Error(
      "Git is not installed or not available in your PATH. Please install Git to continue.",
    );
  }

  if (!(await isGitRepository(options))) {
    throw new Error("Current working directory is not a git repository.");
  }

  if (!(await isWorkingTreeClean(options))) {
    throw new Error("Working directory is not clean. Please commit your changes.");
  }

  const remoteUrl = await getRemoteUrl(options);

  if (!remoteUrl) {
    throw new Error(
      "No Git remote repository found (e.g. 'origin'). Please add a remote using 'git remote add origin <url>'.",
    );
  }

  const { name, version } = await readPackageJSON(packageJsonPath);

  if (!name || name.trim() === "") {
    throw new Error(`package.json "name" must be a non-empty string.`);
  }

  if (!version || !valid(version)) {
    throw new Error(`package.json "version" must be a valid semver version.`);
  }

  const initialCommitSha = await getCurrentCommitSha(options);

  const branchName = await getCurrentBranch(options);

  if (!matchBranch(git.requireBranch, branchName)) {
    throw new Error(
      `Release is only allowed on ${String(git.requireBranch)}, current: ${branchName}`,
    );
  }

  let resolvedCliffFile: string | undefined;
  // 提前抛出配置缺少的错误,用户体验更好

  if (isChangelogEnabled(options)) {
    // 判断配置文件是否存在
    resolvedCliffFile = path.join(resolvedCwd, options.git.changelog.configFile);

    const initCommand = resolveCommand(packageManager.agent, "execute-local", [
      CONSTANTS.CLI_NAME,
      "init",
    ]);

    const changelogCommand = resolveCommand(packageManager.agent, "execute-local", [
      CONSTANTS.CLI_NAME,
      "changelog",
      "--init",
      "[template]",
    ]);

    if (!initCommand || !changelogCommand) {
      throw new Error(
        `Unable to resolve the package manager command for "${packageManager.agent}".`,
      );
    }

    if (!(await exists(resolvedCliffFile))) {
      throw Error(
        `Could not find the Git-cliff configuration file: ${ansis.yellow(resolvedCliffFile)}\n` +
          `Run "${ansis.cyan(formatCommand(initCommand))}" to initialize the configuration.\n` +
          `or "${ansis.cyan(formatCommand(changelogCommand))}" to initialize the Git-cliff configuration.`,
      );
    }
  }

  const obj: ReleaseContext = Object.create(null);

  obj.name = name;
  obj.resolvedCwd = resolvedCwd;
  obj.resolvedCliffFile = resolvedCliffFile;
  obj.initialCommitSha = initialCommitSha;
  obj.latestVersion = version;
  obj.remoteUrl = remoteUrl;
  obj.packageJsonPath = packageJsonPath;
  obj.tagCreated = false;
  obj.branchName = branchName;

  return obj;
}

function matchBranch(requireBranch: ResolvedOptions["git"]["requireBranch"], inputBranch: string) {
  if (requireBranch === false) return true;

  if (typeof requireBranch === "string") {
    return requireBranch === inputBranch;
  }

  if (Array.isArray(requireBranch)) {
    return requireBranch.includes(inputBranch);
  }

  if (requireBranch instanceof RegExp) {
    return requireBranch.test(inputBranch);
  }

  return false;
}
