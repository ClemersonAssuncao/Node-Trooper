import { App } from "../../src/commons/types";

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
export function run(app: App){
  console.log(app)
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
export function runWithParam(app: App, param1: any) {
  console.log(app, param1)
}