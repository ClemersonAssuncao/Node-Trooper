import { getApp } from "./finder";
import { App } from "../../commons/types";
import { createFunction } from "../controll/app-generator";

function run(appName: string, options: any, commander: any): any {  

  const app: App = getApp(appName, options);

  const [, ...args] = commander.args;
  const action = args.shift() || 'run';

  if (!app.instance[action]){
    if (options.new){
      createFunction(app, action, args);
    } else {
      throw new Error(`Não foi encontrado o método ${action} no app ${appName}`);
    }
  } else {
    app.instance[action](app, ...args)
  }
}



export {
  run
}