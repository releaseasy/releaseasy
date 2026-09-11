import ansis from "ansis";
import { logger } from "../utils/index.js";

export async function dump(context) {
  const { configFile, cliffFile, packageManager } = context;

  logger.success(`Created ${configFile}`);
  logger.success(`Created ${cliffFile}`);
  logger.log(`
  You're ready to release!
  Run:
    ${ansis.cyan(`${packageManager.agent} release`)}
  `);
}
