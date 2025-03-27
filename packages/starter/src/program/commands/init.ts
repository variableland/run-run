import { $ } from "@variableland/clibuddy";
import { createCommand } from "commander";
import { Logger } from "~/services/logger";

export const initCommand = createCommand("init")
  .description("init a new project in the current directory 🚀")
  .action(async function initAction() {
    try {
      Logger.info("Well done! 🎉");
    } catch {
      Logger.error("Failed to run plop");
      process.exit(1);
    }
  })
  .addHelpText(
    "afterAll",
    "\nUnder the hood, this command uses the Plop.js CLI to generate the project.",
  );
