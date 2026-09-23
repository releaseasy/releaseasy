import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ansis from "ansis";

import packageJson from "../../package.json" with { type: "json" };
import CONSTANTS from "../constants/index.js";
import jsonConfig from "../init/templates/releaseasy.config.json" with { type: "json" };
import { exists, runGitCliff, updatePackageJSON } from "../utils/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_DIR = path.join(__dirname, "templates");

export async function generateFiles(options, context) {
  const { changelogFormat, cwd, configFormat, packageJsonPath } = context;
  const { force } = options;

  let configFile, configAction;
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

    const configTarget = path.join(cwd, configFile);
    const cliffTarget = path.join(cwd, CONSTANTS.CLIFF_FILE);

    await assertCanWrite(configTarget, force);
    await assertCanWrite(cliffTarget, force);

    await writeConfigFile(configTemplate, configTarget, context);
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

  // 保存到上下文
  Object.assign(context, {
    configFile,
    configAction,
    cliffFile: CONSTANTS.CLIFF_FILE,
  });
}

async function generatePackageJsonConfig(packageJsonPath, force) {
  await updatePackageJSON(packageJsonPath, (packageJson) => {
    if (packageJson[CONSTANTS.CLI_NAME] && !force) {
      throw new Error(
        `Field ${ansis.yellow(CONSTANTS.CLI_NAME)} already exists in package.json. ` +
          `Use ${ansis.yellow(ansis.bold("--force"))} to overwrite it.`,
      );
    }

    packageJson[[CONSTANTS.CLI_NAME]] = jsonConfig;
  });
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

async function writeConfigFile(template, target) {
  if (path.extname(template) === ".json") {
    return writeJsonConfig(template, target);
  }

  await fs.copyFile(template, target);
}

async function writeJsonConfig(template, target) {
  const content = await fs.readFile(template, "utf8");
  const config = JSON.parse(content);

  const output = {
    $schema: `https://cdn.jsdelivr.net/npm/releaseasy@${packageJson.version}/schema/releaseasy.json`,
    ...config,
  };

  await fs.writeFile(target, JSON.stringify(output, null, 2) + "\n", "utf8");
}
