import CONSTANTS from "./constants/index.js";
import { logger } from "./utils/index.js";

export function handleError(err, options = {}) {
  if (!err) {
    process.exit(0);
  }
  if (err instanceof CancelledError || err.name === "ExitPromptError") {
    logger.warn(err.message);
    process.exit(0);
  } else if (err instanceof Error) {
    const commandOptions = options.command?.opts();

    const { verbose } = commandOptions;
    if (verbose === undefined) {
      logger.error(err);
      return;
    }

    if (verbose > CONSTANTS.LOG_LEVEL.DEBUG) {
      logger.error(err);
      return;
    }

    logger.error(err.message);

    process.exit(1);
  }
  logger.error("Unknown error", err);
  process.exit(1);
}

/**
 * 取消当前操作
 *
 * @param {string} [message]
 * @throws {CancelledError}
 */
export function cancel(message) {
  throw new CancelledError(message);
}

class CancelledError extends Error {
  constructor(message = "Release cancelled by user") {
    super(message);
    this.name = "CancelledError";
  }
}
