import { x } from "tinyexec";

export interface GitOptions {
  stdio?: "pipe" | "inherit" | "ignore";
}

export async function git(cwd: string, args: string[], options: GitOptions = {}) {
  return x("git", args, {
    throwOnError: true,
    nodeOptions: {
      cwd,
      stdio: options.stdio ?? "pipe",
    },
  });
}
