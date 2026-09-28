import ansis from "ansis";

import { resolveConfig } from "./config/index.ts";
import type { InlineConfig, ResolvedOptions } from "./config/types.ts";
import {
  createContext,
  selectVersion,
  selectTag,
  genChangelog,
  confirmChangelog,
  bump,
  summary,
  git,
} from "./release/index.ts";
import {
  formatDuration,
  rollback,
  logger,
  runSideEffect,
  runHook,
  isChangelogEnabled,
} from "./utils/index.ts";
import type { ExcludeAt } from "./utils/types.ts";

export type ChangelogEnabledOptions = ExcludeAt<ResolvedOptions, "git.changelog", false>;

export async function release(options: InlineConfig = {}) {
  const resolvedOptions = await resolveConfig(options);

  const start = performance.now();
  const context = await createContext(resolvedOptions);

  try {
    await runHook(resolvedOptions, "before:init", context);
    await selectVersion(resolvedOptions, context);
    await selectTag(resolvedOptions, context);

    if (isChangelogEnabled(resolvedOptions)) {
      await runSideEffect(resolvedOptions, "Generate changelog", async () => {
        await genChangelog(resolvedOptions, context);
        await confirmChangelog();
      });
    }

    await runSideEffect(resolvedOptions, `Bump version to ${context.version}`, async () => {
      await bump(resolvedOptions, context);
    });

    await summary(resolvedOptions, context);

    await runSideEffect(
      resolvedOptions,
      `Git operations`,
      async () => await git(resolvedOptions, context),
    );

    await runHook(resolvedOptions, "after:release", context);

    const cost = formatDuration(performance.now() - start);
    logger.log(ansis.green(`🎉 Released successfully! (in ${cost})`));
  } catch (err) {
    await rollback(resolvedOptions, context);
    throw err;
  }
}
