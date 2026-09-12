import ansis from "ansis";

import CONSTANTS from "./constants/index.js";
import {
  createContext,
  promptInit,
  install,
  generateFiles,
  addScripts,
  dump,
} from "./init/index.js";
import { logger, blank } from "./utils/index.js";

export async function init(inlineOps = {}) {
  const options = {
    cwd: inlineOps.cwd ?? process.cwd(),
    force: inlineOps.force ?? false,
  };
  blank();
  logger.log(`${ansis.green.bold(`Welcome to ${CONSTANTS.CLI_NAME}!`)}`);
  blank();
  // 获取基本的上下文
  const context = await createContext(options);

  // 交互式配置
  await promptInit(context);

  console.log(context);

  return;

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
