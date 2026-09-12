export function parseArgsStringToArgv(input) {
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
