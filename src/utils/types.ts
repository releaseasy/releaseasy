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
