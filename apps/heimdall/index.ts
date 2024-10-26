import { App } from "../../src/application/types";
import { BrowserWindow } from 'electron';

/**
 * Função para ajustar as configurações do sandbox do Electron para executar no Linux Ubuntu.
 * @param window - Janela do Electron que terá o sandbox ajustado.
 */

function run(app: App) {

}

function copyToNative(app: App, teste1: any, teste2: any) {

}

async function adjustSandbox(window: BrowserWindow): Promise<void> {
  try {
    // Define as opções da janela
    const options = window.webContents.session.getLoadURLOptions({});

    // Adiciona as configurações específicas para o Linux Ubuntu no sandbox
    options.webPreferences.sandbox = true;
    options.webPreferences.nodeIntegration = false;

    // Aplica as novas opções de configuração na janela
    await window.webContents.session.loadExtension(options);
  } catch (error) {
    console.error('Erro ao ajustar o sandbox:', error);
  }
}
export { run, copyToNative };
export { adjustSandbox };