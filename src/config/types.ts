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

export interface InlineConfig extends UserConfig {
  cwd?: string;
  config?: string;
  dryRun?: boolean;
  verbose?: boolean[];
}

// release 流程 运行时的上下文数据
export interface ReleaseContext {
  name: string;
  resolvedCwd: string;
  resolvedCliffFile: string;
  latestVersion: string;
  remoteUrl: string;
  packageJsonPath: string;
  tagCreated: boolean;
  initialCommitSha: string;
  branchName: string;
}
