import ansis from "ansis";
import CONSTANTS from "./constants/index.js";

import { detectEnvironment } from "./init/detect.js";
import { promptInit } from "./init/prompt.js";
import { ensureJiti } from "./init/install.js";
import { generateFiles } from "./init/generate.js";
import { addScripts } from "./init/package.js";

export async function init(inlineOps = {}) {
  const cwd = inlineOps.cwd ?? process.cwd();
  const force = inlineOps.force ?? false;

  console.log(`\n${ansis.green.bold(`Welcome to ${CONSTANTS.CLI_NAME}!`)}\n`);

  // 获取环境
  const environment = await detectEnvironment(cwd);

  // 交互式配置
  const options = await promptInit(environment);

  // ts 配置所需依赖
  if (options.configFormat === "typescript") {
    await ensureJiti(environment.cwd, environment.packageJson);
  }

  // 生成配置文件
  const generated = await generateFiles({
    cwd: environment.cwd,
    configFormat: options.configFormat,
    moduleFormat: options.moduleFormat,
    changelogFormat: options.changelogFormat,
    force,
  });

  if (options.addScripts) {
    await addScripts(environment.cwd);
  }

  // 打印结果
  console.log(`${ansis.green("✔")} Created ${generated.configFile}`);
  console.log(`${ansis.green("✔")} Created ${generated.cliffFile}`);
  console.log(`
  You're ready to release!

  Run:

    ${ansis.cyan("releaseasy release")}
  `);
}
