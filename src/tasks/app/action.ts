import { getApp } from "./finder";
import { App } from "../../commons/types";
import { apply as applyConfig } from "../config";
import { remove as removeConfig } from "../config";

function run(appName: string, options: any, commander: any): any {  

  const app: App = getApp(appName);
  
  for (const option in options) {
    if (option == 'remove'){
      removeConfig(app, options.remove);
    }
    if (option == 'config'){
      applyConfig(app, options.config);
    }
  }

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