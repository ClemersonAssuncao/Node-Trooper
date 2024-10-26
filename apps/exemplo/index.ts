import { App } from "../../src/application/types";
// Importação necessária para utilizar a função fs.promises.readFile
import { readFile } from 'fs/promises';

// Definição da função runNovo com os parâmetros solicitados

/**
 * 
 * @param app --default
 * 
 * O método run é gerado em todo App criado automaticamente pelo sistema, 
 * se não for informado o nome de um método na execução dos comandos, será buscado pelo método "run"
 *
 * Para executar o método utilize um dos comandos abaixo:
 * 
 *  node-trooper exemplo 
 *  node-trooper exemplo run
 */
function run(app: App) {
  console.log(app);
}

/**
 * 
 * @param app --default
 * @param param1 
 * 
 * Para executar o método abaixo utilize o comando:
 * 
 *  node-trooper exemplo runWithParam valorParam1
 * 
 */
function runWithParam(app: App, param1: any) {
  console.log(app, param1);
}

function lala(app: App) {

}

const runNovo = async (param1: string): Promise<void> => {
  try {
    // Aqui está o corpo da função
    console.log(`Executando a função runNovo com o parâmetro: ${param1}`);

    // Exemplo de leitura de um arquivo utilizando o parâmetro recebido
    const data = await readFile(param1, 'utf-8');
    console.log('Conteúdo do arquivo:');
    console.log(data);
  } catch (error) {
    // Tratamento de erros caso a leitura do arquivo falhe
    console.error('Ocorreu um erro ao tentar ler o arquivo:', error);
  }
};

// Exportando a função runNovo para que possa ser utilizada em outros arquivos

export { run, runWithParam, lala };
export { runNovo };