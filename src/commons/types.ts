type App = {
  name: string;
  instance?: any;
  config?: AppConfig;
}

type AppConfig = {
  filePath: string;
  values?: any[];
}

export {
  App,
  AppConfig
}