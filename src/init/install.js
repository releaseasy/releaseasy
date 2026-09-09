import { x } from "tinyexec";
import { confirm } from "@inquirer/prompts";
import { detect } from "package-manager-detector/detect";
import { resolveCommand } from "package-manager-detector/commands";

import { isPackageInstalled } from "../utils/index.js";

export async function ensureJiti(cwd) {
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

  const packageManager = await detect({ cwd });

  if (!packageManager) {
    throw new Error("Could not detect the package manager used by this project.");
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
