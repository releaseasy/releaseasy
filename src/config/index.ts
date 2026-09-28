import { resolve } from "node:path";

import CONSTANTS from "../constants/index.ts";
import { defu } from "../utils/index.ts";
import { loadConfig } from "./load.ts";
import type { InlineConfig, ResolvedOptions } from "./types.ts";
import { validateConfig } from "./validate.ts";

export async function resolveConfig(inlineConfig: InlineConfig): Promise<ResolvedOptions> {
  inlineConfig = normalizeInlineOptions(inlineConfig);

  const { config, ...inlineOptions } = inlineConfig;
  const fileConfig = await loadConfig(config, inlineOptions.cwd);
  const resolvedConfig = defu(inlineOptions, fileConfig, CONSTANTS.DEFAULTS);

  return validateConfig(resolvedConfig);
}

function normalizeInlineOptions(options: InlineConfig) {
  return {
    ...options,
    cwd: resolve(options.cwd ?? process.cwd()),
  };
}
