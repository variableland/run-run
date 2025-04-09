import { createShellService } from "@variableland/clibuddy";
import { ctx } from "./ctx";

export const shell = createShellService({
  localBaseBinPath: [ctx.value.binPkg.dirPath],
});
