import { createCommand } from "commander";
import { Log } from "~/logger";
import { useStore } from "~/store";
import { get } from "~/utils/get";

export const pkgCommand = createCommand("pkg")
  .description("display run-run package.json")
  .option("-f, --filter <filter>", "lodash get id like to filter info by")
  .action(async function pkgAction(options) {
    const store = useStore();

    try {
      const info = store.rrPkg.info();

      if (!options.filter) {
        Log.info("%O", info);
        return;
      }

      const { filter } = options;
      const subinfo = get(info.packageJson, filter);

      if (!subinfo) {
        Log.info("No info found");
        return;
      }

      Log.info("%O", { [filter]: subinfo });
    } catch {
      process.exit(1);
    }
  });
