import fs from "node:fs/promises";
import path from "node:path";

export async function addScripts(cwd) {
  const packagePath = path.join(cwd, "package.json");

  const source = await fs.readFile(packagePath, "utf8");
  const packageJson = JSON.parse(source);

  const scripts = packageJson.scripts ?? {};

  const additions = {
    release: "releaseasy",
  };

  const conflicts = Object.keys(additions).filter((name) => name in scripts);

  console.log(conflicts);

  if (conflicts.length > 0) {
    return {
      changed: false,
      conflicts,
    };
  }

  packageJson.scripts = {
    ...scripts,
    ...additions,
  };

  await fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2) + "\n", "utf8");

  return {
    changed: true,
    conflicts: [],
  };
}
