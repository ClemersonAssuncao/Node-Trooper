import { App, AppConfig } from "../../commons/types";
import { arrayToObject } from "../../commons/utils";
import fs from 'fs';
import path from 'path';

const FILE_NAME = 'config.json';
const FILE_PATH = process.env.APPDATA + '/NodeTrooper/';

function apply(app: App, options: any): void {
  
  app.config = load(app);

  const optionsConfig = options && arrayToObject(options) || {};
  app.config.values = {...app.config.values, ...optionsConfig};

  save(app.config);
}

function remove(app: App, options: any): void {
  
  const appConfig = load(app);

  if (appConfig.values){
    for (const option of options) {   
      if (appConfig.values[option])
        delete appConfig.values[option];
    }
  }
  app.config = appConfig;

  save(app.config);
}

function load(app: App): AppConfig {

  if (app.config){
    return app.config
  }
  
  const appConfig: AppConfig = {
    filePath: path.join(FILE_PATH, app.name)
  };

  appConfig.values = loadFile(appConfig);

  return appConfig;
}

function loadFile(appConfig: AppConfig): any{
  const fileDir = path.join(appConfig.filePath, FILE_NAME);

  if (!fs.existsSync(fileDir)){
    fs.mkdirSync(appConfig.filePath, { recursive: true });
    return {};
  }

  const data = fs.readFileSync(fileDir, 'utf8');
  return JSON.parse(data);
}

function save(appConfig:AppConfig){
  const fileDir = path.join(appConfig.filePath, FILE_NAME);

  fs.writeFileSync(fileDir, JSON.stringify(appConfig.values));
}

export {
  apply,
  remove
}