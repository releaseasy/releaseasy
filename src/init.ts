import ansis from "ansis";

import type { InitOptions, ResolvedInitOptions } from "./config/types.ts";
import CONSTANTS from "./constants/index.ts";
import { createContext, promptInit, generateFiles, addScripts, dump } from "./init/index.ts";
import { logger, blank } from "./utils/index.ts";

export async function init(options: InitOptions = {}) {
  const resolvedOptions = resolveInitOptions(options);

  blank();
  logger.log(`${ansis.green.bold(`Welcome to ${CONSTANTS.CLI_NAME}!`)}`);
  blank();
  // 获取基本的上下文
  const context = await createContext(resolvedOptions);

  // 交互式配置
  await promptInit(context);

  // 生成配置文件
  await generateFiles(resolvedOptions, context);

  // 添加脚本到package.json
  await addScripts(context);

  // 打印日志
  await dump(context);
}

function resolveInitOptions(options: InitOptions): ResolvedInitOptions {
  if (typeof options.cwd !== "undefined" && typeof options.cwd !== "string") {
    throw new TypeError("The `cwd` option must be a string.");
  }

  if (typeof options.force !== "undefined" && typeof options.force !== "boolean") {
    throw new TypeError("The `force` option must be a boolean.");
  }

  return {
    cwd: options.cwd ?? process.cwd(),
    force: options.force ?? false,
  };
}
