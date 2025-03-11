// @ts-expect-error type defs not found
import createDebug from "debug";

type DebugFn = (message: string, ...args: unknown[]) => void;

const ROOT_DEBUG_LABEL = "run-run";
const rootDebug = createDebug(`${ROOT_DEBUG_LABEL}:cli`);

interface AnyLogger {
  info: typeof console.log;
  debug: DebugFn;
  subdebug: (label: string) => DebugFn;
}

const StubLogger: AnyLogger = {
  info: () => {},
  debug: () => {},
  subdebug: () => () => {},
};

const RRLogger: AnyLogger = {
  info: console.log.bind(console),
  debug: (message: string, ...args: unknown[]) => {
    rootDebug(message, ...args);
  },
  subdebug: (label: string): DebugFn => {
    return createDebug(`${ROOT_DEBUG_LABEL}:${label}`);
  },
};

let Log: AnyLogger;

if (process.env.LOG === "0") {
  Log = StubLogger;
} else {
  Log = RRLogger;
}

export { Log };
