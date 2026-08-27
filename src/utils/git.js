import { x } from "tinyexec";

function git(options, args, execOptions = {}) {
  return x("git", args, {
    throwOnError: true,
    nodeOptions: {
      cwd: options.cwd,
    },
    ...execOptions,
  });
}

export async function isGitAvailable(options) {
  try {
    await git(options, ["--version"]);
    return true;
  } catch {
    return false;
  }
}

export async function isGitRepository(options) {
  try {
    const { stdout } = await git(options, ["rev-parse", "--is-inside-work-tree"]);

    return stdout.trim() === "true";
  } catch {
    return false;
  }
}

export async function isWorkingTreeClean(options) {
  const { stdout } = await git(options, ["status", "--porcelain"]);

  return stdout.trim().length === 0;
}

export async function getRemoteUrl(options) {
  try {
    const { stdout } = await git(options, ["remote", "get-url", "origin"]);

    return stdout.trim();
  } catch {
    return "";
  }
}

export async function getGitCurrentBranch(options) {
  const { stdout } = await git(options, ["symbolic-ref", "--short", "HEAD"]);
  return stdout.trim();
}
