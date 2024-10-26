import { setup as setupLogger } from "./src/logger";
import { setup as setupCommander } from "./src/application/cli";

declare global {
  var __basedir: string;
}
global.__basedir = __dirname;

function run() {
  void setupLogger();
  void setupCommander();
}

run();