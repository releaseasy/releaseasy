import type { DetectResult } from "package-manager-detector";
import type { ReleaseType } from "semver";

import type { ChangelogFormat, ConfigAction, ConfigFormat } from "../constants/index.ts";
import type { RequiredDeep } from "../utils/types.ts";

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
export type ResolvedOptions = RequiredDeep<Omit<InlineConfig, "hooks" | "config">> & {
  hooks?: Hooks;
};

/** @internal */
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
  changelog: {
    output: string;
  };
}

export interface InitOptions {
  cwd?: string;
  force?: boolean;
}

export type ResolvedInitOptions = Required<InitOptions>;

/** @internal */
export interface InitContext {
  resolvedCwd: string;
  packageManager: DetectResult;
  packageJsonPath: string;
  configFormat: ConfigFormat;
  changelogFormat: ChangelogFormat;
  isTypeScriptProject: boolean;
  shouldAddScripts: boolean;
  moduleFormat: "esm" | "commonjs";
  configFile: string;
  configAction: ConfigAction;
  cliffFile: string;
}
