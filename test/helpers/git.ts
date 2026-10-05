import { copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { x } from "tinyexec";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function git(cwd: string, args: string[]) {
  return x("git", args, {
    throwOnError: true,
    nodeOptions: {
      cwd,
    },
  });
}

async function addGitRemote(cwd: string, remoteDir: string) {
  await git(remoteDir, ["init", "--bare"]);
  await git(cwd, ["remote", "add", "origin", remoteDir]);
}

export async function gitTagExists(cwd: string, tag: string) {
  try {
    await git(cwd, ["rev-parse", `refs/tags/${tag}`]);
    return true;
  } catch {
    return false;
  }
}

export async function initGitRepository(
  dir: string,
  options: {
    branch?: string;
    cliffConfig?: boolean;
    remoteDir?: string;
  } = {},
) {
  const { branch = "main", cliffConfig = true, remoteDir } = options;

  // 初始化 git 仓库
  await git(dir, ["init", "-b", branch]);

  await git(dir, ["config", "user.name", "releaseasy-test"]);

  await git(dir, ["config", "user.email", "releaseasy@example.com"]);

  // 插入 git-cliff 配置
  if (cliffConfig) {
    const cliffConfigFile = path.resolve(__dirname, "../fixtures/cliff.toml");

    await copyFile(cliffConfigFile, path.join(dir, "cliff.toml"));
  }

  await git(dir, ["add", "."]);

  await git(dir, ["commit", "--no-verify", "-m", "chore: initial commit"]);

  // 添加远程仓库
  if (remoteDir) {
    await addGitRemote(dir, remoteDir);
  }
}
