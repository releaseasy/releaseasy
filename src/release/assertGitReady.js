import { isGitAvailable, isGitRepository, isWorkingTreeClean, getRemoteUrl } from "../utils/git.js";

export default async function assertGitReady(options) {
  if (!(await isGitAvailable(options))) {
    throw new Error(
      "Git is not installed or not available in your PATH. Please install Git to continue.",
    );
  }

  if (!(await isGitRepository(options))) {
    throw new Error("Current working directory is not a git repository.");
  }

  if (!(await isWorkingTreeClean(options))) {
    throw new Error("Working directory is not clean. Please commit your changes.");
  }

  const remoteUrl = await getRemoteUrl(options);

  if (!remoteUrl) {
    throw new Error(
      "No Git remote repository found (e.g. 'origin'). Please add a remote using 'git remote add origin <url>'.",
    );
  }
}
