import ansis from "ansis";

import CONSTANTS from "./constants/index.js";
import {
  getInitContext,
  promptInit,
  install,
  generateFiles,
  addScripts,
  dump,
} from "./init/index.js";
import { logger } from "./utils/log.js";

export async function init(inlineOps = {}) {
  const options = {
    cwd: inlineOps.cwd ?? process.cwd(),
    force: inlineOps.force ?? false,
  };

  logger.info(`\n${ansis.green.bold(`Welcome to ${CONSTANTS.CLI_NAME}!`)}\n`);

  // 获取基本的上下文
  const context = await getInitContext(options);

  // 交互式配置
  Object.assign(context, await promptInit(context));

  // 下载jiti
  if (context.configFormat === "typescript") {
    await install(context);
  }

  // 生成配置文件
  await generateFiles(options, context);

  // 添加脚本到package.json
  await addScripts(context);

  // 打印日志
  await dump(context);
}
