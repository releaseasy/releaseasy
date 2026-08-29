import CONSTANTS from "../constants/index.js";

function getValue(context, path) {
  return path
    .trim()
    .split(".")
    .reduce((value, key) => value?.[key], context);
}

export function interpolate(template, context) {
  if (typeof template !== "string") {
    return template;
  }

  return template.replace(CONSTANTS.VARIABLE_RE, (match, path) => {
    const value = getValue(context, path);

    if (value === undefined) {
      throw new Error(`Unknown template variable: ${path.trim()}`);
    }

    return String(value);
  });
}
