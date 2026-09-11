import { createSpinner, shouldShowSpinner, add, commit, tag, push } from "../utils/index.js";

const spinner = createSpinner("Releasing…");

export async function git(options, context) {
  const showSpinner = shouldShowSpinner(options);

  if (showSpinner) {
    spinner.start();
  }

  try {
    await add(options);
    await commit(options, context);
    await tag(options, context);
    await push(options, context);

    if (showSpinner) {
      spinner.stop();
    }
  } catch (error) {
    if (showSpinner) {
      spinner.fail("Release failed");
    }
    throw error;
  }
}
