import { logger } from "./utils/index.js";
import CONSTANTS from "./constants/index.js";

export function handleError(err, options = {}) {
  if (!err) {
    process.exit(0);
  }
  if (err instanceof CancelledError) {
    logger.warn(err.message);
    process.exit(0);
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

export class CancelledError extends Error {
  constructor(message = "Release cancelled by user") {
    super(message);
    this.name = "CancelledError";
  }
}
