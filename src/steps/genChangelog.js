import { Spinner } from "picospinner";
import { runGitCliff } from "../git-cliff";
import { createSpinner, getStdio, shouldShowSpinner, isVerbose } from "../utils/index.js";
import { interpolate } from "../utils/interpolate.js";

const spinner = createSpinner("Generating changelog, please wait…");

export default async function genChangelog(options, context) {
  if (options.git.changelog === false) return;

  const showSpinner = shouldShowSpinner(options);

  if (showSpinner) {
    spinner.start();
  }

  const args = buildGitCliffArgs(options, context);

  try {
    const res = await runGitCliff(args, {
      nodeOptions: {
        stdio: getStdio(options),
      },
    });

    if (showSpinner) {
      spinner.succeed("Changelog generated");
    }
  } catch (error) {
    if (showSpinner) {
      spinner.fail("Failed to generate changelog");
    }
    throw error;
  }
}

function buildGitCliffArgs(options, context) {
  const { args: argTemplate, configFile, output } = options.git.changelog;

  const args = parseArgs(interpolate(argTemplate, context));

  args.push("--config", configFile);
  args.push("--output", output);

  return [...args, ...getVerboseArgs(options)];
}

function getVerboseArgs(options) {
  if (!isVerbose(options)) {
    return [];
  }

  return [`-${"v".repeat(options.verbose)}`];
}

function parseArgs(input) {
  const args = [];

  let current = "";
  let quote = null;
  let escaped = false;
  let hasToken = false;

  const push = () => {
    if (!hasToken) {
      return;
    }

    args.push(current);
    current = "";
    hasToken = false;
  };

  for (const char of input.trim()) {
    if (escaped) {
      current += char;
      hasToken = true;
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      hasToken = true;
      continue;
    }

    if (quote !== null) {
      if (char === quote) {
        quote = null;
      } else {
        current += char;
      }

      hasToken = true;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      hasToken = true;
      continue;
    }

    if (/\s/.test(char)) {
      push();
      continue;
    }

    current += char;
    hasToken = true;
  }

  if (escaped) {
    current += "\\";
  }

  if (quote !== null) {
    throw new Error(`Unclosed quote: ${quote}`);
  }

  push();

  return args;
}
