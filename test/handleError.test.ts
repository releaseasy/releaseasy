import { describe, expect, it, vi, beforeEach } from "vitest";

const { loggerMock } = vi.hoisted(() => ({
  loggerMock: {
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../src/utils/index.ts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/utils/index.ts")>();

  return {
    ...actual,
    logger: loggerMock,
  };
});

import CONSTANTS from "../src/constants/index.ts";
import { handleError, cancel, CancelledError } from "../src/handleError.ts";

describe("handleError", () => {
  const exitMock = vi.spyOn(process, "exit").mockImplementation((() => undefined) as never);
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("当错误为空时应该正常退出", () => {
    handleError(null, 0);

    expect(exitMock).toHaveBeenCalledWith(0);

    expect(loggerMock.warn).not.toHaveBeenCalled();
  });

  it("应该处理用户取消操作异常", () => {
    const error = new CancelledError("user cancelled");

    handleError(error, 0);

    expect(loggerMock.warn).toHaveBeenCalledWith("user cancelled");

    expect(exitMock).toHaveBeenCalledWith(1);
  });

  it("应该处理退出提示异常", () => {
    const error = new Error("prompt exit");

    error.name = "ExitPromptError";

    handleError(error, 0);

    expect(loggerMock.warn).toHaveBeenCalledWith("prompt exit");

    expect(exitMock).toHaveBeenCalledWith(0);
  });

  it("在非 trace 模式下应该只记录错误消息", () => {
    const error = new Error("failed release");

    handleError(error, 0);

    expect(loggerMock.error).toHaveBeenCalledWith("failed release");

    expect(exitMock).toHaveBeenCalledWith(1);
  });

  it("在启用 trace 模式时应该记录完整错误对象", () => {
    const error = new Error("failed release");

    handleError(error, CONSTANTS.VERBOSITY.TRACE);

    expect(loggerMock.error).toHaveBeenCalledWith(error);

    expect(exitMock).toHaveBeenCalledWith(1);
  });

  it("应该处理未知类型的错误", () => {
    const error = {
      message: "unknown",
    };

    handleError(error, 0);

    expect(loggerMock.error).toHaveBeenCalledWith("Unknown error", error);

    expect(exitMock).toHaveBeenCalledWith(1);
  });
});

describe("cancel", () => {
  it("应该抛出 CancelledError 异常", () => {
    expect(() => {
      cancel("stop");
    }).toThrow(CancelledError);

    try {
      cancel("stop");
    } catch (err) {
      expect(err).toBeInstanceOf(CancelledError);

      expect((err as Error).message).toBe("stop");
    }
  });
});

describe("CancelledError", () => {
  it("应该使用默认错误消息", () => {
    const error = new CancelledError();

    expect(error.message).toBe("Release cancelled by user");

    expect(error.name).toBe("CancelledError");
  });

  it("应该使用自定义错误消息", () => {
    const error = new CancelledError("custom");

    expect(error.message).toBe("custom");
  });
});
