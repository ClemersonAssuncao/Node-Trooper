import { Command } from '@commander-js/extra-typings';
import { run as runAction } from './action';

function add(cli: Command): void {
  cli.command('app <action>')
      .option('-c, --config <params...>', 'Define config')
      .option('-r, --remove <params...>', 'Remove config')
      .description('Chose a app to execute')
      .action(runAction);
}

export {
  add,
}