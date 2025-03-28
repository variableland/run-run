import fs from "node:fs";
import {
  type PkgService,
  createContextService,
  createPkgService,
  cwd,
} from "@variableland/clibuddy";
import { Logger } from "./logger";

export interface ContextValue {
  rrPkg: PkgService;
  appPkg: PkgService | null;
}

export const ctx = createContextService<ContextValue>();

export async function createContextValue(): Promise<ContextValue> {
  const d = Logger.subdebug("create-context-value");

  if (!process.env.BIN_PATH) {
    throw new Error("Required BIN_PATH env var");
  }

  const binPath = fs.realpathSync(process.env.BIN_PATH);

  d("bin path %s", binPath);
  d("process cwd %s", process.cwd());

  if (process.env.PWD) {
    d("PWD %s", process.env.PWD);
  }

  const [appPkg, rrPkg] = await Promise.all([createPkgService(cwd), createPkgService(binPath)]);

  if (!rrPkg) {
    throw new Error("Could not find run-run package.json");
  }

  if (appPkg) {
    d("app pkg info %O", appPkg.info());
  }

  d("rr pkg info %O", rrPkg.info());

  return {
    appPkg,
    rrPkg,
  };
}
