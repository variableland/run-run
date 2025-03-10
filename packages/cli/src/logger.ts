// @ts-expect-error type defs not found
import createDebug from "debug";

type DebugFn = (message: string, ...args: unknown[]) => void;

const ROOT_DEBUG_LABEL = "run-run";
const rootDebug = createDebug(`${ROOT_DEBUG_LABEL}:cli`);

const createLabeled = (label: string) => {
  const labeled: DebugFn = createDebug(`${ROOT_DEBUG_LABEL}:${label}`);
  Logger.debugCache.set(label, labeled);
  return labeled;
};

export const Logger = {
  debugCache: new Map<string, DebugFn>(),
  ...console,
  debug: (message: string, ...args: unknown[]) => {
    rootDebug(message, ...args);
  },
  subdebug: (label: string) => {
    return Logger.debugCache.get(label) ?? createLabeled(label);
  },
};
