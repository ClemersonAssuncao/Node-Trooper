
import fs from "fs";
import generate from "@babel/generator";
import path from "path";
import traverse from "@babel/traverse";

import * as types from "@babel/types";

import { App } from "../types";
import { Component } from "./types";
import { Message } from "../../logger/default-text";

import { error } from "../../logger/log-printer";
import { parse } from "@babel/parser";

import type { ComponentOptions, FileContent, FunctionOptions, ImportOptions } from "./types";
import { isValidWord } from "./validation";
import { generateFunction } from "./function-generator-ai";

const INDEX_FILE_NAME = 'index.ts'

async function addComponent(app: App, component: Component, componentOptions: ComponentOptions): Promise<void> {
	const fileContent = loadAST(app);
	if (!fileContent) {
		return;
	}

	switch (component) {
		case Component.EMPTY_LINE:
			await addEmptyLineComponent(fileContent);
			break;
		case Component.FUNCTION:
			await addFunctionComponent(fileContent, componentOptions as FunctionOptions);
			break;
		case Component.IMPORT:
			await addImportComponent(fileContent, componentOptions as ImportOptions);
			break;
		default:
			error(Message.BUILDER_COMPONENT_NOT_SUPPORTED);
	}

	save(fileContent);
}

function mergeProgram(fileContent: FileContent, newAst: types.File) {
	const importDeclarations: any[] = [];
	const otherDeclarations: any[]  = [];
	const exportDeclarations: any[]  = [];
  
	function categorizeDeclarations(body: types.Statement[]) {
	  body.forEach(node => {
		if (types.isImportDeclaration(node)) {
		  importDeclarations.push(node);
		} else if (types.isExportDeclaration(node)) {
		  exportDeclarations.push(node);
		} else {
		  otherDeclarations.push(node);
		}
	  });
	}

	traverse(fileContent.ast, {
	  Program(path) {
		categorizeDeclarations(path.node.body);
		path.node.body = [];
	  }
	});
  
	traverse(newAst, {
	  Program(path) {
		categorizeDeclarations(path.node.body);
	  }
	});
  
	traverse(fileContent.ast, {
	  Program(path) {
		path.node.body = [...importDeclarations, ...otherDeclarations, ...exportDeclarations];
	  }
	});
}

function updateProgram(fileContent: FileContent, component: any, unshift?: boolean) {
	traverse(fileContent.ast, { 
		Program(path) {
			if (unshift){
				path.node.body.unshift(component);
			} else {
				const exportIndex = path.node.body.findIndex(node => types.isExportNamedDeclaration(node));
				if (exportIndex !== -1) {
					path.node.body.splice(exportIndex, 0, component);
				} else {
					path.node.body.push(component);
				}
			}
		}
	});
}

function addEmptyLineComponent(fileContent: FileContent): void {
	updateProgram(fileContent, types.emptyStatement());
}

async function addFunctionComponent(fileContent: FileContent, options: FunctionOptions): Promise<void | string> {


	if (options.role){
		const code = await generateFunction(options);
		console.log(code);
		try {
			if (code){
				const newAst = parse(code, {
					sourceType: 'module',
					plugins: ['typescript']
				})
				mergeProgram(fileContent, newAst);
				return;
			}
		} catch(message) {
			error(Message.BUILDER_FUNCTION_ERROR, {
				message
			})
		}
	}

	const parameters = options.parameters ?? [];

	if (!isValidWord([options.name,...parameters.map( (param) => param.name)])) {
		return;
	}

	parameters.unshift({
		name: 'app',
		type: 'App'
	});

	const parametersDeclaration = parameters.map((param) => {
		const identifier = types.identifier(param?.name ?? param);
		if (param.type){
			identifier.typeAnnotation = types.tsTypeAnnotation(types.tsTypeReference(types.identifier(param.type)));
		} else {
			identifier.typeAnnotation = types.tsTypeAnnotation(types.tsAnyKeyword());
		}        
		return identifier;
	});

	const functionDeclaration = types.functionDeclaration(
		types.identifier(options.name),
		parametersDeclaration,
		types.blockStatement([types.emptyStatement()]),
	)

	updateProgram(fileContent, functionDeclaration);

	addEmptyLineComponent(fileContent);

	const exportDeclaration = fileContent.ast.program.body.find((node:any) => types.isExportNamedDeclaration(node));

	if (exportDeclaration) {
		exportDeclaration.specifiers.push(types.exportSpecifier(types.identifier(options.name), types.identifier(options.name)));
	} else {
		const exportDeclaration = types.exportNamedDeclaration(
			null,
			[types.exportSpecifier(types.identifier(options.name), types.identifier(options.name))]
		);

		updateProgram(fileContent, exportDeclaration);
	}
}

async function addImportComponent(fileContent: FileContent, options: ImportOptions) {
	const importDeclaration = types.importDeclaration(
		[types.importSpecifier(types.identifier(options.name), types.identifier(options.name))],
		types.stringLiteral(options.library),
	);
	
	updateProgram(fileContent, importDeclaration);

	addEmptyLineComponent(fileContent);
}

function loadAST(app: App): FileContent|void{

	const fileContent = {
		path: app.indexFile?.path || path.join(__basedir, 'apps', app.name, INDEX_FILE_NAME),
	}

	let originalCode = '';

	if (fs.existsSync(fileContent.path )) {
		const fileCode = fs.readFileSync(fileContent.path, 'utf8');
		originalCode = fileCode.split('\n').map(line => line.trim() === '' ? ';' : line).join('\n'); 
	} else {
		const modulePath = path.join(__basedir, 'apps', app.name);
		fs.mkdirSync(modulePath, { recursive: true });
	}

	const getAst = () => {
		return parse(originalCode, {
			sourceType: 'module',
			plugins: ['typescript']
		})
	}

	return {
		...fileContent,
		ast: getAst(),
		originalCode: '',
	}
}

function save(fileContent: FileContent): void {
	const newCode = generate(fileContent.ast, {}, fileContent.originalCode).code;
	fs.writeFileSync(fileContent.path, newCode.replace(/^\s*;\s*$/gm, ''));
}

export {
	addComponent,
	Component,
}