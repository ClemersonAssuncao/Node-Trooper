import { App, AppConfig } from "../types";
import { arrayToObject } from "../../commons/utils";
import fs from 'fs';
import path from 'path';

const FILE_NAME = 'config.json';

function setup(app: App, options: any): AppConfig {
  const appConfig: AppConfig = {
    filePath: path.join(__basedir, 'apps', app.name),
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

  if (!fs.existsSync(appConfig.filePath)){
    fs.mkdirSync(appConfig.filePath, { recursive: true });
    return {};
  }

  const data = fs.readFileSync(path.join(appConfig.filePath,FILE_NAME), 'utf8');
  return JSON.parse(data);
}

function save(appConfig:AppConfig){
  fs.writeFileSync(path.join(appConfig.filePath,FILE_NAME), JSON.stringify(appConfig.values));
}

export {
  apply,
  remove,
  setup
}