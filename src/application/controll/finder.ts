import fs from 'fs';

import { ActionCommand, App, IndexFile } from "../types";
import { error, log } from '../../logger/log-printer';
import { Message } from '../../logger/default-text';
import path from 'path';
import { Component, addComponent } from '../builder/index-builder-api';

async function createApp(app: App): Promise<void> {

	await addComponent(app, Component.IMPORT, {
		name: 'App',
		library: '../../src/application/types',
	});

	await addComponent(app, Component.FUNCTION, {
		name: 'run',
	});

	log(Message.BUILDER_APP_CREATED, {
		app: app.name,
	})
}

async function createFunction(app: App, action: ActionCommand): Promise<void> {

  const message = await addComponent(app, Component.FUNCTION,{
    name: action.functionName,
    parameters: action.args,
    role: action.options?.new ?? '',
  });

  log(Message.BUILDER_FUNCTION_CREATED, {
    app: app.name,
    functionName: action.functionName,
    message,
  })
}

function existApp(appName: string): boolean {

  for (const dirent of fs.readdirSync("./apps/", { withFileTypes: true })) {
    if (dirent.isDirectory() && dirent.name === appName) {
      return true;
    }
  }
  return false;
}

async function getApp(action: ActionCommand): Promise<App|void> {

  const app: App = { name: action.appName };

  if (!existApp(action.appName)){
    if (!action.options.new){
      error(Message.FINDER_APP_NOT_FOUND, {
        app: app.name
      });
      return;
    }

    await createApp(app);
  }

  const indexFile: IndexFile| void = await loadInstance(app);

  if (!indexFile){
    return;
  }

  app.indexFile = indexFile;

  if (!indexFile.instance[action.functionName]){
    if (!action.options.new){
      error(Message.FINDER_FUNCTION_NOT_FOUND, {
        functionName: action.functionName
      });
      return;
    }

    await createFunction(app, action);
    return;
  }

  return app;
}

async function loadInstance(app: App): Promise<IndexFile | void> {
  const indexPath = path.join(__basedir, 'apps', app.name, 'index.ts');

	if (!fs.existsSync(indexPath)){
    log(Message.INDEX_FILE_FILE_NOT_FOUND, {
      path: indexPath
    });
	  return;
	}

	try {
	  const indexFile = {
      instance: await require(indexPath),
      path: indexPath,
    }  
	  return indexFile;
	} catch( error ) {
	  log(Message.INDEX_FILE_INSTANCE_ERROR, {
      path,
      error
	  });
	}
}

export {
  getApp,
}