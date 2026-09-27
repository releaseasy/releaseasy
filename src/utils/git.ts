import { x, type Options } from "tinyexec";

import type { ResolvedOptions, ReleaseContext } from "../config/types.ts";
import { defu, execCommand } from "./helpers.ts";

async function git(options: ResolvedOptions, args: string[], execOptions: Partial<Options> = {}) {
  return await x(
    "git",
    args,
    defu(execOptions, {
      throwOnError: true,
      nodeOptions: {
        cwd: options.cwd,
        stdio: "pipe",
      },
    } satisfies Partial<Options>),
  );
}

export async function isGitAvailable(options: ResolvedOptions) {
  try {
    await git(options, ["--version"]);
    return true;
  } catch {
    return false;
  }
}

export async function isGitRepository(options: ResolvedOptions) {
  try {
    const { stdout } = await git(options, ["rev-parse", "--is-inside-work-tree"]);

    return stdout.trim() === "true";
  } catch {
    return false;
  }
}

export async function getWorkingTreeChanges(options: ResolvedOptions) {
  return await git(options, ["status", "--porcelain"], {
    nodeOptions: {
      stdio: "inherit",
    },
  });
}

export async function isWorkingTreeClean(options: ResolvedOptions) {
  const { stdout } = await git(options, ["status", "--porcelain"]);

  return stdout.trim().length === 0;
}

export async function getRemoteUrl(options: ResolvedOptions) {
  try {
    const { stdout } = await git(options, ["remote", "get-url", "origin"]);

    return stdout.trim();
  } catch {
    return "";
  }
}

export async function getCurrentBranch(options: ResolvedOptions) {
  const { stdout } = await git(options, ["symbolic-ref", "--short", "HEAD"]);
  return stdout.trim();
}

export async function getCurrentCommitSha(options: ResolvedOptions) {
  const { stdout } = await git(options, ["rev-parse", "HEAD"]);

  return stdout.trim();
}

async function deleteTag(options: ResolvedOptions, context: ReleaseContext) {
  const { tagCreated, tagName } = context;

  if (!tagCreated) {
    return;
  }
  await git(options, ["tag", "-d", tagName]);
}

async function reset(options: ResolvedOptions, context: ReleaseContext) {
  const { initialCommitSha } = context;
  if (!initialCommitSha) {
    return;
  }

  await git(options, ["reset", "--hard", initialCommitSha]);

  // 删除 release 过程中产生的 untracked files / directories
  await git(options, ["clean", "-fd"]);
}

export async function rollback(options: ResolvedOptions, context: ReleaseContext) {
  await deleteTag(options, context);
  await reset(options, context);
}

export async function add(options: ResolvedOptions) {
  await execCommand("git", ["add", ...options.git.addArgs], options);
}

export async function commit(options: ResolvedOptions, context: ReleaseContext) {
  await execCommand(
    "git",
    ["commit", ...options.git.commitArgs, "-m", context.commitMessage],
    options,
  );
}

export async function tag(options: ResolvedOptions, context: ReleaseContext) {
  await execCommand("git", ["tag", "-f", context.tagName], options);

  context.tagCreated = true;
}

export async function push(options: ResolvedOptions, context: ReleaseContext) {
  await execCommand("git", ["push", "origin", "HEAD", `refs/tags/${context.tagName}`], options);
}
