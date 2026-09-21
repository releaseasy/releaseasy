import type { ReleaseType } from "semver";

type DistTag = "latest" | "next" | "beta" | "alpha" | "canary" | "rc" | (string & {}); // 允许自定义

type ChangelogOptions = {
  output?: string;
  configFile?: string;
  args?: string;
};

type StepName = "changelog" | "bump";

type StepHookEvent = `before:${StepName}` | `after:${StepName}`;

type LifecycleHookEvent = "before:init" | "after:release";

type HookEvent = StepHookEvent | LifecycleHookEvent;

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
