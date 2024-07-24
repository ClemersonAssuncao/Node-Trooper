import { getApp } from "./finder";
import type { App, ActionCommand } from "../../commons/types";

function run(appName: string, options: any, commander: any): any {  

  const [, ...args] = commander.args;
  const functionName = args.shift() || 'run';

  const action: ActionCommand = {
    appName,
    functionName,
    options,
    args
  }
  const app: App|void = getApp(action);

  if (app){
    app.instance[functionName](app, ...args)
  }
}



export {
  run
}