import { Index } from "../tasks/generator/index-file";

type App = {
  name: string;
  instance?: any;
  indexFile?: Index;
  config?: AppConfig;
}

type AppConfig = {
  filePath: string;
  values?: any[] | any | {};
}

type ActionCommand = {
  appName: string,
  options: any,
  functionName: string,
  args: any
}

export {
  App,
  AppConfig,
  ActionCommand
}