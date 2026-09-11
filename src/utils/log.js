import { createConsola } from "consola";
import CONSTANTS from "../constants/index.js";

export const logger = createConsola();

export const appLogger = logger.withDefaults({
  tag: CONSTANTS.CLI_NAME,
});
