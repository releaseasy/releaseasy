import { getCurrentBranch } from "../utils/git.js";

export default async function collectGitBranch(options, context) {
  const { requireBranch } = options.git;

  try {
    // 记录到上下文

    context.branchName = await getCurrentBranch(options);
  } catch {
    throw new Error("Failed to determine current Git branch.");
  }

  if (!requireBranch) return;
  if (!matchBranch(requireBranch, context.branchName)) {
    throw new Error(
      `Release is only allowed on ${String(requireBranch)}, current: ${context.branchName}`,
    );
  }
}

function matchBranch(configBranch, currentBranch) {
  if (configBranch === false) return true;

  if (typeof configBranch === "string") {
    return currentBranch === configBranch;
  }

  if (Array.isArray(configBranch)) {
    return configBranch.includes(currentBranch);
  }

  if (configBranch instanceof RegExp) {
    return configBranch.test(currentBranch);
  }

  return false;
}
