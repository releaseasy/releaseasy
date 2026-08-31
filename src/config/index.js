import { resolve } from "node:path";
import { lilconfig } from "lilconfig";
import CONSTANTS from "../constants/index.js";
import { defu } from "../utils/index.js";
import * as v from "valibot";
import { configSchema } from "./schema.js";

export async function resolveConfig(inlineConfig) {
  inlineConfig = normalizeInlineOptions(inlineConfig);

  const { config, ...inlineOptions } = inlineConfig;
  const fileConfig = await loadConfig(config, inlineOptions.cwd);
  const resolvedConfig = defu(inlineOptions, fileConfig, CONSTANTS.DEFAULTS);

  return v.parse(configSchema, resolvedConfig);
}

function normalizeInlineOptions(options) {
  return {
    ...options,
    cwd: resolve(options.cwd ?? process.cwd()),
  };
}

async function loadConfig(filepath, cwd) {
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
