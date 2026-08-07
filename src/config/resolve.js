import { parse } from "valibot";
import { NAME } from "../constants.js";
import { defu } from "../utils/index.js";
import { loadConfig } from "./index.js";
import { defaultConfig } from "./default.js";

export async function resolveConfig({ configFile, overrides = {} }) {
  const fileConfig = await loadConfig(NAME, configFile);

  return defu(overrides, fileConfig, defaultConfig);
}
