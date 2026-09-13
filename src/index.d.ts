import type { ReleaseType } from "semver";

type DistTag = "latest" | "next" | "beta" | "alpha" | "canary" | "rc" | (string & {}); // 允许自定义

type ChangelogOptions = {
  output?: string;
  configFile?: string;
  args?: string;
};

type StepName = "changelog" | "bump";

type HookEvent = `before:${StepName}` | `after:${StepName}`;

type Hooks = Partial<Record<HookEvent, string | string[]>>;

export interface UserConfig {
  increments?: ReleaseType[];
  distTags?: DistTag[];
  git?: {
    requireBranch?: string | string[] | RegExp | false;
    commitMessage?: string;
    addArgs?: string[];
    commitArgs?: string[];
    tagName?: string;
    changelog?: false | ChangelogOptions;
  };
  hooks?: Hooks;
}

export declare function defineConfig(config: UserConfig): UserConfig;
