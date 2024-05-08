import fs, { Dirent } from 'fs';
import { Project } from '../types';

function instanceProject( dirent: Dirent): Project{
  const project: Project = {name: dirent.name};

  try {
    const instance = require(`../apps/${dirent.name}/index.js`);
    project.instance = instance;

  } catch (ex){
    console.log(`Erro ao instanciar projeto ${dirent.name}`, ex);
  }

  return project;
}

function getApps():Array<Project>{

  const modules = fs.readdirSync("./apps/", { withFileTypes: true })
                        .filter(dir => dir.isDirectory())
                        .map(instanceProject);
  return modules;
}
// function runCommand(): void {

//   const projectName = cli.args.shift();
//   const functionName = cli.args.shift() || 'run';

//   if (!projectName){
//     throw new Error('Não foi especificado nenhum projeto para execução');
//   }

//   const project = findProject(projectName);

//   if (!project.instance[functionName]){
//     throw new Error(`Não foi encontrado a função '${functionName}' dentro do projeto ${projectName}`)
//   }

//   project.instance[functionName](...cli.args);
    
// }

// function findProject(name: string): Project {

//   const module = fs.readdirSync("./app/", { withFileTypes: true })
//                         .find(dir => dir.isDirectory() && dir.name.toLocaleLowerCase() == name.toLocaleLowerCase());

//   if (!module){
//     throw new Error(`Não foi encontrado o projeto '${name}' informado`)
//   }

//   const instance = require(`./app/${name}/index.js`);

//   return {
//     name,
//     instance
//   };
// }


export {
  getApps,
}