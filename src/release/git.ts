import type { ReleaseContext, ResolvedOptions } from "../config/types.ts";
import { add, commit, tag, push, withSpinner } from "../utils/index.ts";
export async function git(options: ResolvedOptions, context: ReleaseContext) {
  await withSpinner(options, "Releasing…", async () => {
    try {
      await add(options);
      await commit(options, context);
      await tag(options, context);
      await push(options, context);
    } catch (error) {
      throw new Error("Release failed", {
        cause: error,
      });
    }
  });
}
