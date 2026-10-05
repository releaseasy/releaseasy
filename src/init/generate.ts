import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ansis from "ansis";

import CONSTANTS, { type ConfigAction } from "../constants/index.ts";
import configJson from "../init/templates/releaseasy.config.json" with { type: "json" };
import { exists, outputFile, runGitCliff, sprintf, updatePackageJSON } from "../utils/index.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_DIR = path.join(__dirname, "templates");
import type { InitContext, ResolvedInitOptions } from "../config/types.ts";

export async function generateFiles(options: ResolvedInitOptions, context: InitContext) {
  const { changelogFormat, resolvedCwd, configFormat, packageJsonPath } = context;
  const { force } = options;

  let configFile: string;
  let configAction: ConfigAction;

  if (configFormat === "packageJson") {
    configFile = "package.json";
    configAction = CONSTANTS.CONFIG_ACTION.UPDATED;
    await generatePackageJsonConfig(packageJsonPath, force);
  } else {
    configAction = CONSTANTS.CONFIG_ACTION.CREATED;
    const configExtension = resolveConfigExtension(context);

    configFile = `${CONSTANTS.CLI_NAME}.config.${configExtension}`;
    const configTemplate = path.join(TEMPLATE_DIR, configFile);

    if (!(await exists(configTemplate))) {
      throw new Error(`Template not found: ${configTemplate}`);
    }

    const configTarget = path.join(resolvedCwd, configFile);
    const cliffTarget = path.join(resolvedCwd, CONSTANTS.CLIFF_FILE);

    await assertCanWrite(configTarget, force);
    await assertCanWrite(cliffTarget, force);

    await writeConfigFile(configTemplate, configTarget);
  }

  // 调用命令生成git-cliff的配置文件
  try {
    const args = ["--init"];
    if (changelogFormat !== "default") {
      args.push(changelogFormat);
    }

    await runGitCliff(args, {
      nodeOptions: {
        stdio: "pipe",
      },
    });
  } catch (error) {
    throw new Error(`Failed to generate ${CONSTANTS.CLIFF_FILE}.`, { cause: error });
  }

  Object.assign(context, {
    configFile,
    configAction,
    cliffFile: CONSTANTS.CLIFF_FILE,
  });
}

async function generatePackageJsonConfig(packageJsonPath: string, force: boolean) {
  await updatePackageJSON(packageJsonPath, (pkg) => {
    if (pkg[CONSTANTS.CLI_NAME] && !force) {
      throw new Error(
        `Field ${ansis.yellow(CONSTANTS.CLI_NAME)} already exists in package.json. ` +
          `Use ${ansis.yellow(ansis.bold("--force"))} to overwrite it.`,
      );
    }
    pkg[CONSTANTS.CLI_NAME] = configJson;
  });
}

async function assertCanWrite(file: string, force: boolean) {
  if (!force && (await exists(file))) {
    throw new Error(
      `File already exists: ${ansis.yellow(path.basename(file))}. Use ${ansis.yellow(ansis.bold("--force"))} to overwrite it.`,
    );
  }
}

export function resolveConfigExtension(context: InitContext) {
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

async function writeConfigFile(template: string, target: string) {
  if (path.extname(template) === ".json") {
    const cnt = await fs.readFile(template, "utf-8");
    return outputFile(
      target,
      sprintf(cnt, "$schema", "./node_modules/releaseasy/schema/releaseasy.json"),
    );
  }
  await fs.copyFile(template, target);
}
