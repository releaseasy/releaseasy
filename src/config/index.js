import { resolve } from "node:path";
import { lilconfig } from "lilconfig";

export async function loadConfig(name, configPathname) {
  const explorer = lilconfig(name, {
    loaders: {
      ".mts": loadTS,
      ".ts": loadTS,
      ".cts": loadTS,
    },
    searchPlaces: [
      `${name}.config.ts`,
      `${name}.config.mts`,
      `${name}.config.cts`,
      `${name}.config.json`,
    ],
  });

  const result = configPathname
    ? await explorer.load(resolve(process.cwd(), configPathname))
    : await explorer.search();

  if (!result) {
    return {};
  }
  return result.config;
}
async function loadTS(filepath) {
  const { createJiti } = await import("jiti");
  return createJiti(import.meta.url, { interopDefault: true }).import(filepath, { default: true });
}
