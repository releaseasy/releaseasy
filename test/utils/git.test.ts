import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  isGitAvailable,
  isGitRepository,
  getRemoteUrl,
  getCurrentBranch,
  getCurrentCommitSha,
  isWorkingTreeClean,
  rollback,
} from "../../src/utils/git.ts";

const execMock = vi.fn();

vi.mock("tinyexec", () => ({
  x: (...args: any[]) => {
    return execMock(...args);
  },
}));

vi.unmock("../../src/utils/git.ts");

const options: any = {
  cwd: process.cwd(),
  git: {
    addArgs: ["."],
    commitArgs: [],
  },
};

beforeEach(() => {
  execMock.mockReset();
});

describe("git utils", () => {
  it("应该检测 Git 是否可用", async () => {
    execMock.mockResolvedValue({
      stdout: "git version 2.0",
    });

    expect(await isGitAvailable(options)).toBe(true);
  });

  it("Git 不可用时应该返回 false", async () => {
    execMock.mockRejectedValue(new Error("missing"));

    expect(await isGitAvailable(options)).toBe(false);
  });

  it("应该检测当前目录是否为 Git 仓库", async () => {
    execMock.mockResolvedValue({
      stdout: "true\n",
    });

    expect(await isGitRepository(options)).toBe(true);
  });

  it("不是 Git 仓库时应该返回 false", async () => {
    execMock.mockResolvedValue({
      stdout: "false\n",
    });

    expect(await isGitRepository(options)).toBe(false);
  });

  it("应该检测工作区是否干净", async () => {
    execMock.mockResolvedValue({
      stdout: "",
    });

    expect(await isWorkingTreeClean(options)).toBe(true);
  });

  it("应该获取远程仓库地址", async () => {
    execMock.mockResolvedValue({
      stdout: "git@example.com:test.git\n",
    });

    expect(await getRemoteUrl(options)).toBe("git@example.com:test.git");
  });

  it("获取远程仓库地址失败时应该返回空字符串", async () => {
    execMock.mockRejectedValue(new Error());

    expect(await getRemoteUrl(options)).toBe("");
  });

  it("无法解析当前分支时应该抛出异常", async () => {
    execMock.mockRejectedValue(new Error());

    await expect(getCurrentBranch(options)).rejects.toThrow(
      "Failed to determine current Git branch",
    );
  });

  it("无法解析当前提交 SHA 时应该抛出异常", async () => {
    execMock.mockRejectedValue(new Error());

    await expect(getCurrentCommitSha(options)).rejects.toThrow(
      "Failed to determine current Git commit",
    );
  });

  it("没有提交 SHA 时回滚应该跳过 reset 操作", async () => {
    await rollback(options, {
      tagCreated: false,
      initialCommitSha: "",
    } as any);

    expect(execMock).not.toHaveBeenCalled();
  });

  it("回滚时应该删除标签并重置提交", async () => {
    execMock.mockResolvedValue({
      stdout: "",
    });

    await rollback(options, {
      tagCreated: true,
      tagName: "v1.0.0",
      initialCommitSha: "abc",
    } as any);

    expect(execMock.mock.calls.length).toBe(3);
  });
});
