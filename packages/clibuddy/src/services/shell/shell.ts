import { type Options, type Shell, $ as make$ } from "zx";

type ShellOptions = Partial<Options>;

export class ShellService {
  #shell: Shell;
  #quiet: Shell;

  constructor(options: ShellOptions) {
    this.#shell = make$(options);
    this.#quiet = make$({ ...options, verbose: false });
  }

  get $() {
    return this.#shell;
  }

  get $quiet() {
    return this.#quiet;
  }
}
