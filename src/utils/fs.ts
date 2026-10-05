import fs from "node:fs/promises";
import path from "node:path";

export async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function isDirectory(filePath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(filePath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

export async function assertDirectory(directory: string): Promise<string> {
  const resolvedPath = path.resolve(directory);

  if (!(await isDirectory(resolvedPath))) {
    throw new Error(`Directory does not exist: ${resolvedPath}`);
  }

  return resolvedPath;
}

export async function isFile(filePath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

export async function outputFile(
  filePath: string,
  data: Parameters<typeof fs.writeFile>[1],
  options?: Parameters<typeof fs.writeFile>[2],
): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, data, options);
}
