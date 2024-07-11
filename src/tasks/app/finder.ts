import fs, { Dirent } from 'fs';
import type { App } from '../../commons/types';
import path from 'path';


function instanceApp( dirent: Dirent): App{
  const project: App = {name: dirent.name};
  try {
    const pathName = path.join(__basedir, 'apps', dirent.name, 'index.ts');
    project.instance = require(pathName);

  } catch (ex){
    console.log(`Erro ao instanciar o app ${dirent.name}`, ex);
  }

  return project;
}

function getApp(appName: string ): App {
  const module = fs.readdirSync("./apps/", { withFileTypes: true })
                      .find(dir => dir.isDirectory() && dir.name == appName);
  if (!module) {
    throw new Error(`App ${appName} not found!`);
  }
  
  return instanceApp(module);
}

export {
  getApp,
}