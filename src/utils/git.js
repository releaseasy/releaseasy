import { x } from "tinyexec";
import { defu, getStdio } from "../utils/index.js";

function getExecOptions(options) {
  return {
    throwOnError: true,
    nodeOptions: {
      cwd: options.cwd,
      stdio: "pipe",
    },
  };
}

function git(options, args, execOptions = {}) {
  return x("git", args, defu(execOptions, getExecOptions(options)));
}

function gitWithVerbose(options, args) {
  return git(options, args, {
    nodeOptions: {
      stdio: getStdio(options),
    },
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

export async function getWorkingTreeChanges(options) {
  return await git(options, ["status", "--porcelain"], {
    nodeOptions: {
      stdio: "inherit",
    },
  });
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

export async function getCurrentBranch(options) {
  const { stdout } = await git(options, ["symbolic-ref", "--short", "HEAD"]);
  return stdout.trim();
}

export async function getCurrentCommitSha(options) {
  const { stdout } = await git(options, ["rev-parse", "HEAD"]);

  return stdout.trim();
}

async function deleteTag(options, context) {
  if (!context.git.tagCreated) {
    return;
  }
  await git(options, ["tag", "-d", context.git.tagName]);
}

async function reset(options, initialCommitSha) {
  if (!initialCommitSha) {
    return;
  }

  await git(options, ["reset", "--hard", initialCommitSha]);

  // 删除 release 过程中产生的 untracked files / directories
  await git(options, ["clean", "-fd"]);
}

export async function rollback(options, context, initialCommitSha) {
  await deleteTag(options, context);
  await reset(options, initialCommitSha);
}

export async function add(options) {
  await gitWithVerbose(options, ["add", "."]);
}

export async function commit(options, context) {
  await gitWithVerbose(options, [
    "commit",
    ...options.git.commitArgs,
    "-m",
    context.git.commitMessage,
  ]);
}

export async function tag(options, context) {
  await gitWithVerbose(options, ["tag", "-f", context.git.tagName]);
  context.git.tagCreated = true;
}

export async function push(options, context) {
  await gitWithVerbose(options, ["push", "origin", "HEAD", `refs/tags/${context.git.tagName}`]);
}
