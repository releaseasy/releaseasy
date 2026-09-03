import { select, confirm } from "@inquirer/prompts";
import ansis from "ansis";

export async function init(inlineOps) {
  const options = await promptInit();
}

async function promptInit() {
  console.log(`\n${ansis.green.bold("Welcome to releaseasy!")}\n`);

  const configFormat = await select({
    message: "Which config format would you like?",
    choices: [
      {
        name: "JavaScript",
        value: "javascript",
      },
      {
        name: "TypeScript",
        value: "typescript",
      },
      {
        name: "JSON",
        value: "json",
      },
    ],
  });
}
