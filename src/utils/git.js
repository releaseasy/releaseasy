import { x } from "tinyexec";
import { defu } from "../utils/index.js";

function git(options, args, execOptions = {}) {
  return x(
    "git",
    args,
    defu(execOptions, {
      throwOnError: true,
      nodeOptions: {
        cwd: options.cwd,
        stdio: "pipe",
      },
    }),
  );
}

function gitWithVerbose(options, args) {
  // 这里后期都还要优化
  return git(options, args, {
    nodeOptions: {
      stdio: "pipe",
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
  const { tagCreated, tagName } = context;

  if (!tagCreated) {
    return;
  }
  await git(options, ["tag", "-d", tagName]);
}

async function reset(options, context) {
  const { initialCommitSha } = context;
  if (!initialCommitSha) {
    return;
  }

  await git(options, ["reset", "--hard", initialCommitSha]);

  // 删除 release 过程中产生的 untracked files / directories
  await git(options, ["clean", "-fd"]);
}

export async function rollback(options, context) {
  await deleteTag(options, context);
  await reset(options, context);
}

export async function add(options) {
  await gitWithVerbose(options, ["add", ...options.git.addArgs]);
}

export async function commit(options, context) {
  await gitWithVerbose(options, ["commit", ...options.git.commitArgs, "-m", context.commitMessage]);
}

export async function tag(options, context) {
  await gitWithVerbose(options, ["tag", "-f", context.tagName]);
  context.tagCreated = true;
}

export async function push(options, context) {
  await gitWithVerbose(options, ["push", "origin", "HEAD", `refs/tags/${context.tagName}`]);
}
