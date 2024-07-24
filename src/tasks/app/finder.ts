import type { ActionCommand, App } from '../../commons/types';
import { logAppNotFound, logFunctionNotFound } from '../log/log-message';
import { createApp, createFunction } from '../generator/app-generator';
import { load as loadConfiguration } from '../controll/configuration';
import fs from 'fs';
import path from 'path';
import { Index } from '../generator/index-file';


function instanceApp(app: App): any{
  try {
    const pathName = path.join(__basedir, 'apps', app.name, 'index.ts');
    return require(pathName);
  } catch (ex){
    console.log(`Erro ao instanciar o app ${app.name}`, ex);
  }

  return app;
}

function existsFunction(app: App, functionName: string, args: any, createIfNotFound?:boolean): boolean {

  const existFunction = app.instance[functionName];

  if (!existFunction){
    if (createIfNotFound) {
      createFunction(app, functionName, args);
    } else {
      logFunctionNotFound(app, functionName);
    }
  }
  return existFunction;
}

function existsApp(app:App, createIfNotFound:boolean): boolean {

  const existApp = !!fs.readdirSync("./apps/", { withFileTypes: true })
                              .find(dir => dir.isDirectory() && dir.name == app.name);
  if (!existApp) {
    if (createIfNotFound) {
      createApp(app);
    } else {
      logAppNotFound(app.name);
    }
  }
  return existApp;
}

function getApp(action: ActionCommand): App|void {

  const app: App = {name: action.appName};

  app.indexFile = new Index(action.appName);

  if (!existsApp(app, action.options.new) && !action.options.new){
    return;
  }
  
  app.config = loadConfiguration(app, action.options);
  app.instance = instanceApp(app)

  if (!existsFunction(app, action.functionName, action.args, action.options.new)){
    return;
  }

  return app;
}

export {
  getApp,
  instanceApp
}