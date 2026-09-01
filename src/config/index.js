import { resolve } from "node:path";
import CONSTANTS from "../constants/index.js";
import { defu } from "../utils/index.js";
import { loadConfig } from "./load.js";
import { validateConfig } from "./validate.js";

export async function resolveConfig(inlineConfig) {
  inlineConfig = normalizeInlineOptions(inlineConfig);

  const { config, ...inlineOptions } = inlineConfig;
  const fileConfig = await loadConfig(config, inlineOptions.cwd);
  const resolvedConfig = defu(inlineOptions, fileConfig, CONSTANTS.DEFAULTS);

  return validateConfig(resolvedConfig);
}

function normalizeInlineOptions(options) {
  return {
    ...options,
    cwd: resolve(options.cwd ?? process.cwd()),
  };
}
