import {
  createContext,
  selectVersion,
  selectTag,
  genChangelog,
  confirmChangelog,
  bump,
  summary,
  git,
} from "./release/index.js";
import {
  formatDuration,
  getCurrentCommitSha,
  rollback,
  logger,
  runSideEffect,
} from "./utils/index.js";
import ansis from "ansis";

export async function release(options) {
  const start = performance.now();

  const context = await createContext(options);

  try {
    await selectVersion(options, context);
    await selectTag(options, context);

    if (options.git.changelog !== false) {
      await runSideEffect(options, "Generate changelog", async () => {
        await genChangelog(options, context);
        await confirmChangelog(options, context);
      });
    }

    await runSideEffect(options, `Bump version to ${context.version}`, async () => {
      await bump(options, context);
    });

    await summary(options, context);
    await git(options, context);

    const cost = formatDuration(performance.now() - start);
    logger.log(ansis.green(`🎉 Released successfully! (in ${cost})`));
  } catch (err) {
    await rollback(options, context);
    throw err;
  }
}
