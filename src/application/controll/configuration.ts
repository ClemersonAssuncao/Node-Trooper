import path from "path";
import fs from "fs";
import type { App, AppConfig } from "../types";
import { arrayToObject } from "../../commons/utils";

const FILE_NAME = 'config.json';

function load(app: App, options: any): AppConfig {
  const appConfig: AppConfig = {
    filePath: path.join(__basedir, 'apps', app.name, FILE_NAME),
  };

  appConfig.values = loadFile(appConfig.filePath);

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

function loadFile(pathFile: string): any{

  if (!fs.existsSync(pathFile)){
    return {};
  }
  
  const data = fs.readFileSync(pathFile, 'utf8');
  return JSON.parse(data);
}

function save(appConfig:AppConfig){
  fs.writeFileSync(path.join(appConfig.filePath), JSON.stringify(appConfig.values));
}

export {
  load,
}