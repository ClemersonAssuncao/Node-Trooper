#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

const args = process.argv.slice(2).join(' ');
const cwd = path.resolve(__dirname);

// Executar o comando npm run start no diretório atual
exec(`npm run start --color -- app ${args}`, { cwd: cwd, stdio: 'inherit' }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }

  console.log(`Stdout: ${stdout}`);
});