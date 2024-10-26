import { Command } from '@commander-js/extra-typings';
import { run as runAction } from './action';

function setup(): void {
  const cli = new Command();

  cli.command('app <action>')
    .option('-n, --new <params...>', 'Create a new function and/or app')
    .option('-c, --config <params...>', 'Add or Edit a App configuration. ')
    .option('-r, --remove <params...>', 'Remove a App configuration. ')
    .description('Chose a app to execute')
    .action(runAction);

  cli.parse(process.argv);
}

export {
    setup,
}