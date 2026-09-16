import { add, commit, tag, push, withSpinner, runSideEffect } from "../utils/index.js";

export async function git(options, context) {
  await withSpinner(options, "Releasing…", async () => {
    try {
      await runSideEffect(options, "Stage changes", async () => await git.add(context));
      await runSideEffect(options, "Commit changes", async () => await commit(options, context));
      await runSideEffect(
        options,
        `Create git tag ${context.tagName}`,
        async () => await tag(options, context),
      );
      await runSideEffect(options, "Push changes", async () => await push(options, context));
    } catch (error) {
      throw new Error("Release failed", {
        cause: error,
      });
    }
  });
}
