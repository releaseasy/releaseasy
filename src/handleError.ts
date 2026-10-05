import CONSTANTS from "./constants/index.ts";
import { hasVerbosity, logger } from "./utils/index.ts";

export function handleError(err: unknown, verbose: number): never {
  if (!err) {
    process.exit(0);
  }

  if (err instanceof CancelledError || isExitPromptError(err)) {
    logger.warn(err.message);
    process.exit(0);
  }

  if (err instanceof Error) {
    if (hasVerbosity(verbose, CONSTANTS.VERBOSITY.TRACE)) {
      logger.error(err);
    } else {
      logger.error(err.message);
    }

    process.exit(1);
  }

  logger.error("Unknown error", err);
  process.exit(1);
}

function isExitPromptError(err: unknown): err is Error {
  return err instanceof Error && err.name === "ExitPromptError";
}

export function cancel(message?: string): never {
  throw new CancelledError(message);
}

export class CancelledError extends Error {
  constructor(message = "Release cancelled by user") {
    super(message);
    this.name = "CancelledError";
  }
}
