import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { outputFile, exists } from "../utils/fs.js";
import { runGitCliff } from "../git-cliff.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_DIR = path.join(__dirname, "templates");

export async function generateFiles({
  cwd,
  configFormat,
  moduleFormat,
  changelogFormat,
  force = false,
}) {
  const cliffFile = "cliff.toml";
  const configExtension = resolveConfigExtension(configFormat, moduleFormat);
  const configFile = `releaseasy.config.${configExtension}`;
  const configTemplate = path.join(TEMPLATE_DIR, configFile);

  if (!exists(configTemplate)) {
    throw new Error(`Template not found: ${configTemplate}`);
  }

  const configTarget = path.join(cwd, configFile);
  const cliffTarget = path.join(cwd, "cliff.toml");

  await assertCanWrite(configTarget, force);
  await assertCanWrite(cliffTarget, force);

  await fs.copyFile(configTemplate, configTarget);

  // 调用命令生成git-cliff的配置文件
  await runGitCliff(["--init", changelogFormat]);

  return {
    configFile,
    cliffFile,
  };
}

async function assertCanWrite(file, force) {
  if (!force && (await exists(file))) {
    throw new Error(`File already exists: ${path.basename(file)}. Use --force to overwrite it.`);
  }
}

function resolveConfigExtension(configFormat, moduleFormat) {
  if (configFormat === "json") {
    return "json";
  }

  if (configFormat === "javascript") {
    return moduleFormat === "esm" ? "mjs" : "cjs";
  }

  if (configFormat === "typescript") {
    return moduleFormat === "esm" ? "mts" : "cts";
  }

  throw new Error(`Unsupported config format: ${configFormat}`);
}
