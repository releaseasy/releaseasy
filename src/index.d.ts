import type { ReleaseType } from "semver";

type DistTag = "latest" | "next" | "beta" | "alpha" | "canary" | "rc" | (string & {}); // 允许自定义

type ChangelogOptions = {
  output?: string;
  configFile?: string;
  args?: string;
  format?: string;
};

export interface UserConfig {
  increments?: ReleaseType[];
  distTags?: DistTag[];
  git?: {
    requireBranch?: string | string[] | RegExp | false;
    commitMessage?: string;
    commitArgs?: string[];
    tagName?: string;
    changelog?: false | ChangelogOptions;
  };
}

export declare function defineConfig(config: UserConfig): UserConfig;
