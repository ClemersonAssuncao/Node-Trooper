import chalk  from 'chalk';

function warning(text: string|[]):void {
  console.log(chalk.hex('#FFA500').bold('Aviso!'));
  log(text);
}

function error(text: string|[]):void {
  console.log(chalk.red.bold('Erro!'));
  log(text);
}

function log(text: string|[]):void {
  const messageList = [text];
  for (const message of messageList) {
    console.log(message)
  }
}

function divisor():void {
  log(`--------------------------------------------------------------------------`);
}

export {
  divisor,
  error,
  log,
  warning,
}