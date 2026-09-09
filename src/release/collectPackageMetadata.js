import { readPackageJSON } from "pkg-types";
import semver from "semver";

export default async function collectPackageMetadata(options, context) {
  const pkg = await readPackageJSON(options.cwd);

  if (!pkg.name || pkg.name.trim() === "") {
    throw new Error(`package.json "name" must be a non-empty string.`);
  }

  if (!pkg.version || !semver.valid(pkg.version)) {
    throw new Error(`package.json "version" must be a valid semver version.`);
  }

  // 赋值给上下文
  context.name = pkg.name;
  context.latestVersion = pkg.version;
}
