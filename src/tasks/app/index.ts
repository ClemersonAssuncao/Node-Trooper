import { Command, program } from '@commander-js/extra-typings';
import { run as runAction } from './action';

function add(cli: Command): void {
  cli.command('app <action>')
      .option('-n, --new', 'Create a new function and/or app')
      .option('-c, --config <params...>', 'Add or Edit a App configuration. ')
      .option('-r, --remove <params...>', 'Remove a App configuration. ')
      .description('Chose a app to execute')
      .action(runAction);
}

export {
  add,
}