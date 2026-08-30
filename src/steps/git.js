import { Spinner } from "picospinner";
import { add, commit, tag, push } from "../utils/git.js";

const spinner = new Spinner("Releasing…", {
  stream: process.stderr,
  colors: {
    spinner: "green",
    text: "gray",
  },
});

export default async function git(options, context) {
  spinner.start();

  try {
    await add(options);
    await commit(options, context.git.commitMessage);
    await tag(options, context.git.tagName);
    await push(options, context.git.tagName);

    spinner.stop();
  } catch (error) {
    spinner.fail("Release failed");
    throw error;
  }
}
