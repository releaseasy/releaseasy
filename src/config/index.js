import { resolve } from "node:path";
import { lilconfig } from "lilconfig";
import CONSTANTS from "../constants/index.js";
import { defu } from "../utils/index.js";

export async function resolveConfig(configPath, overrides = {}) {
  const fileConfig = await loadConfig(configPath);

  return defu(overrides, fileConfig, CONSTANTS.DEFAULTS);
}

async function loadConfig(configPath) {
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

  let result;
  if (configPath) {
    result = await explorer.load(resolve(process.cwd(), configPath));
  } else {
    result = await explorer.search();
  }

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
