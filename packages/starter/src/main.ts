import { createProgram } from "./program";
import { Logger } from "./services/logger";

async function main(argv = process.argv) {
  try {
    const program = createProgram();
    await program.parseAsync(argv);
  } catch (error) {
    Logger.error("Cannot run main successfully", error);
    process.exit(1);
  }
}

main();
