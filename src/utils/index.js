import { createConsola } from "consola";

import { x } from "tinyexec";

import { NAME } from "../constants";

export const logger = createConsola({
  defaults: {
    tag: NAME,
  },
});
