import { execCli, parseProgram } from "test/helpers";
import { expect, test, vi } from "vitest";
import { $ } from "~/shell";

test("should display help message", async () => {
  const { stdout } = await execCli("format --help");

  expect(stdout).toMatchSnapshot();
});

test("should run format command", async () => {
  await parseProgram(["format"]);

  expect(vi.mocked($)).toBeCalledTimes(1);
  expect(vi.mocked($).mock.results[0]?.value).toMatchInlineSnapshot(
    `"biome format --no-errors-on-unmatched --colors=force"`,
  );
});

test("should run format command with alias", async () => {
  await parseProgram(["fmt"]);

  expect(vi.mocked($)).toBeCalledTimes(1);
  expect(vi.mocked($).mock.results[0]?.value).toMatchInlineSnapshot(
    `"biome format --no-errors-on-unmatched --colors=force"`,
  );
});

test("should run format command with --fix flag", async () => {
  await parseProgram(["format", "--fix"]);

  expect(vi.mocked($)).toBeCalledTimes(1);

  expect(vi.mocked($).mock.results[0]?.value).toMatchInlineSnapshot(
    `"biome format --no-errors-on-unmatched --colors=force --fix"`,
  );
});
