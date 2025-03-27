import createDebug from "debug";

type DebugFn = ReturnType<typeof createDebug>;

export interface AnyLogger {
  info: typeof console.log;
  error: typeof console.error;
  debug: DebugFn;
  subdebug: (label: string) => DebugFn;
}

export class Logger implements AnyLogger {
  #debug: DebugFn;

  #rootLabel: string;

  constructor(rootLabel: string) {
    this.#debug = createDebug(`${rootLabel}:default`);
    this.#rootLabel = rootLabel;
  }

  info(message: string, ...args: unknown[]) {
    console.log(message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    console.error(message, ...args);
  }

  subdebug(label: string) {
    return createDebug(`${this.#rootLabel}:${label}`);
  }

  get debug() {
    return this.#debug;
  }
}

export function createLogger(rootLabel: string) {
  return new Logger(rootLabel);
}
