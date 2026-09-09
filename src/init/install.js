import { x } from "tinyexec";
import { confirm } from "@inquirer/prompts";
import { resolveCommand } from "package-manager-detector/commands";
import { isPackageInstalled } from "../utils/index.js";

export async function install(context) {
  const { cwd, packageManager } = context;
  // 已经安装，直接返回
  if (isPackageInstalled(cwd, "jiti")) {
    return;
  }

  const shouldInstall = await confirm({
    message: "TypeScript configuration requires jiti, but it is not installed. Install it now?",
    default: true,
  });

  // 用户拒绝安装
  if (!shouldInstall) {
    return;
  }

  const { command, args } = resolveCommand(packageManager.agent, "add", ["-D", "jiti"]);

  await x(command, args, {
    throwOnError: true,
    nodeOptions: {
      cwd,
      stdio: "inherit",
    },
  });
}
