import { load } from "./controll/configuration";
import { getApp } from "./controll/finder";
import { ActionCommand, App } from "./types";

async function run(appName: string, options: any, commander: any): Promise<void> {  

  const [, ...args] = commander.args;
  const functionName = args.shift() || 'run';

  const action: ActionCommand = {
    appName,
    args,
    functionName,
    options,
  }
  const app = await getApp(action);

  if (!app) {
    return;
  }

  if (app && app.indexFile?.instance) {
    app.config = load(app, options);
    app.indexFile.instance[functionName](app, ...args)
  }
}



export {
  run
}