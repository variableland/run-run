import { createShellService } from "@variableland/clibuddy";
import { ctx } from "./ctx";

export const shell = createShellService({
  localBaseBinPath: [ctx.value.appPkg.dirPath, ctx.value.binPkg.dirPath],
});
