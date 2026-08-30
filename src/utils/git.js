import { x } from "tinyexec";
import { defu } from "../utils/index.js";

function git(options, args, execOptions = {}) {
  return x(
    "git",
    args,
    defu(execOptions, {
      throwOnError: true,
      nodeOptions: {
        stdio: "pipe",
        cwd: options.cwd,
      },
    }),
  );
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
}

export async function rollback(options, context, initialCommitSha) {
  await deleteTag(options, context);
  await reset(options, initialCommitSha);
}

export async function gitChangeset(options, execOptions = {}) {
  await git(options, ["status", "--porcelain"], execOptions);
}

export async function add(options, execOptions = {}) {
  await git(options, ["add", "."], execOptions);
}

export async function commit(options, commitMessage, execOptions = {}) {
  await git(options, ["commit", ...options.git.commitArgs, "-m", commitMessage], execOptions);
}

export async function tag(options, tagName, execOptions = {}) {
  await git(options, ["tag", "-f", tagName], execOptions);
}

export async function push(options, tagName, execOptions = {}) {
  await git(options, ["push", "origin", "HEAD", `refs/tags/${tagName}`], execOptions);
}
