import { vi } from "vitest";

vi.mock("@inquirer/prompts", () => ({
  select: vi.fn(),
  input: vi.fn(),
  confirm: vi.fn(),
}));

vi.mock("../src/utils/git.ts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/utils/git.ts")>();

  return {
    ...actual,
    isGitAvailable: vi.fn<typeof actual.isGitAvailable>(),
  };
});

vi.mock("../src/utils/git-cliff.ts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/utils/git-cliff.ts")>();

  return {
    ...actual,
    runGitCliff: vi.fn(),
  };
});
