import { lilconfig } from "lilconfig";
import CONSTANTS from "../constants/index.js";

export async function loadConfig(filepath, cwd) {
  const explorer = lilconfig(CONSTANTS.CLI_NAME, {
    loaders: {
      ".mts": loadTS,
      ".ts": loadTS,
      ".cts": loadTS,
    },
    searchPlaces: [
      `${CONSTANTS.CLI_NAME}.config.js`,
      `${CONSTANTS.CLI_NAME}.config.mjs`,
      `${CONSTANTS.CLI_NAME}.config.cjs`,
      `${CONSTANTS.CLI_NAME}.config.ts`,
      `${CONSTANTS.CLI_NAME}.config.mts`,
      `${CONSTANTS.CLI_NAME}.config.cts`,
      `${CONSTANTS.CLI_NAME}.config.json`,
    ],
  });

  const result = filepath
    ? await explorer.load(resolve(cwd, filepath))
    : await explorer.search(cwd);

  return result?.config ?? {};
}

async function loadTS(filepath) {
  const { createJiti } = await import("jiti");

  return createJiti(import.meta.url, {
    interopDefault: true,
  }).import(filepath, {
    default: true,
  });
}
