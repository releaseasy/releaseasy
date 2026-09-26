import path from "node:path";

import ansis from "ansis";
import { resolveCommand } from "package-manager-detector/commands";
import { valid } from "semver";

import CONSTANTS from "../constants/index.js";
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
} from "../utils/index.js";

export async function createContext(options) {
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

  let initialCommitSha;
  try {
    initialCommitSha = await getCurrentCommitSha(options);
  } catch (_error) {
    throw new Error("Failed to determine current Git commit.", {
      cause: _error,
    });
  }

  let branchName;
  try {
    branchName = await getCurrentBranch(options);
  } catch {
    throw new Error("Failed to determine current Git branch.");
  }

  if (!matchBranch(git.requireBranch, branchName)) {
    throw new Error(
      `Release is only allowed on ${String(git.requireBranch)}, current: ${branchName}`,
    );
  }

  let resolvedCliffFile;
  // 提前抛出配置缺少的错误,用户体验更好
  if (git.changelog !== false) {
    // 判断配置文件是否存在
    resolvedCliffFile = path.join(resolvedCwd, git.changelog.configFile);

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

    if (!(await exists(resolvedCliffFile))) {
      throw Error(
        `Could not find the Git-cliff configuration file: ${ansis.yellow(resolvedCliffFile)}\n` +
          `Run "${ansis.cyan(formatCommand(initCommand))}" to initialize the configuration.\n` +
          `or "${ansis.cyan(formatCommand(changelogCommand))}" to initialize the Git-cliff configuration.`,
      );
    }
  }

  return {
    name,
    resolvedCwd,
    resolvedCliffFile,
    latestVersion: version,
    remoteUrl,
    packageJsonPath,
    tagCreated: false,
    initialCommitSha,
    branchName,
  };
}

function matchBranch(requireBranch, inputBranch) {
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
