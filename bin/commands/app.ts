import { Command } from "commander";
import { getApps } from "../../controll/app";


function add(cli: Command): void {
  
  const appCommand = cli.command('app')
                        .description('Chose a app to execute');

  const apps = getApps();

  for (const app of apps) {

    if (!app.instance){
      continue;
    }  
    
    const module = appCommand.command(app.name)
                             .description(app.instance.description || `Runs the application ${app.name}`);

    for (const functionName of Object.keys(app.instance)) {

      if (functionName != 'description'){
        module.command(functionName)
          .argument('[params...]')
          .description('Runs the function locally')
          .action((params) => app.instance[functionName](...params) );
      }
    }
  }

}

export {
  add,
}