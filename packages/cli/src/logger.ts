// @ts-expect-error type defs not found
import createDebug from "debug";

type DebugFn = (message: string, ...args: unknown[]) => void;

const ROOT_DEBUG_LABEL = "run-run";
const rootDebug = createDebug(`${ROOT_DEBUG_LABEL}:cli`);

export interface AnyLogger {
  info: typeof console.log;
  error: typeof console.error;
  debug: DebugFn;
  subdebug: (label: string) => DebugFn;
}

export const Log: AnyLogger = {
  info: console.log.bind(console),
  error: console.error.bind(console),
  debug: (message: string, ...args: unknown[]) => {
    rootDebug(message, ...args);
  },
  subdebug: (label: string): DebugFn => {
    return createDebug(`${ROOT_DEBUG_LABEL}:${label}`);
  },
};
