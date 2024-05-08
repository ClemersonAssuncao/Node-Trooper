#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const entry = path.resolve(__dirname, '../dist/bin.js');

if (fs.existsSync(entry)) {
  require(entry);
} else {
  console.log('Não foi possível carregar os comandos, execute "npm run compile".');
}
