import ansis from "ansis";

export const logger = {
  info(message) {
    console.log(message);
  },

  success(message) {
    console.log(`${ansis.green("✓")}  ${message}`);
  },

  warn(message) {
    console.log();
    console.warn(`${ansis.yellow("⚠")}  ${message}`);
    console.log();
  },

  error(message) {
    console.log();
    console.error(`${ansis.red("✖")}  ${message}`);
    console.log();
  },
};
