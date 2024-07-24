import fs from 'fs';
import path from "path";
import { parse } from '@babel/parser';
import * as types from '@babel/types';
import generate from '@babel/generator';
import { FunctionParam } from './types';
import traverse from '@babel/traverse';

export class Index {

  ast: any;
  filePath: string;
  originalCode: string;
  
  constructor(appName: string){
    this.originalCode = '';
    this.filePath = path.join(__basedir, 'apps', appName, 'index.ts');
    this.loadAST();
  }

  loadAST(){
    if (fs.existsSync(this.filePath)) {
      this.originalCode = fs.readFileSync(this.filePath, 'utf8').split('\n').map(line => line.trim() === '' ? ';' : line).join('\n'); 
    } 

    this.ast = parse(this.originalCode, {
      sourceType: 'module',
      plugins: ['typescript']
    });
  }

  addImport(importName:string, importPath:string) {
    const newImport = types.importDeclaration(
      [types.importSpecifier(types.identifier(importName), types.identifier(importName))],
      types.stringLiteral(importPath)
    );

    this.appendComponent(newImport, false);
    this.addBreakLine();
  }

  addFunction(functionName: string, params: FunctionParam[]) {
    const createParams = () => {
      return params.map( (param) => {
        const identifier = types.identifier(param.name);
        if (param.type){
          identifier.typeAnnotation = types.tsTypeAnnotation(types.tsTypeReference(types.identifier(param.type)));
        } else {
          identifier.typeAnnotation = types.tsTypeAnnotation(types.tsAnyKeyword());
        }        
        return identifier;
      })
    } 

    const newFunction = types.functionDeclaration(
      types.identifier(functionName),
      createParams(),
      types.blockStatement([types.emptyStatement()])
    )

    types.addComment(newFunction.body.body[0], 'leading', ' Implemente aqui seu método');
    
    this.appendComponent(newFunction);
    this.addBreakLine();

    this.addFunctionToExport(functionName);
  }

  addFunctionToExport(functionName:string){
    const exportDeclaration = this.ast.program.body.find((node:any) => types.isExportNamedDeclaration(node));

    if (exportDeclaration) {
      exportDeclaration.specifiers.push(types.exportSpecifier(types.identifier(functionName), types.identifier(functionName)));
      this.save();
    } else {
      this.addBreakLine();
      const newExportDeclaration = types.exportNamedDeclaration(
        null,
        [types.exportSpecifier(types.identifier(functionName), types.identifier(functionName))]
      );
      this.appendComponent(newExportDeclaration);
    }
  }

  addBreakLine(){
    this.appendComponent(types.emptyStatement())
  }

  appendComponent(component: any, pushComponent:boolean = true) {
    traverse(this.ast, {
      Program(path) {
        if (pushComponent){
          const exportIndex = path.node.body.findIndex(node => types.isExportNamedDeclaration(node));
          if (exportIndex !== -1) {
            path.node.body.splice(exportIndex, 0, component);
          } else {
            path.node.body.push(component);
          }
        } else {
          path.node.body.unshift(component);
        }
      }
    });
    this.save();
  }

  save(){
    const newCode = generate(this.ast, {}, this.originalCode).code;
    fs.writeFileSync(this.filePath, newCode.replace(/^\s*;\s*$/gm, ''));
  }
}
