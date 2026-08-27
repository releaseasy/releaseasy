import { x } from "tinyexec";

export async function checkGitRepoStatus() {
  // 检查是否安装过了git
  const isGitInstalled = await hasGit();
  if (!isGitInstalled) {
    throw new Error(
      "Git is not installed or not available in your PATH. Please install Git to continue.",
    );
  }
  // 检查是否是一个git仓库
  const isRepo = await isGitRepo();
  if (!isRepo) throw new Error("Current working directory is not a git repository.");

  // 检查是否是一个干净的Git仓库
  const isClean = await isGitClean();
  if (!isClean) throw new Error("Working directory is not clean. Please commit your changes.");

  // 获取远程提交地址
  const remoteUrl = await getGitRemoteUrl();
  if (!remoteUrl)
    throw new Error(
      "No Git remote repository found (e.g. 'origin'). Please add a remote using 'git remote add origin <url>'.",
    );
}

async function hasGit() {
  try {
    await x("git", ["--version"], { throwOnError: true });
    return true;
  } catch {
    return false;
  }
}

async function isGitRepo() {
  try {
    const { stdout } = await x("git", ["rev-parse", "--is-inside-work-tree"], {
      throwOnError: true,
    });
    return stdout.trim() === "true";
  } catch {
    return false;
  }
}

async function isGitClean() {
  const { stdout } = await x("git", ["status", "--porcelain"]);
  return stdout.trim().length === 0;
}

async function getGitRemoteUrl() {
  try {
    const { stdout } = await x("git", ["remote", "get-url", "origin"], {
      throwOnError: true,
    });
    return stdout.trim();
  } catch {
    return "";
  }
}
