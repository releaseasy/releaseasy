import { Spinner } from "picospinner";
import { add, commit, tag, push } from "../utils/git.js";
import { shouldInheritStdio } from "../utils/index.js";

const spinner = new Spinner("Releasing…", {
  stream: process.stderr,
  colors: {
    spinner: "green",
    text: "gray",
  },
});

export default async function git(options, context) {
  const quiet = !shouldInheritStdio(options);

  if (quiet) {
    spinner.start();
  }

  try {
    await add(options);
    await commit(options, context.git.commitMessage);
    await tag(options, context.git.tagName);
    await push(options, context.git.tagName);

    if (quiet) {
      spinner.stop();
    }
  } catch (error) {
    if (quiet) {
      spinner.fail("Release failed");
    }
    throw error;
  }
}
