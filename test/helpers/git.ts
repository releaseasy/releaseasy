import path from "node:path";

import fs from "fs-extra";
import type { PackageJson } from "pkg-types";
import { x } from "tinyexec";

export async function git(cwd: string, args: string[]) {
  return x("git", args, {
    throwOnError: true,
    nodeOptions: {
      cwd,
    },
  });
}

export async function addGitRemote(cwd: string, remoteDir: string) {
  await git(remoteDir, ["init", "--bare"]);
  await git(cwd, ["remote", "add", "origin", remoteDir]);
}

export async function readPackage(cwd: string) {
  return (await fs.readJSON(path.join(cwd, "package.json"))) as PackageJson;
}

export async function gitTagExists(cwd: string, tag: string) {
  try {
    await git(cwd, ["rev-parse", `refs/tags/${tag}`]);
    return true;
  } catch {
    return false;
  }
}
