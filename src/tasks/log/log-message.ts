import chalk from "chalk";
import { divisor, error, log, warning } from "./log-printer";
import { App } from "../../commons/types";
import { getFunctionParameters } from "../../commons/utils";
import fs from 'fs';
import path from "path";

function logFunctionNotFound(app:App, functionName:string){
  
  error(`Não foi encontrado o método ${chalk.red(functionName)} no app ${chalk.blue(app.name)}.`);
  log(`Utilize o parametro ${chalk.blue('-n')} ou ${chalk.blue('--new')} para criá-lo ou execute um dos seguintes métodos do app ${chalk.green(app.name)}:`);
  for (const func  in app.instance) {
    const params = getFunctionParameters(app.instance[func]);
    log(`   * ${chalk.green(func)}: ${ params?.length || 'Não possui parâmetros' }`)
  }
}

function logAppNotFound(appName: string){
  error(`Não foi encontrado o app ${chalk.red(appName)} no diretório ${chalk.blue(path.join(__basedir, 'apps'))}.`);
  log(`Utilize o parametro ${chalk.blue('-n')} ou ${chalk.blue('--new')} para criá-lo ou selecione um dos seguintes apps:`);

  const apps = fs.readdirSync("./apps/", { withFileTypes: true })
                .filter(dir => dir.isDirectory());

  for (const app  of apps) {
    log(`   * ${chalk.green(app.name)}`)
  }
}

function logAppCreated(appName: string){
  warning(`O app ${chalk.red(appName)} não foi encontrado,`)
  log(`porém foi criado no diretório ${chalk.blue(path.join(__basedir, 'apps'))}.`);
  log(`Desenvolva seu código dentro do index.ts dessa pasta.`);
  divisor();
}

function logReservedName(name: string){
  error(`O nome ${chalk.red(name)} é uma palavra reservada do Javascript e não pode ser usado.`)
  log(`escolha outro nome e tente novamente`);
  divisor();
}

function logFunctionCreated(appName: string, functionName: string, params: any){
  warning(`O app ${chalk.red(appName)} não foi encontrado,`)
  log(`porém foi criado no diretório ${chalk.blue(path.join(__basedir, 'apps'))}.`);
  log(`Desenvolva seu código dentro do index.ts dessa pasta.`);
  divisor();
}

export {
  logFunctionNotFound,
  logAppNotFound,
  logAppCreated,
  logReservedName
}