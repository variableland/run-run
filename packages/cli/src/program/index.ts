import { Command } from "commander";
import { BANNER_TEXT, CREDITS_TEXT } from "../ui";
import { cleanCommand } from "./commands/clean";
import { formatCommand } from "./commands/format";
import { lintCommand } from "./commands/lint";
import { testStaticCommand } from "./commands/test-static";

export function createProgram() {
  return new Command("run-run")
    .alias("rr")
    .addHelpText("before", BANNER_TEXT)
    .addHelpText("after", CREDITS_TEXT)
    .addCommand(formatCommand)
    .addCommand(lintCommand)
    .addCommand(testStaticCommand)
    .addCommand(cleanCommand);
}
