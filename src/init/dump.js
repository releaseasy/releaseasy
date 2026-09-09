import ansis from "ansis";
import { logger } from "../utils/index.js";

export async function dump(context) {
  const { configFile, cliffFile, packageManager } = context;
  // 打印结果
  logger.log(`${ansis.green("✔")} Created ${configFile}`);
  logger.log(`${ansis.green("✔")} Created ${cliffFile}`);
  logger.log(`
  You're ready to release!
  Run:
    ${ansis.cyan(`${packageManager.agent} release`)}
  `);
}
