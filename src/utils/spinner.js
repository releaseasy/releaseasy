import { Spinner } from "picospinner";

import { isVerbose } from "./helpers.js";

function noop() {}

export function createSpinner(text, options) {
  if (isVerbose(options)) {
    return {
      start: noop,
      stop: noop,
      succeed: noop,
      fail: noop,
    };
  }

  return new Spinner(text, {
    stream: process.stderr,
    colors: {
      spinner: "green",
      text: "gray",
    },
  });
}

export async function withSpinner(options, text, fn) {
  const spinner = createSpinner(text, options);

  spinner.start();

  try {
    return await fn();
  } finally {
    spinner.stop();
  }
}
