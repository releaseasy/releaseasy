import assertGitReady from "./steps/assertGitReady.js";
import collectGitBranch from "./steps/collectGitBranch.js";
import collectPackageMetadata from "./steps/collectPackageMetadata.js";
import { formatDuration, logger } from "./utils/index.js";
import ansis from "ansis";

export async function release(optoins) {
  console.log("======release========");

  const start = performance.now();
  const context = Object.create(null);

  try {
    // await assertGitReady(optoins);
    await collectGitBranch(optoins, context);
    await collectPackageMetadata(optoins, context);

    console.log(optoins);

    const cost = formatDuration(performance.now() - start);
    logger.log(ansis.green(`🎉 Released successfully! (in ${cost})`));
  } catch (err) {
    //  await gitReset(context);
    // throw err;
  }
}
