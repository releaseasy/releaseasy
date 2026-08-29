import { logger } from "./utils/index.js";
import CONSTANTS from "./constants/index.js";

export function handleError(err, options = {}) {
  if (!err) {
    process.exit(0);
  }
  if (err instanceof CancelledError) {
    logger.warn(err.message);
  } else if (err instanceof ExitSignal) {
    process.exit(err.code);
  } else if (err instanceof Error) {
    if (options.verbose >= CONSTANTS.LOG_LEVEL.DEBUG) {
      logger.error(err);
      return;
    }

    logger.error(err.message);
  } else {
    logger.error("Unknown error", err);
  }

  process.exit(1);
}

// 基础错误类
class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // 自动使用类名作为 name
  }
}

// 用户自己取消错误
class CancelledError extends BaseError {
  constructor(message = "Release cancelled by user") {
    super(message);
  }
}

class ExitSignal extends Error {
  constructor(code = 0, cause) {
    super(`Exit with code ${code}`);
  }
}
