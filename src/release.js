import {
  assertGitReady,
  collectGitBranch,
  collectPackageMetadata,
  selectVersion,
  selectTag,
  genChangelog,
  confirmChangelog,
  bump,
  summary,
  git,
} from "./steps/index.js";
import { formatDuration, logger } from "./utils/index.js";
import { getCurrentCommitSha, rollback } from "./utils/git.js";
import ansis from "ansis";

export async function release(options) {
  const start = performance.now();
  const context = {
    git: {
      tagCreated: false,
    },
  };
  let initialCommitSha;
  try {
    // await assertGitReady(options);
    await collectGitBranch(options, context);
    await collectPackageMetadata(options, context);

    initialCommitSha = await getCurrentCommitSha(options);

    // 选择版本
    await selectVersion(options, context);
    await selectTag(options, context);
    await genChangelog(options, context);
    await confirmChangelog(options, context);
    await bump(options, context);
    await summary(options, context);
    await git(options, context);

    const cost = formatDuration(performance.now() - start);
    logger.log(ansis.green(`🎉 Released successfully! (in ${cost})`));
  } catch (err) {
    await rollback(options, context, initialCommitSha);
    throw err;
  }
}
