import { cwd } from "@variableland/clibuddy";
import { Argument, createCommand } from "commander";
import { ctx } from "~/services/ctx";
import { Logger } from "~/services/logger";

export const initCommand = createCommand("init")
  .description("init a new project in the current directory 🚀")
  .addArgument(new Argument("<template>", "the template to use").choices(["lib", "cli"]))
  .action(async function initAction(template) {
    try {
      // This is the only way to pass predefined options to Plop
      // when it's wrapped due to the way Plop is designed.
      process.argv = [...process.argv.slice(0, 2), ...["--template", template]];

      // Dynamic import to avoid reading the process.argv
      // before overwriting it with the predefined options
      const { templateService } = await import("~/services/template");

      await templateService.generate({
        cwd: ctx.value.binPkg.dirPath,
        dest: cwd,
      });
    } catch {
      Logger.error("Failed to run init command");
      process.exit(1);
    }
  })
  .addHelpText(
    "afterAll",
    "\nUnder the hood, this command uses the Plop.js CLI to generate the project.",
  );
