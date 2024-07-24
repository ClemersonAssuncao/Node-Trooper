import fs from 'fs';
import { App } from '../../commons/types';
import { getReservedName } from '../controll/validate';
import { logAppCreated, logReservedName } from '../log/log-message';

function createApp(app: App) {
  fs.mkdirSync(`./apps/${app.name}`, { recursive: true });

  app.indexFile?.addImport('App', '../../src/commons/types');

  app.indexFile?.addFunction('run', [{
    name: 'app',
    type: 'App'
  }]);

  logAppCreated(app.name);

}

function createFunction(app: App, functionName: string, args: any) {
  
  const reservedName = getReservedName(functionName, args)
  if (reservedName){
    logReservedName(reservedName)
    return;
  }

  const params = args.map( (param:any) => {return {name: param}});
  params.unshift({
    name: 'app',
    type: 'App'
  })

  app.indexFile?.addFunction(functionName, params);

  console.log(`Função ${functionName} criada no app ${app.name}, params:`, params);
  // logFunctionCreated(app.name, functionName, params);
}

export {
  createApp,
  createFunction
}