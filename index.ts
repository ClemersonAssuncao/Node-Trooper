import { Command } from '@commander-js/extra-typings';
import { add as addAppCommand } from './src/tasks/app';

declare global {
  var __basedir: string;
}
global.__basedir = __dirname;


const cli = new Command();
addAppCommand(cli);

cli.parse(process.argv);