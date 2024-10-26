type App = {
  config?: AppConfig;
  name: string;
  indexFile?: IndexFile;
}

type AppConfig = {
  filePath: string;
  values?: any[] | any | {};
}

type ActionCommand = {
  appName: string;
  options: any;
  functionName: string;
  args: any;
}

type IndexFile = {
  instance: any;
  path: string;
}

export {
  ActionCommand,
  App,
  AppConfig,
  IndexFile,
}
