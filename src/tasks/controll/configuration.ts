import { App, AppConfig } from "../../commons/types";
import { arrayToObject } from "../../commons/utils";
import fs from 'fs';
import path from 'path';

const FILE_NAME = 'config.json';
const FILE_PATH = process.env.APPDATA + '/NodeTrooper/';

function load(app: App, options: any): AppConfig {

  const appConfig: AppConfig = {
    filePath: path.join(FILE_PATH, app.name)
  };
  appConfig.values = loadFile(appConfig);

  for (const option in options) {
    if (option == 'remove'){
      remove(appConfig, options.remove);
    }
    if (option == 'config'){
      apply(appConfig, options.config);
    }
  }
  save(appConfig);
  
  return appConfig;
}

function apply(appConfig: AppConfig, options: any): void {
  const optionsConfig = options && arrayToObject(options) || {};
  
  if (!appConfig){
    return;
  }

  appConfig.values = {...appConfig.values, ...optionsConfig};

}

function remove(appConfig: AppConfig, options: any): void {

  if (!appConfig){
    return;
  }

  if (appConfig.values){
    for (const option of options) {   
      if (appConfig.values[option])
        delete appConfig.values[option];
    }
  }

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
  remove,
  load
}