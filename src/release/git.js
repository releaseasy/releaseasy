import { add, commit, tag, push, withSpinner } from "../utils/index.js";

export async function git(options, context) {
  await withSpinner(options, "Releasing…", async () => {
    await add(options);
    await commit(options, context);
    await tag(options, context);
    await push(options, context);
  });
}
