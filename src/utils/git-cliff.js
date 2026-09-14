import { arch as getArch, platform as getPlatform } from "os";
import { defu, execCommand } from "./helpers.js";
import { x } from "tinyexec";

export async function runGitCliff(args, execOptions = {}) {
  const bin = getExePath();

  return await x(
    bin,
    args,
    defu(execOptions, {
      throwOnError: true,
      nodeOptions: {
        stdio: "inherit",
      },
    }),
  );
}

function getExePath() {
  const platform = getPlatform();
  const arch = getArch();

  let os = platform;
  let extension = "";

  if (platform === "win32" || platform === "cygwin") {
    os = "windows";
    extension = ".exe";
  }

  try {
    return require.resolve(`git-cliff-${os}-${arch}/bin/git-cliff${extension}`);
  } catch (e) {
    throw new Error(`Couldn't find git-cliff binary inside node_modules for ${os}-${arch}`, {
      cause: e,
    });
  }
}
