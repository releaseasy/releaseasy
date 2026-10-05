import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import type { Loader } from "lilconfig";
import { lilconfig } from "lilconfig";

import CONSTANTS from "../constants/index.ts";

const loadTS: Loader = async (filepath) => {
  const mod = await import(pathToFileURL(filepath).href);

  return mod.default ?? mod;
};

const CONFIG_EXTENSIONS = [".js", ".mjs", ".cjs", ".ts", ".mts", ".cts", ".json"] as const;
const CONFIG_LOADERS = {
  ".ts": loadTS,
  ".mts": loadTS,
  ".cts": loadTS,
} satisfies Record<string, Loader>;

export async function loadConfig<T extends object = Record<string, unknown>>(
  filepath?: string,
  cwd = process.cwd(),
): Promise<T> {
  const explorer = lilconfig(CONSTANTS.CLI_NAME, {
    loaders: CONFIG_LOADERS,
    searchPlaces: CONFIG_EXTENSIONS.map((ext) => `${CONSTANTS.CLI_NAME}.config${ext}`),
  });

  const result = filepath
    ? await explorer.load(resolve(cwd, filepath))
    : await explorer.search(cwd);

  return (result?.config ?? {}) as T;
}
