import { createCommand } from 'commander';
import { add as addAppCommand } from './bin/commands/app';

// import fs from 'fs';

const cli = createCommand('trooper')
  .argument('<command>', 'Command')
  .helpCommand(false);


addAppCommand(cli);


// const cli = createCommand('trooper')
//   .argument('<command>', 'Command')
//   .helpCommand(false);


// cli.addOption().action(() => console.log('config'));
// cli.command('app', 'Define app').action(() => console.log('app'));

// program.command('config', 'Define configuration').action(() => console.log('config'));

// program.command('teste', 'Define configuration').action(() => console.log('teste'));



function run(): void {
  cli.parse();
}

export {
  run,
};
