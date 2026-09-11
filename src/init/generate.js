import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { outputFile, exists } from "../utils/fs.js";
import { runGitCliff } from "../git-cliff.js";
import CONSTANTS from "../constants/index.js";
import ansis from "ansis";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_DIR = path.join(__dirname, "templates");

export async function generateFiles(options, context) {
  const { changelogFormat, cwd } = context;
  const { force } = options;
  const configExtension = resolveConfigExtension(context);

  const configFile = `releaseasy.config.${configExtension}`;
  const configTemplate = path.join(TEMPLATE_DIR, configFile);

  if (!exists(configTemplate)) {
    throw new Error(`Template not found: ${configTemplate}`);
  }

  const configTarget = path.join(cwd, configFile);
  const cliffTarget = path.join(cwd, CONSTANTS.CLIFF_FILE);

  await assertCanWrite(configTarget, force);
  await assertCanWrite(cliffTarget, force);

  await fs.copyFile(configTemplate, configTarget);

  // 调用命令生成git-cliff的配置文件
  await runGitCliff(["--init", changelogFormat], {
    nodeOptions: {
      stdio: "pipe",
    },
  });

  // 保存到上下文
  context.configFile = configFile;
  context.cliffFile = CONSTANTS.CLIFF_FILE;
}

async function assertCanWrite(file, force) {
  if (!force && (await exists(file))) {
    throw new Error(
      `File already exists: ${ansis.yellow(path.basename(file))}. Use ${ansis.yellow(ansis.bold("--force"))} to overwrite it.`,
    );
  }
}

function resolveConfigExtension(context) {
  const { configFormat, moduleFormat } = context;

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
