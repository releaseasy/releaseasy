export type Awaitable<T> = T | Promise<T>;

export type ExcludeAt<T, Path extends string, U> = Path extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Omit<T, K> & {
        [P in K]: ExcludeAt<T[P], Rest, U>;
      }
    : T
  : Path extends keyof T
    ? Omit<T, Path> & {
        [P in Path]: Exclude<T[P], U>;
      }
    : T;

type Builtin = string | number | boolean | bigint | symbol | Date | RegExp | Function;

export type RequiredDeep<T> = T extends Builtin
  ? T
  : T extends readonly (infer U)[]
    ? RequiredDeep<U>[]
    : T extends object
      ? {
          [K in keyof T]-?: RequiredDeep<T[K]>;
        }
      : T;
