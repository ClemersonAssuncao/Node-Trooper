import fs from 'fs';
import path from 'path';
import { App } from '../../commons/types';
import { validateName } from './validate';

function createApp(appName: string) {
  fs.mkdirSync(`./apps/${appName}`, { recursive: true });

  const filePath = path.join(__basedir, 'apps', appName, 'index.ts');
  const importData = `import { App } from "../../src/commons/types";\n`
  fs.writeFileSync(filePath,importData);

  console.log(`Criado o seguinte app: ${appName} - ${filePath}`);
}

function createFunction(app: App, functionName: string, params: any) {
  const filePath = path.join(__basedir, 'apps', app.name, 'index.ts');

  validateName(functionName, params);

  var paramData = params.length > 0 ? ', ' + params.map((element: string) => `${element}:any`).join(', ') : '';

  const data = `\nexport function ${functionName} (app: App${paramData}) {\n  console.log("Executado novo método ${functionName}");\n}\n`;
  
  fs.appendFileSync(filePath, data, 'utf8');
  console.log(`Função ${functionName} criada no app ${app.name}, params:`, params);
}

export {
  createApp,
  createFunction
}