import fs from "node:fs/promises";
import path from "node:path";

const srcDir = process.argv[2];

if (!srcDir) {
  console.error("Usage: node dump-dir.mjs <src-directory>");
  process.exit(1);
}

const rootDir = path.resolve(srcDir);
const outputFile = path.resolve("output.txt");

async function getFiles(dir) {
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = await getFiles(rootDir);

files.sort();

const sections = [];

for (const file of files) {
  const relativePath = path.relative(process.cwd(), file);
  const content = await fs.readFile(file, "utf8");

  sections.push(`===== ${relativePath} =====\n\n${content}`);
}

await fs.writeFile(outputFile, sections.join("\n\n\n"), "utf8");

console.log(`Generated: ${outputFile}`);
console.log(`Files: ${files.length}`);
