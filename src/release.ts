import ansis from "ansis";

import type { ResolvedOptions } from "./config/types.ts";
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
import { formatDuration, rollback, logger, runSideEffect, runHook } from "./utils/index.js";

export async function release(options: ResolvedOptions) {
  const start = performance.now();

  const context = await createContext(options);

  try {
    await runHook(options, "before:init", context);
    await selectVersion(options, context);
    await selectTag(options, context);

    if (options.git.changelog !== false) {
      await runSideEffect(options, "Generate changelog", async () => {
        await genChangelog(options, context);
        await confirmChangelog();
      });
    }

    await runSideEffect(options, `Bump version to ${context.version}`, async () => {
      await bump(options, context);
    });

    await summary(options, context);

    await runSideEffect(options, `Git operations`, async () => await git(options, context));

    await runHook(options, "after:release", context);

    const cost = formatDuration(performance.now() - start);
    logger.log(ansis.green(`🎉 Released successfully! (in ${cost})`));
  } catch (err) {
    await rollback(options, context);
    throw err;
  }
}
