import {
  assertGitReady,
  collectGitBranch,
  collectPackageMetadata,
  selectVersion,
} from "./steps/index.js";
import { formatDuration, logger } from "./utils/index.js";
import { getCurrentCommitSha, rollback } from "./utils/git.js";
import ansis from "ansis";

export async function release(options) {
  console.log("======release222========");

  const start = performance.now();
  const context = Object.create(null);
  let initialCommitSha;
  try {
    // await assertGitReady(options);
    await collectGitBranch(options, context);
    await collectPackageMetadata(options, context);

    initialCommitSha = await getCurrentCommitSha(options);

    // 选择版本
    await selectVersion(options, context);

    const cost = formatDuration(performance.now() - start);
    logger.log(ansis.green(`🎉 Released successfully! (in ${cost})`));
  } catch (err) {
    await rollback(options, context, initialCommitSha);
    throw err;
  }
}
