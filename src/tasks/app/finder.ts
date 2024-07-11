import fs from 'fs';
import type { App } from '../../commons/types';
import path from 'path';
import { load as loadConfiguration } from '../config';


function instanceApp( app: App): App{
  try {
    const pathName = path.join(__basedir, 'apps', app.name, 'index.ts');
    app.instance = require(pathName);

  } catch (ex){
    console.log(`Erro ao instanciar o app ${app.name}`, ex);
  }

  return app;
}

function getApp(appName: string, options: any ): App {
  const module = fs.readdirSync("./apps/", { withFileTypes: true })
                      .find(dir => dir.isDirectory() && dir.name == appName);
  if (!module) {
    throw new Error(`App ${appName} not found!`);
  }
  const app: App = {name: module.name};
  
  app.config = loadConfiguration(app, options);

  return instanceApp(app);
}

export {
  getApp,
}