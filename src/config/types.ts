import type { ReleaseType } from "semver";

export type DistTag = "latest" | "next" | "beta" | "alpha" | "canary" | "rc" | (string & {}); // 允许自定义

type ChangelogOptions = {
  output?: string;
  configFile?: string;
  args?: string;
};

type StepName = "changelog" | "bump";

type StepHookEvent = `before:${StepName}` | `after:${StepName}`;

type LifecycleHookEvent = "before:init" | "after:release";

export type HookEvent = StepHookEvent | LifecycleHookEvent;

type Hooks = Partial<Record<HookEvent, string | string[]>>;

// 公开的用户的api
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
  verbose?: number;
}

// 内部用的选项
export interface ResolvedOptions {
  increments: ReleaseType[];
  distTags: DistTag[];
  git: {
    requireBranch: string | string[] | RegExp | false;
    commitMessage: string;
    addArgs: string[];
    commitArgs: string[];
    tagName: string;
    changelog: false | Required<ChangelogOptions>;
  };
  hooks?: Hooks;
  cwd: string;
  dryRun: boolean;
  verbose: number;
}

// release 流程 运行时的上下文数据
export interface ReleaseContext {
  name: string;
  version: string;
  tagName: string;
  distTag: DistTag;
  commitMessage: string;
  resolvedCwd: string;
  resolvedCliffFile: string | undefined;
  latestVersion: string;
  remoteUrl: string;
  packageJsonPath: string;
  tagCreated: boolean;
  initialCommitSha: string;
  branchName: string;
}
