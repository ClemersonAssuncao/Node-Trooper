import { getApp } from "./finder";
import { App } from "../../commons/types";

function run(appName: string, options: any, commander: any): any {  

  const app: App = getApp(appName, options);

  const [, ...args] = commander.args;
  const action = args.shift();

  if (!app.instance[action]){
    throw new Error(`Não foi encontrado o método ${action} no app ${appName}`);
  }

  app.instance[action](app, ...args)
}

export {
  run
}