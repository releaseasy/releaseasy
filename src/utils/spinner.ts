import { Spinner } from "picospinner";

import type { ResolvedOptions } from "../config/types.ts";
import { isVerbose } from "./helpers.js";
import type { Awaitable } from "./types.ts";

function noop(): void {}

export function createSpinner(text: string, options: ResolvedOptions) {
  if (isVerbose(options)) {
    return {
      start: noop,
      stop: noop,
      succeed: noop,
      fail: noop,
    };
  }

  return new Spinner(text, {
    colors: {
      spinner: "green",
      text: "gray",
    },
  });
}

export async function withSpinner<T>(
  options: ResolvedOptions,
  text: string,
  fn: () => Awaitable<T>,
): Promise<T> {
  const spinner = createSpinner(text, options);

  spinner.start();

  try {
    return await fn();
  } finally {
    spinner.stop();
  }
}
