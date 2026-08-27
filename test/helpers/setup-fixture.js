import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { x } from "tinyexec";

export async function createGitFixture() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "release-cli-test-"));

  console.log(dir);

  await fs.writeFile(
    path.join(dir, "package.json"),
    JSON.stringify(
      {
        name: "fixture-project",
        version: "1.0.0",
      },
      null,
      2,
    ),
  );

  await git(dir, ["init"]);

  // // 设置 Git 身份，避免测试环境没有 global git config
  await git(dir, ["config", "user.name", "Vitest"]);

  await git(dir, ["config", "user.email", "vitest@example.com"]);

  await git(dir, ["add", "."]);

  await git(dir, ["commit", "-m", "Initial commit"]);

  // // 创建一个假的 remote
  // await git(dir, ["remote", "add", "origin", "https://github.com/example/fixture.git"]);

  return {
    dir,

    async dispose() {
      await fs.rm(dir, {
        recursive: true,
        force: true,
      });
    },

    async write(file, content) {
      await fs.writeFile(path.join(dir, file), content);
    },

    async git(...args) {
      return git(dir, args);
    },
  };
}

async function git(cwd, args) {
  try {
    return await x("git", args, {
      cwd,
      throwOnError: true,
    });
  } catch (error) {
    console.error("Git command failed:");
    console.error("cwd:", cwd);
    console.error("args:", args);
    console.error("error:", error);
    console.error("stdout:", error.stdout);
    console.error("stderr:", error.stderr);

    throw error;
  }
}
