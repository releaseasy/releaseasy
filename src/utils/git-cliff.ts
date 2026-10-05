import { createRequire } from "node:module";
import { arch as getArch, platform as getPlatform } from "node:os";

import { x, type Options, type Output } from "tinyexec";

import { defu } from "./helpers.ts";

const require = createRequire(import.meta.url);

export async function runGitCliff(
  args: string[],
  execOptions: Partial<Options> = {},
): Promise<Output> {
  const bin = getExePath();

  return await x(
    bin,
    args,
    defu(execOptions, {
      throwOnError: true,
      nodeOptions: {
        stdio: "inherit",
      },
    } satisfies Partial<Options>),
  );
}

function getExePath() {
  const platform = getPlatform();
  const arch = getArch();

  let os = platform as string;
  let extension = "";

  if (platform === "win32" || platform === "cygwin") {
    os = "windows";
    extension = ".exe";
  }

  try {
    return require.resolve(`git-cliff-${os}-${arch}/bin/git-cliff${extension}`);
  } catch (error) {
    throw new Error(`Couldn't find git-cliff binary inside node_modules for ${os}-${arch}`, {
      cause: error,
    });
  }
}
