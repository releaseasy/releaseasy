function getValue<T extends object>(context: T, path: string): unknown {
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

export function interpolate<T extends object>(template: string, context: T): string {
  return template.replace(/\$\{([^}]+)\}/g, (_match, path: string) => {
    const value = getValue(context, path);

    if (value === undefined) {
      throw new Error(`Unknown template variable: ${path.trim()}`);
    }

    return String(value);
  });
}

export function sprintf(template: string, ...args: string[]) {
  let index = 0;

  const result = template.replace(/%s/g, () => {
    const value = args[index++];

    if (value === undefined) {
      throw new Error("Missing template argument");
    }

    return value;
  });

  if (index < args.length) {
    throw new Error("Too many template arguments");
  }

  return result;
}
