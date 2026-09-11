import ansis from "ansis";
import { logger } from "../utils/log.js";

export async function dump(context) {
  const { configFile, cliffFile, packageManager } = context;
  // 打印结果

  logger.success(`Created ${configFile}`);
  logger.success(`Created ${cliffFile}`);
  logger.info(`
  You're ready to release!
  Run:
    ${ansis.cyan(`${packageManager.agent} release`)}
  `);
}
