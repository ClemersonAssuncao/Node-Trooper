import { App } from "../../src/commons/types";

function version(app: App,link: string, versions: Array<string> ){
  console.log('app', app)
  console.log('param1', link);
  console.log('param2', versions);
}

function teste(testando: string){
  console.log('param1', testando);
}

export {
  version,
  teste
}