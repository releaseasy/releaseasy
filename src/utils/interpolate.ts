import type { ReleaseContext } from "../config/types.ts";

function getValue(context: ReleaseContext, path: string): unknown {
  return path
    .trim()
    .split(".")
    .reduce<unknown>(
      (value, key) =>
        value !== null && typeof value === "object"
          ? (value as Record<string, unknown>)[key]
          : undefined,
      context,
    );
}

export function interpolate(template: string, context: ReleaseContext): string {
  return template.replace(/\$\{([^}]+)\}/g, (_match, path: string) => {
    const value = getValue(context, path);

    if (value === undefined) {
      throw new Error(`Unknown template variable: ${path.trim()}`);
    }

    return String(value);
  });
}
