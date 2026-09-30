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
