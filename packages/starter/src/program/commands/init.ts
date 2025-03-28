import { join } from "node:path";
import { cwd } from "@variableland/clibuddy";
import { Argument, createCommand } from "commander";
import nodePlop from "node-plop";
import { ctx } from "~/services/ctx";
import { Logger } from "~/services/logger";
import { PlopTemplateService } from "~/services/template";

export const initCommand = createCommand("init")
  .description("init a new project in the current directory 🚀")
  .addArgument(new Argument("<template>", "the template to use").choices(["basic", "lib"]))
  .option("-d, --dest", "the destination directory")
  .action(async function initAction(template, options) {
    try {
      const configPath = join(ctx.value.binPkg.dirPath, "plopfiles", "plopfile.js");

      const plop = await nodePlop(configPath, {
        force: false,
        destBasePath: options.dest ?? cwd,
      });

      const templateService = new PlopTemplateService(plop);

      await templateService.generate({
        generatorId: "init",
        template,
      });

      // TODO: cd to the new project, init git, install deps
    } catch {
      Logger.error("Failed to run init command");
      process.exit(1);
    }
  })
  .addHelpText("afterAll", "\nUnder the hood, this command uses Plop.js to generate the project.");
