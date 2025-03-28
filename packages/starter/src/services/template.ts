import path from "node:path";
import { Plop, run } from "plop";
import { Logger } from "./logger";

type PlopType = typeof Plop;
type PrepareOptions = Parameters<PlopType["prepare"]>[0];
type RunOptions = Parameters<typeof run>[0];

export class TemplateService {
  async generate(options: { cwd: string; dest: string }) {
    const { cwd, dest } = options;

    const d = Logger.subdebug("generate");

    const prepareOptions: PrepareOptions = {
      cwd,
      configPath: path.join(cwd, "plopfiles", "plopfile.js"),
    };

    d("prepare options %O", prepareOptions);

    return new Promise((resolve, reject) => {
      Plop.prepare(prepareOptions, (env) => {
        Plop.execute(env, (env) => {
          const runOptions: RunOptions = {
            ...env,
            // @ts-expect-error
            dest,
          };

          d("run options %O", runOptions);

          run(runOptions, undefined, true).then(resolve, reject);
        });
      });
    });
  }
}

export const templateService = new TemplateService();
